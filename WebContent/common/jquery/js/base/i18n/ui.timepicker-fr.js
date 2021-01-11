(function($) {
	$.timepicker.regional['fr'] = {
		currentText : 'Maintenant',
		closeText : 'Terminé',
		ampm: false,
		amNames : [ 'AM', 'A' ],
		pmNames : [ 'PM', 'P' ],
		timeFormat : 'hh:mm TT',
		timeSuffix: '',
		timeOnlyTitle : 'Choisir une heure',
		timeText : 'Heure',
		hourText : 'Heures',
		minuteText : 'Minutes',
		secondText : 'Secondes',
		millisecText : 'Millisecondes',
		timezoneText : 'Fuseau horaire',
		isRTL : false
	};
	$.timepicker.setDefaults($.timepicker.regional['fr']);
})(jQuery);