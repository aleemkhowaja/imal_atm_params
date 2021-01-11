<HTML>
  <HEAD>

	 <TITLE></TITLE>
  <LINK REL="stylesheet" TYPE="text/css"  HREF="${pageContext.request.contextPath}/login/style/Style.css">
  </HEAD>

  <BODY style="margin: 0;" >
   <img src="${pageContext.request.contextPath}/login/images/loginBg.gif" style="position: absolute;z-index: -1;width:100%;height: 100%" >

	 
<div align="center" style="font-size: 18px;color: #FFFFFF;font-weight: bold">Error Occured</div>
<table CELLPADDING="0" CELLSPACING="0"  WIDTH="100%">
  <tr>
   <td width="7%" ></td>
   <td align="center" nowrap="nowrap">
		<TABLE  CELLPADDING="0" CELLSPACING="0" WIDTH="100%">

		  <TR>
			 <TD>
			    <TABLE CELLPADDING="0" CELLSPACING="0" height="100%" width="100%">
				  <TR>
					 <TD  align="center" WIDTH="100%" HEIGHT="100%"
					  VALIGN="BOTTOM">
						<TABLE CELLPADDING="0" CELLSPACING="0">
							<tr>
								<td colspan=4 CLASS="note" align="right">
								Access Denied
								</td>
							</tr>
							<tr><td height="8px"></td></tr>
							<TR>
							
							<TD align="center">
								<TABLE CELLPADDING="0" CELLSPACING="0" onclick="document.location.href = '${pageContext.request.contextPath}/j_spring_security_logout'">
								  <TR>
									 <TD ><IMG SRC="${pageContext.request.contextPath}/login/images/ent.gif" BORDER="0" WIDTH="3"
										HEIGHT="18"></TD>
									 <TD BACKGROUND="${pageContext.request.contextPath}/login/images/entil.gif" WIDTH="80"
									 CLASS="ent" ALIGN="CENTER">
									 <A onclick="document.location.href = '${pageContext.request.contextPath}/j_spring_security_logout'" CLASS="ent" STYLE="text-decoration: none" tabindex="3">
									     Re-Login
									 </A></TD>
									 <TD><IMG SRC="${pageContext.request.contextPath}/login/images/ent2.gif" BORDER="0" WIDTH="4"
										HEIGHT="18"></TD>
								  </TR>
								</TABLE>
								</TD>
						 </TR>		
						  <TR>
							 <TD HEIGHT="15"></TD>
							 <TD CLASS="white" ALIGN="RIGHT"></TD>
							 <TD></TD>
							 <TD></TD>
							 <TD></TD>
							 <TD></TD>
						  </TR>
						</TABLE>
					  </TD>
					 <TD VALIGN="TOP"></TD>
				  </TR>
			    </TABLE>
		      </TD>
		  </TR>
		</TABLE>
	</td>

    </tr>

  </table>
    </BODY>

</HTML>

