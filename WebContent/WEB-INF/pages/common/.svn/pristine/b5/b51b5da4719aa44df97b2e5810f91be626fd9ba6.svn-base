<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<div class="col_3">
	<h2>
		<ps:text name="choose_language_key"></ps:text>
	</h2>
</div>
<div class="floatRightLeft col">
	<ul class="greybox">
		<table>
			<ps:iterator value="languages" status="stat" var="lang">
				<ps:if test="${langCount} > 3 && ${langCount} < 7">
					<ps:if test="#stat.index%2==0">
						<tr>
					</ps:if>

					<td>
						<li>
							<a id="${lang.ISO_CODE}" href="#"
								onclick="javascript:onLangChng(this);">${lang.LANG_NAME}</a>
						</li>
					</td>

					<ps:if test="#stat.index%2==1">
						</tr>
					</ps:if>
				</ps:if>
				<ps:if test="${langCount} < 4">
					<ps:if test="#stat.index%3==0">
						<tr>
							<td>
					</ps:if>
					<li>
						<a id="${lang.ISO_CODE}" href="#"
							onclick="javascript:onLangChng(this);">${lang.LANG_NAME}</a>
					</li>
					<ps:if test="#stat.index%3==2">
						</td>
						</tr>
					</ps:if>

				</ps:if>
				<ps:if test="${langCount} > 6">
					<ps:if test="#stat.index%3==0">
						<tr>
					</ps:if>
					<td>
						<li>
							<a id="${lang.ISO_CODE}" href="#"
								onclick="javascript:onLangChng(this);">${lang.LANG_NAME}</a>
						</li>
					</td>
					<ps:if test="#stat.index%3==2">
						</tr>
					</ps:if>
				</ps:if>
			</ps:iterator>
		</table>
	</ul>
</div>


