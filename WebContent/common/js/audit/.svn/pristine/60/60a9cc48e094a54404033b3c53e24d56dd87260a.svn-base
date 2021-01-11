function auditForm(form) {
	$(document).ready(function() {
		var sbuffer = [];
		var radioObj = new Object();
		$auditFields = $(form).find("[initialValue]");
		$auditFields.each(function() {
			if ($(this).is('input:checkbox')) {
				createChkBoxAuditStr(form, this, sbuffer)
			} else if ($(this).is('input:radio') && !radioObj[this.name]) {
				radioObj[this.name] = this.name;
				createRadioAuditStr(form, this, sbuffer);
			} else if ($(this).is('select')) {
				createSelectAuditStr(form, this, sbuffer);
			}

			else if ($(this).is('input:text') || $(this).is('textarea')) {
				createComponentAuditStr(form, this, sbuffer);

			}
		});
		createHiddenAuditField(sbuffer, form);
	});
}

function createComponentAuditStr(form, component, sbuffer) {
	if ($(component).attr('initialvalue') != $(component).attr('value'))
		sbuffer.push(getFieldJSON(getLabelFor(form, component.id), $(component)
				.attr('initialvalue'), $(component).attr('value')));
}

function createChkBoxAuditStr(form, chkBox, sbuffer) {
	if (!!($(chkBox).attr('initialvalue')) != $(chkBox).attr('checked')) {
		sbuffer.push(getFieldJSON(getLabelFor(form, chkBox.id), $(chkBox).attr(
				'checked') ? "Unchecked" : "Checked",
				$(chkBox).attr('checked') ? "Checked" : "Unchecked"));
	}
}

function createRadioAuditStr(form, radio, sbuffer) {
	$radioFields = $(form).find("input:radio[name=" + radio.name + "]");
	var oldRadio;
	var newRadio;
	$radioFields.each(function() {
		if (!!$(this).attr("initialvalue")) {
			oldRadio = this;
		}
		if ($(this).attr("checked")) {
			newRadio = this;
		}
	});
	if (oldRadio !== newRadio) {
		sbuffer.push(getFieldJSON(getLabelFor(form, radio.name), getLabelFor(
				form, oldRadio.id), getLabelFor(form, newRadio.id)));
	}
}

function createSelectAuditStr(form, select, sbuffer) {
	if (select.multiple) {
		var hiddenElem = $("#__initialValue_" + select.id)[0];
		var initialVal = hiddenElem.value.split(",");
		var labelId = hiddenElem.name.substring(2);
		var options = $("#" + select.id)[0].options;
		var newVal = [];

		for ( var i = 0; i < options.length; i++) {
			newVal[i] = options[i].value;
		}

		for ( var i = 0; i < initialVal.length; i++) {
			var index = $.inArray(initialVal[i], newVal);
			if (index != -1) {
				newVal.splice(index, 1);
			} else {//Removed values							
				sbuffer.push(getFieldJSON(getLabelFor(form, labelId),
						initialVal[i], "--"));
			}
		}
		for ( var i = 0; i < newVal.length; i++) {//Newly added values
			sbuffer.push(getFieldJSON(getLabelFor(form, labelId), "--",
					newVal[i]));
		}

	} else {
		if ($(select).attr('initialvalue') != $(select).attr('value'))
			sbuffer.push(getFieldJSON(getLabelFor(form, select.id), $(select)
					.attr('initialvalue'), $(select).attr('value')));
	}

}
function getFieldJSON(fieldName, oldValue, newValue) {
	return '{fieldName:"' + fieldName + '",oldValue:"' + oldValue
			+ '",newValue:"' + newValue + '"}';
}

function createHiddenAuditField(sbuffer, form) {
	alert(sbuffer.length == 0 ? 'No Changes' : sbuffer);
	$("<input id='_auditJsonStr' type='hidden' name='_auditJsonStr'/>").val(
			'[' + sbuffer.join() + ']').appendTo(form);
}

function getLabelFor(form, elementId) {
	var labelKey = $(form).find("label[for=\"" + elementId + "\"]").attr(
			'labelkey');
	if (labelKey == undefined) {
		alert("Couldn't find label key for " + elementId
				+ ". Element id will be taken as label");
		return elementId;
	} else {
		return labelKey;
	}
}