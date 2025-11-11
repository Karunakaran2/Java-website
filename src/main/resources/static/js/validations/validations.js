
/*!
 * Copyright 2022, Sujith Mohan M
 * KRAN Consulting
 * Date: Tuesday March 08
 */

$(function() {

	//For Number Only
	//Usage class="number-only"
	$(".number-only").on("keypress keyup blur", function (event) {
		$(this).val(
			$(this).val().replace(/[^\d].+/, "")
		);
		if (event.which < 48 || event.which > 57) {
			event.preventDefault();
		}
	});
	
	//Usage data-type="adhaar-number"  maxLength="19"
	$('[data-type="adhaar-number"]').keyup(function() {
	  var value = $(this).val();
	  value = value.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
	  $(this).val(value);
	});
	//Usage data-type="adhaar-number"  maxLength="19"
	$('[data-type="adhaar-number"]').on("change, blur", function() {
	  var value = $(this).val();
	  var maxLength = $(this).attr("maxLength");
	  if (value.length != maxLength) {
	    $(this).addClass("highlight-error");
	  } else {
	    $(this).removeClass("highlight-error");
	  }
	});

	//Usage class="number-only pncode-val"
	$(".pncode-val").on("blur", function (event) {

		var valPincode = $(this).val().trim();
		if (valPincode == '' || valPincode.length != 6) {
			alert('Please provide valid Pincode');
			$(this).val('');
			$(this).focus();
		}
	});

	//For Alphabets Only
	//Usage class="name-input"
	$('.name-input').on('keypress', function (e) {
		var regex = new RegExp("^[a-zA-Z ]*$");
		var input = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(input)) {
			return true;
		}

		e.preventDefault();
		return false;
	});
	
	$('.name-input-comma-included').on('keypress', function (e) {
		var regex = new RegExp("^[a-zA-Z, ]*$");
		var input = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(input)) {
			return true;
		}

		e.preventDefault();
		return false;
	});
	
	$('.name-input-comma-dot-included').on('keypress', function (e) {
		var regex = new RegExp("^[a-zA-Z,. ]*$");
		var input = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(input)) {
			return true;
		}

		e.preventDefault();
		return false;
	});

	});
	
	
	
	
//For Number Validation
// Usage  onchange="processNumber(this);"
function processNumber(id) {
	try {
        var inpVal = id.value;
        if (isNumeric(inpVal)==false) {
            var msg = "Please Enter Number Only.";
            id.value=0;
           	id.focus();
            var err = new Error(msg);
            if (!err.message) {
                err.message = msg;
            }
            throw err;
        }else if(inpVal=="" || inpVal==0 || inpVal<0){
        	id.value=0;
        }
    } catch (e) {
        alert(e.message);
       	id.value=0;
       	id.focus();
    }
}
function isNumeric(string) {
	var numericExpression = /^[0-9]+$/;
	if(string.match(numericExpression))	{
		return true;
	} 
	else {
		return false;
	}
} 
//Usage  IsNumber( strString== false)) true-number, false-not number
function IsNumber(strString){
	var strValidChars = "0123456789";
	var strChar;
	var blnResult = true;
	for (i = 0; i < strString.length && blnResult == true; i++){
	   strChar = strString.charAt(i);
	   if (strValidChars.indexOf(strChar) == -1){
		  blnResult = false;
	   }
	   }
	return blnResult;
}

//For Number Validation

//For Decimal Number Validation
//Usage  onchange="processDecimalNumber(this);"
function processDecimalNumber(id) {
    try {
    	var inpVal = id.value;
        if (isNaN(inpVal)) {
            var msg = "Please Enter Number Only.....";
            var err = new Error(msg);
            if (!err.message) {
                err.message = msg;
            }
            throw err;
        }else if(inpVal=="" || inpVal==0 || inpVal<0){
        	id.value="0.00";
        }
    } catch (e) {
        alert(e.message);
        id.value="0.00";
        id.focus();
        id.select();
        return false;
    }


}
//Usage  if(IsDecimal(strString == false)) true-decimal, false-not decimal
function IsDecimal(strString)
{
	var strValidChars = "0123456789.";
	var strChar;
	var blnResult = true;
	for (i = 0; i < strString.length && blnResult == true; i++){
	   strChar = strString.charAt(i);
	   if (strValidChars.indexOf(strChar) == -1) {
		  blnResult = false;
		  }
	   }
	return blnResult;
}
//For Decimal Number Validation

//For Email Validation
//Usage  if(!validateEmail(emailaddress)) { }
function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test( $email );
}
//For Email Validation

//Usage  if(!validateEmail(emailaddress)) { }
function validatePhone(phone) {
	 if (phone.length == 10) {
	        return true;
	    }
	 return false;
}
//For Email Validation


//For Date Validation
//if(IsDateGreaterThanOrEqualToCurrentDate(strString == false)) true-greater than or equal to, false-not greater than or equal to
function IsDateGreaterThanOrEqualToCurrentDate(EnteredDate){
	var date = EnteredDate.substring(0, 2);
	var month = EnteredDate.substring(3, 5);
	var year = EnteredDate.substring(6, 10);
	var myDate = new Date(year, month - 1, date);
	var today = new Date();
	today.setHours(0,0,0,0);
	var blnResult = true;
	if (myDate >= today) {
		blnResult = true;
	}else {
		blnResult = false;
	}
	return blnResult;
}
//if(IsDateGreaterThanOrEqualToCurrentDate(strString == false)) true-less than or equal to, false-not less than or equal to
function IsDateLessThanOrEqualToCurrentDate(EnteredDate){
	var date = EnteredDate.substring(0, 2);
	var month = EnteredDate.substring(3, 5);
	var year = EnteredDate.substring(6, 10);
	var myDate = new Date(year, month - 1, date);
	var today = new Date();
	today.setHours(0,0,0,0);
	var blnResult = true;
	if (myDate <= today) {
		blnResult = true;
	}else {
		blnResult = false;
	}
	return blnResult;
}
//For Date Validation

//For Date Validation
//if(IsDate2GreaterThanOrEqualToDate1(Date1,Date2)) true-greater than or equal to, false-not greater than or equal to
function IsDate2GreaterThanOrEqualToDate1(Date1,Date2){

	var blnResult = true;
	if (Date1 > Date2) {
		blnResult = true;
	}else {
		blnResult = false;
	}
	return blnResult;
}

//For Getting Date by Passing Date(Format:-dd-MM-yyyy, Eg:-02-05-2019) and Time(Format:-hh:mm a ,eg:-3:00 PM)
function getAsDateTime(EnteredDate, time)
{
 var hours = Number(time.match(/^(\d+)/)[1]);
 var minutes = Number(time.match(/:(\d+)/)[1]);
 var AMPM = time.match(/\s(.*)$/)[1];
 if(AMPM == "PM" && hours<12) hours = hours+12;
 if(AMPM == "AM" && hours==12) hours = hours-12;
 var sHours = hours.toString();
 var sMinutes = minutes.toString();
 if(hours<10) sHours = "0" + sHours;
 if(minutes<10) sMinutes = "0" + sMinutes;
 time = sHours + ":" + sMinutes + ":00";
 var date = EnteredDate.substring(0, 2);
 var month = EnteredDate.substring(3, 5);
 var year = EnteredDate.substring(6, 10);
 var newDate = new Date(year, month - 1, date,sHours,sMinutes);
 return newDate;
}


//For Getting Date by Passing Date(Format:-dd-MM-yyyy, Eg:-02-05-2019) and Time(Format:-hh:mm a ,eg:-3:00 PM)
function getAsDate(EnteredDate)
{
var date = EnteredDate.substring(0, 2);
var month = EnteredDate.substring(3, 5);
var year = EnteredDate.substring(6, 10);
var newDate = new Date(year, month - 1, date);
return newDate;
}

//Please Wait Dialog
var myApp;
myApp = myApp || (function () {
   return {
       showPleaseWait: function() {
           $('#pleaseWaitDialog').modal('show');
       },
       hidePleaseWait: function () {
           $('#pleaseWaitDialog').modal('hide');
       },

   };
})();
//Please Wait Dialog

//For Tiny Box
function openJS(){alert('loaded')}
function closeJS(){window.parent.document.location.reload();}
//For Tiny Box

function removeAjaxMessageFromURLJS(){
			const url = new URL(window.location.href);
			url.searchParams.delete('ajaxMessage');
			window.history.replaceState(null, null, url);	
		
		}