<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:hidden name="screenId"  value="${criteria.screenId}"></ps:hidden>
<ps:hidden name="elementId" value="${criteria.elementId}"></ps:hidden>
<ps:hidden name="queryData" value="${criteria.queryData}"></ps:hidden>
<ps:hidden name="elementType" value="${criteria.elementType}"></ps:hidden>
<ps:hidden name="tableDatasource" value="${dynScreenQueryCO.tableDatasource}"></ps:hidden>
<ps:form useHiddenProps="true" id="queryDataFormId" namespace="/path/screenGenerator" title = "Retreival Condition">
	<table>
	 <ps:if test="%{@com.path.bo.common.ConstantsCommon@ELEMENT_TYPE_GRID.equals(criteria.elementType)}">
	 	<ps:if test="%{@com.path.bo.common.ConstantsCommon@PROPERTY_CODE_RETRIEVALCONDITION.equals(criteria.elementProperty)}">
	  	 <tr> 
	  	 	<td>
		        <ps:label  id="lbl_queryTable" key="Query_key">
		        </ps:label>
		        <ps:if test="%{criteria.tableName!='null' && criteria.tableName!=''}">
		        <span name="spn_query">: SELECT * FROM ${criteria.tableName} WHERE</span>
		        </ps:if>
		     </td>
		      </tr>
		      <tr> 
		     <td>
		        <ps:label  id="lbl_retreivalCondition"  key="retrieval_condition_key">
		        </ps:label>
		     </td>
		     </tr>
		 </tr>
	  	 </ps:if>
	  	 <ps:else>
	  	 <tr> 
		     <td colspan="4">
		        <ps:label id="lbl_query" for="querySynthax" key="Query_key">
		        </ps:label>
		     </td>
		 </tr>
		</ps:else> 
	 </ps:if> 
	 <ps:else>
		 <tr>
		     <td>
		        <ps:label id="lbl_columnCode" for="queryColumnCode" key="columncode_key">
		        </ps:label>
		     </td>
		     <td>
		        <ps:textfield id="queryColumnCode" name="dynScreenQueryCO.columnCode" required="true">
		        </ps:textfield>
		     </td>
		 </tr>
		 <tr>
		     <td>
		        <ps:label id="lbl_columnDesc" for="queryColumnDesc" key="columndesc_key">
		        </ps:label>
		     </td>
		     <td>
		        <ps:textfield id="queryColumnDesc" name="dynScreenQueryCO.columnDesc" required="true">
		        </ps:textfield>
		     </td>
		 </tr>
	 </ps:else>
	  <tr>
	    <td colspan="4">
		    <ps:textarea id="querySynthax"
		                 name="dynScreenQueryCO.querySynthax"
		                 required="true"
		                 cols="120" 
		                 rows="10"></ps:textarea>
	    </td>
	  </tr>
	</table>
</ps:form>

<script>
  var queryExpTags = screenGeneratorProp_returnAllElementsIdsForGrid(false); 
  apply_auto_complete("querySynthax",queryExpTags);
</script>
