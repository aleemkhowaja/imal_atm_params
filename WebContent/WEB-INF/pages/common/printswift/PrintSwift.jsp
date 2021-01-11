<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<html>
  <body>
     <ps:form id="printswiftFormId_${_pageRef}" namespace="path/printswift">
       
       <table width="100%" height="85%">
         <tr height="100%">
            <td height="100%">
              <fieldset class="ui-widget-content ui-corner-all" style="height:100%">
			   <pre id="printSwiftDivId" style="font-family:Tahoma;">${printSwiftCO.printSwiftMessage}</pre>
              </fieldset>
            </td>
         </tr>
       </table>              
     </ps:form>
     <table align="center">
      <tr>
	    <td>
	     <psj:submit button="true" onclick="onPrintSwiftClicked()" freezeOnSubmit="true">
	    	<ps:text name="btn.print"></ps:text>
	     </psj:submit>
	    </td>
     </tr>
    </table>     
  </body>
</html>