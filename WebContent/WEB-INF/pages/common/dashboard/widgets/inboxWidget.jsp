<style>

#inbox-gradient tr.odd {
     background: -moz-linear-gradient(left, #86B5D9 , #DFEEF9);
    border-bottom: 1px solid #FFFFFF;
    border-top: 1px solid #FFFFFF;
    color: #666699;
} 

#inbox-gradient tr.even {
    background: -moz-linear-gradient(left, #9DC4E3 , #DFEEF9);
    border-bottom: 1px solid #FFFFFF;
    border-top: 1px solid #FFFFFF;
    color: #666699;
} 
#inbox-gradient {
    border-collapse: collapse;
    font-family: "Lucida Sans Unicode","Lucida Grande",Sans-Serif;
    font-size: 12px;
    text-align: left;
    text-decoration: none;
}

.tdStyle
{
	border: 2px solid #C1DAD7;
	background: #fff;
	padding: 6px 6px 6px 12px;
	color: #6D929B;
}

.inboxLinkStyle
{
	text-decoration: none;
}
.inboxStyle
{
	color:#E17009;
	font-weight: bold;
	background:#E8EDFF;
}
.chkBoxStyle
{
	cursor: pointer;
}
.chkBoxStyleHeader
{
	cursor: pointer;
	padding-left: 10px;
}

.inboxLinkFont
{
	color: white;
	font-family:tahoma;
	font-weight: normal;
	font-size: 12;
}
</style>

<script language="JavaScript">

$('#select-all').click(function(event) {   
    if(this.checked) {
        // Iterate each checkbox
        $(':checkbox').each(function() {
            this.checked = true;                        
        });
    }
    else {
        // Iterate each checkbox
        $(':checkbox').each(function() {
            this.checked = false;                        
        });
    }
});
</script>
<html>
	<body>
		<table width="100%" height="150px" id="inbox-gradient"  border="0">
			
			<tr class="inboxStyle">
				<td width="5%" align="right">
					<input type="checkbox" name="select-all" id="select-all" class="chkBoxStyleHeader"/>
				</td>
				<td width="70%" colspan="2">
					<a class="inboxLinkStyle" href="#"><span class="inboxStyle">Messages (4)</span></a> 
				</td>
				<td width="25%">
						<select class="texta">
							<option value="0">- Actions -</option>
							<option value="1">Delete</option>
							<option value="2">Move</option>
						</select>
				</td>
			</tr>
			<tr class="odd">
				<td width="5%">
					<input type="checkbox" class="chkBoxStyle">
				</td>
				<td width="5%">
					<img src="${pageContext.request.contextPath}/common/dashboard/themes/default/inbox.png" />
				</td>
				<td width="70" nowrap="nowrap">
					<a class="inboxLinkStyle" href="#"><span class="inboxLinkFont">Customer Creation</span></a>
				</td>
				<td class="20" nowrap="nowrap">
					<span >06 June 2011 02:29 am</span>
				</td>
			</tr>
			<tr class="even">
				<td width="5%">
					<input type="checkbox" class="chkBoxStyle">
				</td>
				<td width="5%">
					<img src="${pageContext.request.contextPath}/common/dashboard/themes/default/inbox.png" />
				</td>
				<td class="">
					<a class="inboxLinkStyle" href="#"><span class="inboxLinkFont">Account Opening</span></a>
				</td>
				<td class="" nowrap="nowrap">
					<span >06 June 2011 01:12 am</span>
				</td>
			</tr>
			<tr class="odd">
				<td width="5%">
					<input type="checkbox" class="chkBoxStyle">
				</td>
				<td width="5%">
					<img src="${pageContext.request.contextPath}/common/dashboard/themes/default/inbox.png" />
				</td>
				<td class="">
					<a class="inboxLinkStyle" href="#"><span class="inboxLinkFont">Ledger Information</span></a>
				</td>
				<td class="" nowrap="nowrap">
					<span >06 June 2011 08:30 am</span>
				</td>
			</tr>
			<tr class="even">
				<td width="5%">
					<input type="checkbox" class="chkBoxStyle">
				</td>
				<td width="5%">
					<img src="${pageContext.request.contextPath}/common/dashboard/themes/default/inbox.png" />
				</td>
				<td class="">
					<a class="inboxLinkStyle" href="#"><span class="inboxLinkFont">Vendor Information</span></a>
				</td>
				<td class="">
					<span > 06 June 2011 05:30 pm</span>
				</td>
			</tr>
		</table>
	</body>
</html>