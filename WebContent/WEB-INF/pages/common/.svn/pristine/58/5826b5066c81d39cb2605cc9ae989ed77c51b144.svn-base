<% 

 //The statusCode (for example 404) is passed in session parameters and can be used for more checking
 //Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
 //session.setAttribute("PathStatusCode",statusCode);
 
 //Get the wrong url (requestUrl) and add it to the session. In this way we will avoid passing it in the request GET Parameters.   
 String requestUrl = (String) request.getAttribute("javax.servlet.error.request_uri");
 session.setAttribute("PathRequestUrl",requestUrl);
 response.sendRedirect(pageContext.getServletContext().getContextPath() + "/pathdesktop/redirectToErrorAction.action");
 
%>
