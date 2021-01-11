(function($) {
$.datepicker.regional['ar'] = {
	 closeText: 'إغلاق',
	 prevText: 'السابق',
	 nextText: 'التالي',
	 currentText: 'اليوم',
	 monthNames: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران','تموز', 'آب', 'أيلول',  'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
	 monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
     dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة','السبت',],
     dayNamesShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة','سبت',],
     dayNamesMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج','س'],
     weekHeader: 'أسبوع',
     dateFormat: 'dd/mm/yyyy',
     firstDay: 0, 
     isRTL: true,
     showMonthAfterYear: false, // True if the year select precedes month, false for month then year
     yearSuffix: '' // Additional text to append to the year in the month headers
  };
  //Path Solutions, put Arabic names as English
  if(typeof AR_MNTH_ENG_LBL !== 'undefined' && AR_MNTH_ENG_LBL === "1")
  {
	  $.datepicker.regional['ar'].monthNames = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو','يوليو', 'أغسطس', 'سبتمبر',  'أكتوبر', 'نوفمبر', 'ديسمبر'];
  }
  $.datepicker.setDefaults($.datepicker.regional['ar']);
})(jQuery);