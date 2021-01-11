<div id="commonFieldsCollapsable_${_pageRef}"  title="<ps:text name="common_data_key"/>">
		<fieldset class="ui-widget-content ui-corner-all" style="padding-top: 10px; margin-top: 30px;">
			<legend id="legend_1" style="font-size:  11px;font-style: italic;margin-top:-20px;border:0;" class="ui-widget-content floatRightLeft">
				<ps:text name="common_fields_key"></ps:text>
			</legend>
			<div id = "WebServiceExplorerCommonFieldsLookup_${_pageRef}" style="width: 100%;">
				<table>
						<tr>
							<td width = "5%">
									<ps:label key="channel_id_key" id="channel_id_label_${_pageRef}" for="channel_id_${_pageRef}" />
							</td>
							<td width="5%">
									<psj:livesearch  id="channel_id_${_pageRef}" 
												name="webServiceExplorerCO.imcoPwsChannelVO.CHANNEL_ID"
												paramList="ivcrud:iv_crud_${_pageRef}"
												resultList="imcoPwsChannelVO.CHANNEL_ID:lookuptxt_channel_id_${_pageRef},imcoPwsChannelDetVO.HOST_NAME:host_name_id_${_pageRef},imcoPwsChannelDetVO.HASH_KEY:hash_key_id_${_pageRef}"
												actionName="${pageContext.request.contextPath}/path/common/WebserviceExplorer/WSDLParsingLookup_constructCommonFieldsLookup"
												searchElement = "imcoPwsChannelVO.CHANNEL_ID" 
												dependencySrc="${pageContext.request.contextPath}/path/common/WebserviceExplorer/WebServiceExplorerMaint_channelIdDependency"
												parameter = "webServiceExplorerCO.imcoPwsChannelVO.CHANNEL_ID:lookuptxt_channel_id_${_pageRef},webServiceExplorerCO.imcoPwsChannelDetVO.HOST_NAME:host_name_id_${_pageRef},webServiceExplorerCO.imcoPwsChannelDetVO.HASH_KEY:hash_key_id_${_pageRef}"
 												dependency = "lookuptxt_channel_id_${_pageRef}:webServiceExplorerCO.imcoPwsChannelVO.CHANNEL_ID,host_name_id_${_pageRef}:webServiceExplorerCO.imcoPwsChannelDetVO.HOST_NAME,hash_key_id_${_pageRef}:webServiceExplorerCO.imcoPwsChannelDetVO.HASH_KEY"
									/>		
							</td>	
							<td> 		
								<ps:label key="host_name_key" id="host_name_id_lbl_${_pageRef}" for="host_name_id_${_pageRef}"></ps:label>
							</td>
							
							<td>
								<ps:textfield id="host_name_id_${_pageRef}" name="webServiceExplorerCO.imcoPwsChannelDetVO.HOST_NAME" >
								</ps:textfield>
							</td>
							
							<td>
								<ps:label key="hash_key" id="hash_key_id_lbl_${_pageRef}" for="hash_key_id_${_pageRef}"></ps:label>
							</td>
							<td>
								<ps:textfield id="hash_key_id_${_pageRef}" name="webServiceExplorerCO.imcoPwsChannelDetVO.HASH_KEY" >
								</ps:textfield>
							</td>
							<td width="10%"></td>
							<td width="10%"></td>
							<td width="10%"></td>
							<td width="10%"></td>
						</tr>
						
						<tr>
							<td>
								<ps:label key="lang_key" id="lang_id_lbl_${_pageRef}" for="langId_${_pageRef}"></ps:label>
							</td>
							<td>
								<ps:textfield id="langId_${_pageRef}" name="webServiceExplorerCO.langId" >
								</ps:textfield>
							</td>
							<td>
								<ps:label key="user_id_key" id="user_id_lbl_${_pageRef}" for="pws_user_id_${_pageRef}"></ps:label>
							</td>
							<td>
							<ps:textfield id="pws_user_id_${_pageRef}" name="webServiceExplorerCO.imcoPwsChannelVO.CHANNEL_ID" >
								</ps:textfield>
							</td>
							<td>
								<ps:label key="password_key" id="password_lbl_${_pageRef}" for="password_id_${_pageRef}"></ps:label>
							</td>
							<td>
								<ps:password name="webServiceExplorerCO.password" theme="simple" id="pws_password_id_${_pageRef}" cssClass="path-theme-cust-input ui-state-focus ui-corner-all" maxlength="40" />
							</td>
						</tr>			
				</table>
		</div>
		</fieldset>
		
		<fieldset class="ui-widget-content ui-corner-all" style="padding-top: 10px; margin-top: 30px;">
			<legend id="legend_2" style="font-size:  11px;font-style: italic;margin-top:-20px;border:0;" class="ui-widget-content floatRightLeft">
				<ps:text name="basic_authentication_key"></ps:text>
			</legend>
			<table>
				<tr>
					<td>
						<ps:label key="user_id_key" id="user_id_lbl_${_pageRef}" for="userID_${_pageRef}"></ps:label>
					</td>
					<td>
						<ps:textfield id="auth_userID_${_pageRef}"
								name="webServiceExplorerCO.authUserID" >
						</ps:textfield>
					</td>
				</tr>
				<tr>
					<td>
						<ps:label key="password_key" id="password_lbl_${_pageRef}" for="auth_password_id_${_pageRef}"></ps:label>
					</td>
					<td>
						<ps:password name="webServiceExplorerCO.authPassword"
										theme="simple" id="auth_password_id_${_pageRef }" cssClass="path-theme-cust-input ui-state-focus ui-corner-all" maxlength="40" 
										/>
					</td>
				</tr>
			</table>
		</fieldset>
	</div>