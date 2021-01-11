<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<style>
.dtPicker 
{	
	border-width: 1px;
	border-style: solid;
	border-color: #999999;
	background-image: url(../img/txt_bg.JPG);
	background-repeat: repeat-x;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #333333;
	width: 85%;
	height: 20px;
}

.dtPicker:hover 
{
	border-color: #64acd8;
	border-width: 1px;
}
.dtPicker:focus 
{
	border-color: #64acd8;
	border-width: 1px;
}

</style>
<html>
	<body>
		<table width="100%" height="110px">
			<body>
				<tr>
					<td width="30%">
						From
					</td>
					<td width="70%">
							<psj:datepicker cssClass="dtPicker"  name="from"></psj:datepicker>
					</td>
				</tr>
				<tr>
					<td >
						To
					</td>
					<td >
						<psj:datepicker cssClass="dtPicker"  name="to"></psj:datepicker>
					</td>
				</tr>
				<tr>
					<td colspan="2" align="right">
						<input type="button" value="Start"/>&nbsp;&nbsp;&nbsp;
					</td>
					
				</tr>
			</body>
		</table>
	</body>
</html>