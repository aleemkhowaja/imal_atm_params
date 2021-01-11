/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// AMQ Ajax handler
// This class provides the main API for using the Ajax features of AMQ. It
// allows JMS messages to be sent and received from javascript when used
// with the org.apache.activemq.web.MessageListenerServlet.
//
// This version of the file provides an adapter interface for the jquery library
// and a namespace for the Javascript file, private/public variables and
// methods, and other scripting niceties. -- jim cook 2007/08/28

var org = org || {};
org.activemq = org.activemq || {};

org.activemq.Amq = function() {
	var connectStatusHandler;

	// Just a shortcut to eliminate some redundant typing.
	var adapter = org.activemq.AmqAdapter;

	if (typeof adapter == 'undefined') {
		throw 'An org.activemq.AmqAdapter must be declared before the amq.js script file.'
	}

	// The URI of the AjaxServlet.
	var uri;

	// The number of seconds that the long-polling socket will stay connected.
	// Best to keep this to a value less than one minute.
	// Path-Solutions - Fix Websphere Issue #177853
	// var timeout;

	// A session should not be considered initialized until the JSESSIONID is returned
	// from the initial GET request.  Otherwise subscription POSTS may register the
	// subscription with the wrong session.
	var sessionInitialized = false;

	// This callback will be called after the first GET request returns.
	var sessionInitializedCallback;	

	// Poll delay. if set to positive integer, this is the time to wait in ms
	// before sending the next poll after the last completes.
	var pollDelay;

	// Inidicates whether logging is active or not. Not by default.
	var logging = false;

	// 5 second delay if an error occurs during poll. This could be due to
	// server capacity problems or a timeout condition.
	var pollErrorDelay = 5000;

	// Map of handlers that will respond to message receipts. The id used during
	// addListener(id, destination, handler) is used to key the callback
	// handler.  
	var messageHandlers = {};

	// Indicates whether an AJAX post call is in progress.
	var batchInProgress = false;

	// A collection of pending messages that accumulate when an AJAX call is in
	// progress. These messages will be delivered as soon as the current call
	// completes. The array contains objects in the format { destination,
	// message, messageType }.
	var messageQueue = [];

  // String to distinguish this client from others sharing the same session.
  // This can occur when multiple browser windows or tabs using amq.js simultaneously.
  // All windows share the same JESSIONID, but need to consume messages independently.
  var clientId = null;
  
  // Path-Solutions - This property is used to start/stop the polling on session timeout and when opening the alert popup
  var continuePolling = true;
  
  // Path-Solutions - This property represent a function that is used to show a warning message when server connection is dropped
  var customErrorHandler;
  
  // Path-Solutions - This property represent the sessionId
  var sessionId;
  
  // Path-Solutions - This property represent the alert ajax servlet local ip
  var servletIp;
  
  // Path-Solutions - This property is used to know if the request is in a snoozeTime mode 
  var snoozeTime;
  
  /**
	 * Iterate over the returned XML and for each message in the response, 
	 * invoke the handler with the matching id.
	 */
	var messageHandler = function(data) {
		//var response = data.getElementsByTagName("ajax-response");
		// Path-Solutions - Modify the data type to fix the issue of parsing empty xml in IE
		var response = null;
		if (typeof data == "string") {
       		if(data != '')
			{
       			var xmlDocument = $.parseXML(data);
       			response = xmlDocument.getElementsByTagName("ajax-response");
			}
		} else {
      	
     		response = data.getElementsByTagName("ajax-response");
	 	}
		
		if (response != null && response.length == 1) {
			connectStatusHandler(true);
			var responses = response[0].childNodes;    // <response>
			for (var i = 0; i < responses.length; i++) {
				var responseElement = responses[i];

				// only process nodes of type element.....
				if (responseElement.nodeType != 1) continue;

				var id = responseElement.getAttribute('id');

				var handler = messageHandlers[id];

				if (logging && handler == null) {
					adapter.log('No handler found to match message with id = ' + id);
					continue;
				}

				// Loop thru and handle each <message>
				// Path-Solutions - checking if handler is a function
				if(handler != undefined && handler != null && jQuery.isFunction(handler))
				{
				    for (var j = 0; j < responseElement.childNodes.length; j++) 
				    {
						handler(responseElement.childNodes[j]);
					}	
				}
			}
		}
	};

	var errorHandler = function(xhr, status, ex) {
		connectStatusHandler(false);
		// Path-Solutions - call the customErrorHandler function 
		if(customErrorHandler)
		{
  			customErrorHandler(xhr, status, ex);
  		}	
		if (logging) adapter.log('Error occurred in ajax call. HTTP result: ' +
		                         xhr.status + ', status: ' + status);
	}

	var pollErrorHandler = function(xhr, status, ex) {
		// Path-Solutions - call the customErrorHandler function 
  		if(customErrorHandler)
		{
  			customErrorHandler(xhr, status, ex);
  			if(continuePolling == false)
  			{
  				return;
  			}	
		}	
		
		connectStatusHandler(false);
		if (status === 'error' && xhr.status === 0) {
			if (logging) adapter.log('Server connection dropped.');
			setTimeout(function() { sendPoll(); }, pollErrorDelay);
			return;
		}
		if (logging) adapter.log('Error occurred in poll. HTTP result: ' +
		                         xhr.status + ', status: ' + status);
		setTimeout(function() { sendPoll(); }, pollErrorDelay);
	}

	var pollHandler = function(data) {
		try {
			messageHandler(data);
		} catch(e) {
			if (logging) adapter.log('Exception in the poll handler: ' + data, e);
			throw(e);
		} finally {
			// Path-Solutions - Polling should be stopped on session timeout and on open of alert's popup
			if(continuePolling == true)
			{
				setTimeout(sendPoll, pollDelay);
			}
		}
	};

	var initHandler = function(data) {
		// Path-Solutions - Send poll after adding user listener
		// to avoid concurrent ajax request on initialization
		//sessionInitialized = true;
		if(sessionInitializedCallback) {
			sessionInitializedCallback();
		}
		// Path-Solutions - Send poll after adding user listener
		// to avoid concurrent ajax request on initialization
		//sendPoll();
	}

	var sendPoll = function() {
		// Path-Solutions - Fix Websphere Issue #177853 
		// Stop the first sendPoll() that was done before the Listen HTTP Post done to subscribe user.
		// In this way, while sending the POST to subscribe and create the topic, the user will be initialized 
		if(sessionInitialized == false)
		{
			initHandler();
		}
		else
		{	
			// Workaround IE6 bug where it caches the response
			// Generate a unique query string with date and random
			var now = new Date();
			// Path-Solutions - Fix Websphere Issue #177853 
			// Use directly the timeout in ms define in PathRemoting.properties
			//var data = 'timeout=' + timeout
			//	 	+ '&d=' + now.getTime()
			//	 	+ '&r=' + Math.random();
			
			var data = 'd=' + now.getTime()
				 	+ '&r=' + Math.random();
			
			
			var options = { method: 'get',
			data: addClientId( data ),
			success: pollHandler,
			error: pollErrorHandler};
			
			adapter.ajax(uri, options);
		}
	};

	var sendJmsMessage = function(destination, message, type, headers) {
		var message = {
			destination: destination,
			message: message,
			messageType: type
		};
		// Add message to outbound queue
		if (batchInProgress) {
			messageQueue[messageQueue.length] = {message:message, headers:headers};
		} else {
			org.activemq.Amq.startBatch();
			// Path-Solutions - Send poll after adding user listener
			// to avoid concurrent ajax request on initialization
			var callBack = org.activemq.Amq.endBatch;
			if(sessionInitialized == false)
			{
				sessionInitialized = true;
				callBack = org.activemq.Amq.continuePolling;
			}	
			adapter.ajax(uri, { method: 'post',
				data: addClientId( buildParams( [message] ) ),
				error: errorHandler,
				headers: headers,
				success: callBack});
		}
	};

	var buildParams = function(msgs) {
		var s = [];
		for (var i = 0, c = msgs.length; i < c; i++) {
			if (i != 0) s[s.length] = '&';
			s[s.length] = ((i == 0) ? 'destination' : 'd' + i);
			s[s.length] = '=';
			s[s.length] = msgs[i].destination;
			s[s.length] = ((i == 0) ? '&message' : '&m' + i);
			s[s.length] = '=';
			s[s.length] = msgs[i].message;
			s[s.length] = ((i == 0) ? '&type' : '&t' + i);
			s[s.length] = '=';
			s[s.length] = msgs[i].messageType;
		}
		return s.join('');
	}
	
	// add clientId to data if it exists, before passing data to ajax connection adapter.
	var addClientId = function( data ) {
		var output = data || '';
		if( clientId ) {
			if( output.length > 0 ) {
				output += '&';
			}
			output += 'clientId='+clientId;
		}
		// Path-Solutions - Add session id to post and get ajax request generated by the activeMq
		if( sessionId )
		{
			if( output.length > 0 ) {
				output += '&';
			}
			output += 'sessionId='+sessionId;
		}
		// Path-Solutions - Add servlet ip to post and get ajax request generated by the activeMq
		if( servletIp )
		{
			if( output.length > 0 ) {
				output += '&';
			}
			output += 'servletIp='+servletIp;
		}
		return output;
	}

	return {
		// optional clientId can be supplied to allow multiple clients (browser windows) within the same session.
		init : function(options) {
			connectStatusHandler = options.connectStatusHandler || function(connected){};
			uri = options.uri || '/amq';
			pollDelay = typeof options.pollDelay == 'number' ? options.pollDelay : 0;
			// Path-Solutions - Fix Websphere Issue #177853
			// timeout = typeof options.timeout == 'number' ? options.timeout : 25;
			logging = options.logging;
			sessionInitializedCallback = options.sessionInitializedCallback;
			clientId = options.clientId;
			// Path-Solutions - initialize the sessionId
			sessionId = options.sessionId;
			// Path-Solutions - initialize the servletIp
			servletIp = options.servletIp;
			customErrorHandler = options.customErrorHandler;
			adapter.init(options);
			sendPoll();
			
		},
		    
		startBatch : function() {
			batchInProgress = true;
		},

		endBatch : function() {
			if (messageQueue.length > 0) {
				var messagesToSend = [];
				var messagesToQueue = [];
				var outgoingHeaders = null;
				
				// we need to ensure that messages which set headers are sent by themselves.
				// if 2 'listen' messages were sent together, and a 'selector' header were added to one of them,
				// AMQ would add the selector to both 'listen' commands.
				for(i=0;i<messageQueue.length;i++) {
					// a message with headers should always be sent by itself.	if other messages have been added, send this one later.
					if ( messageQueue[ i ].headers && messagesToSend.length == 0 ) {
						messagesToSend[ messagesToSend.length ] = messageQueue[ i ].message;
						outgoingHeaders = messageQueue[ i ].headers;
					} else if ( ! messageQueue[ i ].headers && ! outgoingHeaders ) {
						messagesToSend[ messagesToSend.length ] = messageQueue[ i ].message;
					} else {
						messagesToQueue[ messagesToQueue.length ] = messageQueue[ i ];
					}
				}
				var body = buildParams(messagesToSend);
				messageQueue = messagesToQueue;
				org.activemq.Amq.startBatch();
				adapter.ajax(uri, {
					method: 'post',
					headers: outgoingHeaders,
					data: addClientId( body ),
					success: org.activemq.Amq.endBatch, 
					error: errorHandler});
			} else {
				batchInProgress = false;
			}
		},

		// Send a JMS message to a destination (eg topic://MY.TOPIC).  Message
		// should be xml or encoded xml content.
		sendMessage : function(destination, message) {
			sendJmsMessage(destination, message, 'send');
		},

		// Listen on a channel or topic.
		// handler must be a function taking a message argument
		//
		// Supported options:
		//  selector: If supplied, it should be a SQL92 string like "property-name='value'"
		//            http://activemq.apache.org/selectors.html
		//
		// Example: addListener( 'handler', 'topic://test-topic', function(msg) { return msg; }, { selector: "property-name='property-value'" } )
		addListener : function(id, destination, handler, options) {
			messageHandlers[id] = handler;
			var headers = options && options.selector ? {selector:options.selector} : null;
			sendJmsMessage(destination, id, 'listen', headers);
		},

		// remove Listener from channel or topic.
		removeListener : function(id, destination) {
			messageHandlers[id] = null;
			sendJmsMessage(destination, id, 'unlisten');
		},
		
		// for unit testing
		getMessageQueue: function() {
			return messageQueue;
		},
		testPollHandler: function( data ) {
			return pollHandler( data );
		},
		
		// Path-Solutions - This function will set the continuePolling property
		setContinuePolling: function ( data ) {
			continuePolling = data;
		},
		// Path-Solutions - This function is used to expose the sendPoll method to be used by the alertEngine
		continuePolling: function(){
			sendPoll();
		},
		// PathSolutions - reset the variable to their initial values when calling the init methods again.
		resetAmqVariables: function(){
			//this initialization is needed in alert login because the init() may be called twice
			sessionInitialized = false;
			continuePolling = true;
			batchInProgress = false;
			messageQueue = [];
		},
		//Path-Solutions - This function will set the snoozeTime property
		setSnoozeTime: function(data)
		{
			snoozeTime = data;
		},
		//Path-Solutions - This function will get the snoozeTime property
		getSnoozeTime:function()
		{
			return snoozeTime;
		}
		
	};
}();
