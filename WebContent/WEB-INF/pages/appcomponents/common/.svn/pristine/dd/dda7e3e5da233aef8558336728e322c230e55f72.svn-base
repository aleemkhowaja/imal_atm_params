<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:hidden id="AppFrameLoader_screenUrl_${_pageRef}" name="screenUrl"></ps:hidden>
<ps:hidden id="AppFrameLoader_screenParams_${_pageRef}" name="screenParams"></ps:hidden>

<iframe id="AppFrameLoader_<ps:property value="_pageRef" escapeHtml="true"/>" 
 		src="${pageContext.request.contextPath}/path/frameloader/loadFrameContent?_pageRef=<ps:property value="_pageRef" escapeHtml="true"/>" 
 		frameborder="0" 
 		width="100%" 
 		height="100%">
</iframe>