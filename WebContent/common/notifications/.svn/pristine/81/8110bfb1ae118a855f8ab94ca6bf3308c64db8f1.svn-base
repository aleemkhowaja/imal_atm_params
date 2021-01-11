/**
 * The notificationWebSocket is the js object that will manage the notifications process.
 */
var notificationWebSocket = {

	webSocketConnection: null,
	reconnectCount: 0,
	/*
	 * This function is called inside the AppMain.jsp to initialize the websocket object , 
	 * connect to notification endpoint and start listening to messages
	 */
	subscribeUser : function() {
	    var webSocketProtocol = "ws://";
	    if (location.protocol == 'https:'){
		webSocketProtocol = "wss://";
	    }

	    this.webSocketConnection = new WebSocket(webSocketProtocol+document.location.host+jQuery.contextPath+"/path/notificationsWSs");

	    this.webSocketConnection.onerror = function(event) {
	    };

	    this.webSocketConnection.onclose = function(event) {
		notificationWebSocket.onWebSocketConnectionClose(event);
	    };

	    this.webSocketConnection.onopen = function(event) {
		notificationWebSocket.onWebSocketOpen(event);
	    };

	    this.webSocketConnection.onmessage = function(event) {
		notificationWebSocket.onWebSocketMessage(event);
	    };
	},
	/*
	 * This function is called when a notification is received
	 */
	onWebSocketMessage : function(event) {
	    var notifMsg = event.data;

	    if (typeof pathActivexDownloadEnabled !== 'undefined' && pathActivexDownloadEnabled == 'true') {
		try {
		    if ($.browser.msie) {
			PathNotif.showNotification(notifications_key, notifMsg, 5000);
		    } else if ($.browser.webkit) {
			
			var message = {
				title : notifications_key,
				message : notifMsg,
				time : 100000,
				timeInterval : 0
			};
			window.postMessage({
			    type : 'imalPathNotif',
			    msg : message,
			    chromeExt : true
			}, "*");
		    }
		} catch (e) {
		    console.log(e)
		}
	    }
	},
	/*
	 * This function is called when a websocket connection is opened
	 */
	onWebSocketOpen : function(event) {
	    this.reconnectCount = 0;
	},
	/*
	 * This function is called when a websocket connection is closed ( this is mainly due to server shutdown in cluster environment, 
	 * for that we reconnect the websocket to the other server in the cluster environment
	 */
	onWebSocketConnectionClose : function(event) {
		this.reconnectCount++;
		setTimeout(function() {
		    notificationWebSocket.subscribeUser();
		}, this.reconnectCount * 1000);
	}
}
