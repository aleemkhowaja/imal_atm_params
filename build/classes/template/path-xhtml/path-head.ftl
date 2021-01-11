<#--
/*
 * $Id: head.ftl 590812 2007-10-31 20:32:54Z apetrelli $
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
-->


<#if parameters.title??>
	<title>
		${parameters.title?html} 
	</title>
</#if>

<#include "/${parameters.templateDir}/simple/head.ftl" />

<script src="<@s.url value='/common/jquery/CommonFunc.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/CommonFuncComponent.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/js/plugins/jquery.numeric.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/js/plugins/jquery.msgbox.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/js/plugins/jquery.dragndrop.min.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/js/plugins/jshashtable.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/js/plugins/jquery.numberformatter.js?_=${parameters.appversion?html}' />"></script>
<#if parameters.SECURITY_ENCRYPTPARAMS_ENABLED?? && parameters.SECURITY_ENCRYPTPARAMS_ENABLED=="true">
	<script src="<@s.url value='/login/cryptojs/aes.js?_=${parameters.appversion?html}' />"></script>
</#if>
<script> var blockF12 = '${parameters.BLOCK_F12?html}'; </script>
<script type="text/javascript" src="<@s.url value='/login/cryptojs/security-util.js?_=${parameters.appversion?html}' />"></script>
<script> var uniqueSessionToken = '${parameters.UNIQUE_SESSION_TOKEN?html}'; var encryptionPwd = '${parameters.ENCRYPTION_PWD?html}'; </script>

<#if parameters.decoratorName??>
<script src="<@s.url value='/common/jquery/js/plugins/jquery.colorbox.js?_=${parameters.appversion?html}'/>"></script>
<script src="<@s.url value='/common/jquery/js/plugins/jquery.ba-postmessage.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/js/plugins/bignumber.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/js/plugins/jquery.printElement.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/js/plugins/jquery.fileDownload.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/js/plugins/jquery.validate.js?_=${parameters.appversion?html}' />"></script>
<script src="<@s.url value='/common/jquery/CommonFuncExtension.js?_=${parameters.appversion?html}' />"></script>
</#if>

