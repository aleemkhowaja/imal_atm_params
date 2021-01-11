<#--
/*
 * $Id: controlfooter.ftl 590812 2007-10-31 20:32:54Z apetrelli $
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
<#if (parameters.dependency?? && parameters.dependencySrc??) || parameters.fieldAudit??>
<script type="text/javascript"><#rt/>
_mngCtrlFt({id:'${parameters.id?html}'<#rt/>
<#if parameters.fieldAudit?default(false) >
,fieldAudit:true<#rt/>
</#if>
<#if parameters.dependency?? && parameters.dependencySrc??>
,dependency:"${parameters.dependency?default('')}"<#rt/>
,dependencySrc:"${parameters.dependencySrc?default('')}"<#rt/>
,parameter:"${parameters.parameter?default('')}"<#rt/>
,afterDepEvent:"${parameters.afterDepEvent?default('')}"<#rt/>
,dynExpressionsArgs: "${parameters.dynExpressionsArgs?default('')}"<#rt/>
</#if>
<#if parameters.beforeDepEvent??>
,beforeDepEvent:"${parameters.beforeDepEvent?html}"<#rt/>
</#if>});<#rt/>
</script><#rt/>
</#if>