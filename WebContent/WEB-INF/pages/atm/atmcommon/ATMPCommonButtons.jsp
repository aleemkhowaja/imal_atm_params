<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:hidden id="commonMethodName_${_pageRef}"/>

<ptt:toolBar id="maintButtons_${_pageRef}" hideInAlert="true">
		<%-- <ps:if test='%{@com.path.oapi.common.base.OapiCommonConstants@CRUD_MAINTENANCE.equals(iv_crud)}'>
			<ps:if test='%{ (_recStatus==null)}'>
				<psj:submit id="commonMaint_save_${_pageRef}"
					button="true" freezeOnSubmit="true" buttonIcon="ui-icon-disk"
					onclick="setCommonMethodName('saveNew')">
					<ps:label key="Save_key"
						for="commonMaint_save_${_pageRef}" />
				</psj:submit>
			</ps:if>
		</ps:if>		
		<ps:if test='%{@com.path.oapi.common.base.OapiCommonConstants@CRUD_APPROVE_REJECT.equals(iv_crud) 
					|| @com.path.oapi.common.base.OapiCommonConstants@CRUD_APPROVE_REJECT_SUSPEND.equals(iv_crud) }'>
			<psj:submit id="commonMaint_approve_${_pageRef}"
				button="true" freezeOnSubmit="true"  buttonIcon="ui-icon-plus"
				onclick="setCommonMethodName('approve')">
				<ps:label key="approve_key"
					for="commonMaint_approve_${_pageRef}" />
			</psj:submit>
			
			<psj:submit id="commonMaint_reject_${_pageRef}"
				button="true" freezeOnSubmit="true" buttonIcon="ui-icon-close"
				onclick="setCommonMethodName('reject')">
				<ps:label key="reject_key" for="commonMaint_reject_${_pageRef}" />
			</psj:submit>
		</ps:if>
		<ps:if test='%{@com.path.oapi.common.base.OapiCommonConstants@CRUD_UPDATE_AFTER_APPROVE.equals(iv_crud)}'>
			<psj:submit id="commonMaint_update_after_approved_${_pageRef}" button="true"
				freezeOnSubmit="true" buttonIcon="ui-icon-disk"
				onclick="setCommonMethodName('saveNew')">
				<ps:label key="Save_key"
					for="commonMaint_update_after_approved_${_pageRef}" />
			</psj:submit>
		</ps:if>
		<ps:if test='%{@com.path.oapi.common.base.OapiCommonConstants@CRUD_SUSPEND.equals(iv_crud)}'>
			<psj:submit id="commonMaint_suspend_${_pageRef}" button="true"
				freezeOnSubmit="true" buttonIcon="ui-icon-disk"
				onclick="setCommonMethodName('suspend')">
				<ps:label key="Suspend_key"
					for="commonMaint_suspend_${_pageRef}" />
			</psj:submit>
		</ps:if>
		
		<ps:if test='%{@com.path.oapi.common.base.OapiCommonConstants@CRUD_REACTIVATE.equals(iv_crud)}'>
			<psj:submit id="commonMaint_reactivate_${_pageRef}" button="true"
				freezeOnSubmit="true" buttonIcon="ui-icon-disk"
				onclick="setCommonMethodName('reactivate')">
				<ps:label key="Reactivate_key"
					for="commonMaint_reactivate_${_pageRef}" />
			</psj:submit>
		</ps:if>
		
		<ps:if test='%{@com.path.oapi.common.base.OapiCommonConstants@CRUD_DELETE.equals(iv_crud)}'>
			<psj:submit id="commonMaint_delete_${_pageRef}" button="true"
				freezeOnSubmit="true" buttonIcon="ui-icon-trash"
				onclick="setCommonMethodName('delete')">
				<ps:label key="Delete_key"
					for="commonMaint_delete_${_pageRef}" />
			</psj:submit>
		</ps:if>  --%>	
		
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_MAINTENANCE.equals(iv_crud)}'>
			<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@STATUS_ACTIVE.equals(_recStatus) 
												|| _recStatus == null}'>
												
				<psj:submit id="save_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-disk">
					<ps:label key="Save_key" for="isoMessage_save_${_pageRef}"/>
			    </psj:submit>
			
			</ps:if>
			
			<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@STATUS_ACTIVE.equals(atmInterfaceCO.iso_INTERFACESVO.STATUS) }'>
				<psj:submit id="isoMessage_del_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-trash" 
		    				>
			   		<ps:label key="Delete_key" for="isoMessage_del_${_pageRef}"/>
			    </psj:submit>							
			</ps:if>
		</ps:if>
		
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_APPROVE.equals(iv_crud)}'>
			<psj:submit id="atmInterfaceMaint_approve_${_pageRef}" button="true" freezeOnSubmit="true" 
				 buttonIcon="ui-icon-disk">
		    	<ps:label key="approve_key" for="atmInterfaceMaint_approve_${_pageRef}"/>
		    </psj:submit>
		</ps:if>
		
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_UPDATE_AFTER_APPROVE.equals(iv_crud)}'>
			 <psj:submit id="atmIntMaintUpdate_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-disk">
		    	<ps:label key="Update_After_Approve_key" for="atmIntMaintUpdate_${_pageRef}"/>
		     </psj:submit>
		</ps:if>
		
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_SUSPENDED.equals(iv_crud)}'>
			 <psj:submit id="atmIntMaint_suspend_${_pageRef}" button="true" freezeOnSubmit="true" >
		    	<ps:label key="suspend_key" for="atmIntMaint_suspend_${_pageRef}"/>
		    </psj:submit>	    
		</ps:if>
		
		<ps:if test='%{@com.path.atm.bo.common.ATMCommonConstants@IV_CRUD_REACTIVATE.equals(iv_crud)}'>
			<psj:submit id="atmIntMaint_reactivate_${_pageRef}" button="true" freezeOnSubmit="true"  >
		    	<ps:label key="Reactivate_key" for="atmIntMaint_reactivate_${_pageRef}"/>
		    </psj:submit>	    
		</ps:if>
				
</ptt:toolBar>

<script type="text/javascript">
function setCommonMethodName(methodName)
{
	$("#commonMethodName_"+_pageRef).val(methodName);
}

</script>