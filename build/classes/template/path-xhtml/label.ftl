<#--
/*
 * $Id: label.ftl 590812 2007-10-31 20:32:54Z apetrelli $
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
<#include "/${parameters.templateDir}/${parameters.theme}/error.ftl" />
<#assign css="" />
<label<#t/>
<#if parameters.id??>
 id="${parameters.id?html}"<#rt/>
</#if>
<#if parameters.cssClass??>
	<#assign css="${parameters.cssClass?html}"/>
</#if>
<#if parameters.required?default(false)>
	<#assign css= css + " required"/>
</#if>
<#if css != "">
 class="${css}"<#rt/>
</#if>
<#if parameters.cssStyle??>
 style="${parameters.cssStyle?html}"<#rt/>
</#if>
<#if parameters.title??>
 title="${parameters.title?html}"<#rt/>
</#if>
<#if parameters.for??>
 for="${parameters.for?html}"<#rt/>
</#if>
<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />
><#rt/>
<#if parameters.required?default(false) && parameters.requiredposition?default("right") != 'right'>
        <span class="required">*</span><#t/>
</#if>
<#if parameters.nameValue??>
<@s.property value="parameters.nameValue"/><#t/>
</#if>
<#if parameters.required?default(false) && parameters.requiredposition?default("right") == 'right'>
 <span class="required">*</span><#t/>
</#if>
${parameters.labelseparator?default(" ")?html}<#t/>
</label><#t/>
<#assign _required="false" />
<#if parameters.required?default(false)>
	<#assign _required="true" />
</#if>
<#assign _nameValue="" />
<#if parameters.nameValue??>
	<#assign _nameValue="${parameters.nameValue?html}" />
</#if>
<#include "/${parameters.templateDir}/path-xhtml/controlfooter.ftl" />
<#if parameters.for?? && parameters.id??>
<script type="text/javascript"><#rt/>
handleLabelRequiredVal("${parameters.id?html}",${_required});<#rt/>
</script><#rt/>
</#if>