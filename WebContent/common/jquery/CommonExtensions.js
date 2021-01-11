$(document)
		.ready(
				function() {
					var counter = 0;
					if (typeof pathActivexDownloadEnabled !== 'undefined' && pathActivexDownloadEnabled == 'true'
							&& disPrntScrn != null && disPrntScrn != undefined
							&& disPrntScrn != 'undefined' && disPrntScrn != '') {
						try {
							//if ie then call ActiveX methods directly
							if ($.browser.msie) {
								PathClip.Start(250);
							}
							//If chrome then check for the extension existence
							else if ($.browser.webkit) {
								_showProgressBar(true);
								//create a timer function to check for the extension existence
								var funcCaller = setInterval(function() {
									clipClear()
								}, 500);

								function clipClear() {
									var extDiv = document.getElementById(pthCtrlvrsnNb);
									if (extDiv == null || extDiv == undefined) {
										counter++;
										if (counter <= 5) {
											return;
										} else {
											//After 3 loops if extension does not exist the shoe confirm message and logout application;
											clearTimeout(funcCaller);
											_showErrorMsg(prntDisIntErr,
													error_msg_title,
													null,
													null,
													function() {
															//if user clicked yes then start installation
													downloadURI(jQuery.contextPath + '/login/',
															'pathCtrlChromeInstaller.msi');
													logoutApp();
												}
											);
										_showProgressBar(false);
										}
									} else {
										_showProgressBar(false);
										clearTimeout(funcCaller);
										clearClipBoardChrome(250);
									}
								}
							}
						} catch (e) {
							_showErrorMsg(prntDisIntErr,error_msg_title,null,null,
													function() {logoutApp()})();
						}
					}
				})

function clearClipBoardChrome(timeInterval) {
	$(document).ready(function() {
		var message = {
			timeInterval : timeInterval
		};
		window.postMessage( {
			type : 'imalPathNotif',
			msg : message,
			chromeExt : true
		}, "*");
	});
}
function downloadURI(uri, name) {
	try {
		//Creating new link node.
		var link = document.createElement('a');
		link.href = uri + name;
		//Dispatching click event.
		if (document.createEvent) {
			var e = document.createEvent('MouseEvents');
			e.initEvent('click', true, true);
			link.dispatchEvent(e);
			return true;
		}
	} catch (e) {
		_showErrorMsg("Error downloading file", error_msg_title);
	}
}