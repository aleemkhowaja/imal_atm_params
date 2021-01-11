  function arabicCharOnly(evt)
  {
	 var theKeyCode  = evt.keyCode;
	 var target      = evt.target || evt.srcElement;
	 var $theElement = $("#"+target.id);
	 var currentval  = $theElement.val();
	 
	 // when evt.preventDefault(); is called and input changed then the default maxlength on input is not being caught
	 var maxlength = $theElement.attr('maxlength');
	 if(maxlength != undefined && maxlength != null && !isNaN(maxlength))
	 {
		 // if input > max length do not proceed on key click
		 if (currentval.length >= maxlength) 
		 {
			 evt.preventDefault();
	         return;
	     }
	 }
	 
	 var _form = null;
	 var $form = $theElement.closest("form");
	 if($form != undefined && $form != null)
	 {
		 _form = document.getElementById($form.attr("id"));
	 }
	 var initialval = $theElement.val();
	 
	 switch(theKeyCode)
	 {
	   case 65:  
		       evt.preventDefault();
		       $theElement.val(currentval+"ش");
		       break;
	   case 83:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"س"); 
		       break;
	   case 68:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ي"); 
		       break;
	   case 70:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ب"); 
		       break;
	   case 74:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ت"); 
		       break;
	   case 75:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ن"); 
		       break;
	   case 76:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"م"); 
		       break;
	   case 186: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ك"); 
		       break;
	   case 222: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ط"); 
		       break;
	   case 191: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ظ"); 
		       break;
	   case 190: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ز"); 
		       break;
	   case 188: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+"و"); 
		       break;
	   case 77:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ة"); 
		       break;
	   case 88:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ء"); 
		       break;
	   case 90:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ئ"); 
		       break;
	   case 81:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ض"); 
		       break;
	   case 87:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ص"); 
		       break;
	   case 69:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ث"); 
		       break;
	   case 82:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ق"); 
		       break;
	   
	   
	   case 85:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ع"); 
		       break;
	   case 73:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ه"); 
		       break;
	   case 79:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"خ"); 
		       break;
	   case 80:  
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ح"); 
		       break;
	   case 219: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ج"); 
		       break;
	   case 221: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+"د"); 
		       break;
	   case 192: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+"ذ"); 
		       break;
	   /*
        * with Shift
	    */
	   case 72: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+(evt.shiftKey?"أ":"ا")); 
		       break;
	   case 71: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+(evt.shiftKey?"لأ":"ل")); 
		       break;
	   case 78: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+(evt.shiftKey?"آ":"ى")); 
		       break;
	   case 66:
		       evt.preventDefault(); 
		       $theElement.val(currentval+(evt.shiftKey?"لآ":"لا")); 
		       break;
	   case 84: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+(evt.shiftKey?"لإ":"ف")); 
		       break;
	   case 89: 
		       evt.preventDefault(); 
		       $theElement.val(currentval+(evt.shiftKey?"إ":"غ")); 
		       break;
	 };
	 if(theKeyCode == 86 && !evt.ctrlKey)
	 {		    	   
	     evt.preventDefault(); 
		 $theElement.val(currentval+"ر"); 
	 }
	 if(theKeyCode == 67 && !evt.ctrlKey)
	 {
		evt.preventDefault(); 
		$theElement.val(currentval+"ؤ"); 
	 }
	 
	 if(initialval != $theElement.val() && _form != undefined && _form != null)
     {
		 detectChanges(_form);
	 }
  }
