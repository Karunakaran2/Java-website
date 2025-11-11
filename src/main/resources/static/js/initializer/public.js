const toggleItem = 'sb|addappealdetails-toggle'

var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');

function ajaxLoad(id, buttonType, actionName) {
	const inputTaker = document.body.querySelector('#inputTaker');
	if (id == '' || id == 0 || id == null) {

		let categoryDisplay = addAppealTemplate;
		let categoryOptions = getcategoryListOptions(categorySetupVOs);
		categoryDisplay = categoryDisplay.replace('categoryOptions', categoryOptions);

		let typeDisplay = categoryDisplay;
		let grievanceTypeOptions = getgrievanceTypeListOptions(grievanceTypeVOs);
		typeDisplay = typeDisplay.replace('grievanceTypeOptions', grievanceTypeOptions);

		inputTaker.innerHTML = typeDisplay;
		getDivShow();
		$('#buttonSpace').html(saveButtonTemplete);
		var inputDate = document.getElementById('dateOfEventId');
        var currentDate = new Date().toISOString().split('T')[0];
        inputDate.setAttribute('max', currentDate);
		
	}
	else {
		$.ajax({
			url: actionName,
			data: {
				idEnc: id,
				buttonType: buttonType
			},
			beforeSend: function() {
				inputTaker.classList.add('text-center');
				inputTaker.innerHTML = '<div class="spinner-border" style="width: 6.8rem; height: 6.8rem;text-align:center" role="status">' +
					'<span class="sr-only">Loading...</span></div>Loading'
			},
			success: function(result) {
				$(window).scrollTop(0);
			}
		});
	}
}
window.addEventListener('DOMContentLoaded', event => {
	ajaxLoad('', '')
});

function getcategoryListOptions(categoryList) {
	let optionsGeneratedList = '';
	for (var count = 0; count < categoryList.length; count++) {
		let option = '<option value="' + categoryList[count].id + '">' + categoryList[count].category + '</option>';
		optionsGeneratedList = optionsGeneratedList + option;
	}
	return optionsGeneratedList;
}
function getgrievanceTypeListOptions(typeList) {
	let optionsGeneratedList = '';
	for (var count = 0; count < typeList.length; count++) {
		let option = '<option value="' + typeList[count].id + '">' + typeList[count].type + '</option>';
		optionsGeneratedList = optionsGeneratedList + option;
	}
	return optionsGeneratedList;
}

$(document).on("click", "#saveButton", function() {
	var formData = new FormData($("#newForm")[0]);
	if (validateForm()) {
		$('#confirmationModal').modal('show');
		$('#confirmationModal').addClass('fade-background');

		$('#confirmYesButton').click(function() {
			$('#confirmationModal').modal('hide');
			$('#confirmYesButton').prop('disabled', true);
			$.ajax({
				url: '/grievance/public/submitPublicGrievanceRequest',
				type: 'POST',
				data: formData,
				async: false,
				cache: false,
				processData: false,
				contentType: false,
				beforeSend: function() {
					$('#saveButton').attr('disabled', 'disabled')
				},
				success: function(result) {
					$('#saveButton').hide();
					if (result.result == 'Y') {
						if (result.resultObject.attachmentStatus == 'N') {
							alert("Attachment file is not saved.Please select a valid file.")
						}
						$('#successModal').modal('show');
						$('#successModal').addClass('fade-background');
						$('#fileNoIdModal').html(result.resultObject.grievanceRequest.applicationNo);

					} else {
						displayFieldErrors(result);
					}
				}
			});
		});

		$('#confirmNoButton').click(function() {
			$('#confirmationModal').modal('hide');
		});
	}
});


$(document).on("click", "#clearButton", function() {
	ajaxLoad('', '');
});

let selectedValues = [];

function addIdProofNewRow(element) {
	// Check if any dropdown has a value of '0'
	let allSelected = true;
	$('.proofTypeDropdown').each(function() {
		if ($(this).val() === '0') {
			allSelected = false;
			return false; // Break out of the loop
		}
	});

	if (!allSelected) {
		alert('Please select id proof type');
		return; // Prevent adding a new row
	}

	var res = $(element).closest('.idProofRow').find('[id^="idProofButton"]').attr('id').split("Button", 2);
	var listCount = parseInt(res[1]) + 1;
	$('[id^="idProofButton"]').hide();
	var rowData = idproofTemplate;
	rowData = rowData.replace(/Count/g, listCount);
	$(element).closest('.idProofRow').after($('<div class="idProofRow"></div>').append(rowData));

	// Collect current selected values and merge with global selectedValues
	selectedValues = []; // Reset global selectedValues
	$('.proofTypeDropdown').each(function() {
		var selectedValue = $(this).val();
		if (selectedValue !== '0') {
			selectedValues.push(selectedValue);
		}
	});

	updateDropdowns(); // Update dropdowns after adding a new row
}

function removeIdProofRow(element) {
	var listLength = $('[class="idProofRow"]').length;
	if (listLength > 0) { // Ensure at least one row remains
		$(element).closest(".idProofRow").remove();
		$('[id^="idProofButton"]').hide();
		$('[id="' + $('.idProofRow:last').find('[id^="idProofButton"]').attr('id') + '"]').show();
	} else {
		alert("Minimum one Detail required");
	}

	// Re-collect selected values after removing a row
	selectedValues = [];
	$('.proofTypeDropdown').each(function() {
		var selectedValue = $(this).val();
		if (selectedValue !== '0') {
			selectedValues.push(selectedValue);
		}
	});

	updateDropdowns(); // Update dropdowns after removing a row
}

function updateDropdowns() {
	// Ensure the selectedValues array is unique
	selectedValues = [...new Set(selectedValues)];

	// Update options in all dropdowns
	$('.proofTypeDropdown').each(function() {
		var currentDropdown = $(this);
		var currentSelectedValue = currentDropdown.val();

		currentDropdown.find('option').each(function() {
			var optionValue = $(this).attr('value');
			if (optionValue !== '0') {
				if (selectedValues.includes(optionValue) && optionValue !== currentSelectedValue) {
					$(this).hide(); // Hide if selected in another dropdown
				} else {
					$(this).show(); // Show if not selected or selected in current dropdown
				}
			}
		});
	});
}

$(document).ready(function() {
	updateDropdowns();
});
function addParameterNewRow(element) {
	var res = $(element).closest('.jnDetailRow').find('[id^="addButton"]').attr('id').split("Button", 2);
	var listCount = parseInt(res[1]) + 1;
	$('[id^="addButton"]').hide();
	var rowData = jnParameterCont;
	rowData = rowData.replace(/Count/g, listCount);
	$(element).closest('.jnDetailRow').after($('<div class="jnDetailRow" ></div>').append(rowData));
}

function removeParameterRow(element, count) {
	var listLength = $('[class="jnDetailRow"]').length;
	if (listLength > 0) {
		$(element).closest(".jnDetailRow").remove();
		$('[id^="addButton"]').hide();
		$('[id="' + $('.jnDetailRow:last').find('[id^="addButton"]').attr('id') + '"]').show();
	} else {
		alert("Minimum one Detail required")
	}
}
function addMoreRespondent(element) {
	var res = $(element).closest('.respondentRow').find('[id^="addRespondentButton"]').attr('id').split("Button", 2);
	var listCount = parseInt(res[1]) + 1;
	$(element).closest('.respondentRow').find('[id^="addRespondentButton"]').hide();
	var rowData = respondentParameterCont;
	rowData = rowData.replace(/counter2/g, listCount);
	$(element).closest('.respondentRow').after($('<div class="respondentRow"></div>').append(rowData));
	$('.respondentRow:first [id^="addRespondentButton"]').show();
}

function removeRespondent(button) {

	const respondentRow = $(button).closest('.respondentRow');

	const respondentId = respondentRow.find('[id^="respondentHidIdEnc"]').val();
	respondentRow.remove();
}

function validateContactNumber(inputField) {
	var inputValue = inputField.value;
	var pattern = /^\d{1,10}$/; // This pattern allows 1 to 10 digits

	if (!pattern.test(inputValue)) {
		// If the input value doesn't match the pattern, clear the input field
		inputField.value = '';
		alert("Please enter 10 digits number.");
	}
}

function validateFile(input) {
	const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
	const acceptedFileTypes = ['pdf', 'png', 'jpg', 'jpeg'];

	if (input.files.length > 0) {
		const selectedFile = input.files[0];
		const fileSize = selectedFile.size;
		const fileType = selectedFile.name.split('.').pop().toLowerCase();

		// Check file size
		if (fileSize > maxFileSize) {
			alert("File size exceeds 2MB. Please select a smaller file.");
			// Clear the file input
			input.value = '';
			return;
		}

		// Check file type
		if (!acceptedFileTypes.includes(fileType)) {
			alert("Invalid file type");
			// Clear the file input
			input.value = '';
		}
	}
}

function checkEmail() {
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		.test(document.getElementById("emailsId").value)) {
		return true;
	}
	else {
		alert("You have entered an invalid email address!");
		$('#emailsId').val("");
		$('#emailsId').focus();
		return false;
	}
}
function checkEmailres(id) {
	var emailInput = $('#' + id).val();
	var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (emailRegex.test(emailInput)) {
		return true;
	} else {
		alert("You have entered an invalid email address!");
		$('#' + id).val("");
		setTimeout(function() {
			$('#' + id).focus();
		}, 10);
		return false;
	}
}
function validateForm() {

	if ($('#categoryId').val() == null || $('#categoryId').val() == "0") {
		alert("Please Select Category");

		document.getElementById('categoryId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('categoryId').style.borderColor = "lightgray";
	}

	if ($('#typeId').val() == null || $('#typeId').val() == "0") {
		alert("Please Selct Grievance Type");

		document.getElementById('typeId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('typeId').style.borderColor = "lightgray";
	}


	if ($('#complaintId').val() == null || $('#complaintId').val() == "0" || $('#complaintId').val() == "") {
		alert("Please Enter Subject");
		document.getElementById('complaintId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('complaintId').style.borderColor = "lightgray";
	}


	if ($('#inlineRadio2').is(':checked')) {
		// Additional checks for fields when option2 is selected
		if ($('#nameOfGrievantId input').val() == null || $('#nameOfGrievantId input').val() == "") {
			alert("Please Enter Name of Grievant");
			$('#nameOfGrievantId input').css('borderColor', 'red');
			return false;
		} else {
			$('#nameOfGrievantId input').css('borderColor', 'lightgray');
		}

		if ($('#emailId input').val() == null || $('#emailId input').val() == "") {
			alert("Please Enter Email Id");
			$('#emailId input').css('borderColor', 'red');
			return false;
		} else {
			$('#emailId input').css('borderColor', 'lightgray');
		}

		if ($('#phoneNoId input').val() == null || $('#phoneNoId input').val() == "") {
			alert("Please Enter Contact Number");
			$('#phoneNoId input').css('borderColor', 'red');
			return false;
		} else {
			$('#phoneNoId input').css('borderColor', 'lightgray');
		}

	}
	return true;

}
function getDivShow() {
	if (document.getElementById('inlineRadio2').checked) {
		$('#idproofId').show();
		$('#idproofId').show();
		$('#defaultNOId').show();
		$('#titleId').show();
		$('#phoneNoId').show();
		$('#emailId').show();
		$('#addressId').show();
		$('#nameOfGrievantId').show();
		$('#requestTypeId').val("P");
	} else {
		$('#grievantdetailId').hide();
		$('#idproofId').hide();
		$('#defaultNOId').hide();
		$('#phoneNoId').hide();
		$('#titleId').hide();
		$('#emailId').hide();
		$('#addressId').hide();
		$('#nameOfGrievantId').hide();
		$('#requestTypeId').val("A");

	}
}

//function getDivShow() {
//	if (document.getElementById('inlineRadio1').checked) {
//		$('#phoneNoId').hide();
//		$('#titleId').hide();
//		$('#emailId').hide();
//		$('#addressId').hide();
//		$('#nameOfGrievantId').hide();
//		$('#requestTypeId').val("A");
//	} else {
//		$('#titleId').show();
//		$('#phoneNoId').show();
//		$('#emailId').show();
//		$('#addressId').show();
//		$('#nameOfGrievantId').show();
//		$('#requestTypeId').val("P");
//	}
//}
function getAlertPopUp() {
	// Check if the radio button is checked
	//    if (document.getElementById("inlineRadio1").checked) {
	// Open the modal
	$('#alertModal').modal('show');
	//    }
}


const addAppealTemplate = "" +
	'<form id="newForm">' +
	'<div class="">' +
	'<div class="">' +
	'<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-3">' +
	' <div class="page-header page-header-compact page-header-light text-primary d-flex">' +
	'<div class="d-flex align-items-center">' +
	'<h6><span style="color: #000;">Would you like to keep your identity anonymous? &emsp;</span></h6>' +
	'</div>' +
	'<div class="col-lg-6">' +
	'<div class="form-check form-check-inline">' +
	'<input class="form-check-input mt-2" type="radio" name="grievanceRequest.inlineRadioOptions" id="inlineRadio1" onchange="getDivShow();getAlertPopUp()" value="option1" > ' +
	'<label class="form-check-label py-2" for="inlineRadio1">Yes</label>' +
	'</div>' +
	'<div class="form-check form-check-inline">' +
	'<input class="form-check-input mt-2" type="radio" name="grievanceRequest.inlineRadioOptions" id="inlineRadio2" onchange="getDivShow()" value="option2" checked>' +
	'<label class="form-check-label py-2" for="inlineRadio2">No</label>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>' +

	'<input type="hidden" name="grievanceRequest.requestType" id="requestTypeId">' +
	'<div class="row">' +

	'		<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 pt-2">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="complaintId" placeholder="" name="grievanceRequest.complaint">' +
	' <label for="place">Subject<font color="red">*</font></label> </div>' +
	'		</div>' +
	'		<div class="col-sm-12 col-md-6 col-lg-6 col-xl-3 pt-2">' +
	'			<input type="hidden" id="requestId" name="grievanceRequest.id">' +
	'			<input type="hidden" id="applicationNumberId" name="grievanceRequest.applicationNo">' +
	'			<input type="hidden" id="applicationNumberAutoId" name="grievanceRequest.applicationNoAuto">' +
	'			<div class="form-group custom-form-group"> <select class="form-select custom-select custom-input" data-width="100%" data-live-search="true" title="Select Category"  name="grievanceRequest.category.id" id="categoryId">' +
	' <option value="0">--Select Category--</option>categoryOptions </select> <label for="category">Category <font color="red">*</font></label> </div>' +

	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 pt-2">' +
	'			<div class="form-group custom-form-group"> <input type="date" class="form-control custom-input" id="dateOfEventId" placeholder="" name="grievanceRequest.dateOfEventStr">' +
	' <label for="doa">Date of Incident</label> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-2">' +
	'			<div class="form-group custom-form-group"> <select class="form-select custom-select custom-input" data-width="100%" data-live-search="true" title="Select Type"  name="grievanceRequest.grievanceType.id" id="typeId">' +
	' <option value="0">--Select Type--</option>grievanceTypeOptions </select> <label for="Type">Type <font color="red">*</font></label> </div>' +
	'		</div>' +
	'		<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-2">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="placeId" placeholder="" name="grievanceRequest.place">' +
	' <label for="place">Place of incident leading to Grievance</label> </div>' +
	'		</div>' +
	'		</div>' +

	'<div class="row">' +


	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-2 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="grievanceDescriptionId" placeholder="" name="grievanceRequest.grievanceDescription" style="height: 51.6px;"></textarea>' +
	' <label for="purpose">Detailed Description of Grievance</label><p class="description-text text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +

	'		</div>' +

	'<div class="row">' +
	'			<div class="page-header page-header-compact page-header-light text-primary  mb-1" id="grievantdetailId">' +
	'				<h6><span style="color: #01458E;">Grievant Details</span><h6></div>' +
	'		</div>' +
	'		</div>' +
	'<div class="row">' +
	'<div class="col-sm-12 col-md-6 col-lg-2 col-xl-2 pt-2" id="titleId">' +
	'    <div class="form-group custom-form-group">' +
	'        <select class="form-select custom-select custom-input" id="TitleId" name="grievanceRequest.titleName">' +
	'            <option value="Mr.">Mr.</option>' +
	'            <option value="Mrs.">Mrs.</option>' +
	'            <option value="Ms.">Ms.</option>' +
	'            <option value="others.">Others.</option>' +
	'        </select>' +
	'        <label for="Title">Title&nbsp;<font color="red">*</font></label>' +
	'    </div>' +
	'</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-2" id="nameOfGrievantId">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="grievantNameId" placeholder="" name="grievanceRequest.grievantName">' +
	' <label for="place">Name of Grievant<font color="red">*</font></label> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-4 pt-2" id="emailId">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="emailsId" placeholder="" name="grievanceRequest.email" onchange="checkEmail()">' +
	' <label for="place">Email Id<font color="red">*</font></label> </div>' +
	'		</div>' +
	'		</div>' +

	'<div class="row">' +
	//	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-4 pt-2" id="phoneNoId">' +
	//	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="phoneNoId" placeholder="" name="grievanceRequest.mobileNo" oninput="validateContactNumber(this)" maxlength="10">' +
	//	' <label for="place">Contact Number<font color="red">*</font></label> </div>' +
	//	'		</div>' +

	'              <div class="d-flex col-sm-12 col-md-12 col-lg-4 col-xl-4 pt-2">' +
	'                    <div class="col-lg-2" id="defaultNOId">' +
	'                       <div class="">' +
	'                           <span class="input-group-text" style="background-color: lightgray;border-start-end-radius: 0;border-end-end-radius: 0;height: 51.6px;">+91</span>' +
	'                       </div>' +
	'                    </div>' +
	'                  <div class="col-lg-10">' +
	'                      <div class="form-group custom-form-group" id="phoneNoId">' +
	'                       <input class="form-control custom-input" id="phoneNoId" placeholder="" name="grievanceRequest.mobileNo" oninput="validateContactNumber(this)" maxlength="10" style="border-start-start-radius: 0;border-end-start-radius: 0;">' +
	'                             <label>Phone Number&nbsp;<font color="red">*</font></label>' +
	'                      </div>' +
	'                  </div>' +
	'              </div>' +

	'		<div class="col-sm-12 col-md-12 col-lg-7 col-xl-8 pt-2 " id="addressId">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="addressId" placeholder="" name="grievanceRequest.address" style="height: 51.6px;"></textarea>' +
	' <label for="purpose">Address of Grievant</label> </div>' +
	'		</div>' +
	'		</div>' +


	//	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-1 ">' +
	//	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="solutionDescriptionId" placeholder="" name="grievanceRequest.solutionDescription" style="height: 12px;"></textarea>' +
	//	' <label for="purpose">Desired Resolution/ Suggestions</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	//	'		</div>' +

	//	'<div class="row">' +
	//	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
	//	'			<div class="page-header page-header-compact page-header-light text-primary  mb-1">' +
	//	'				<h6><span style="color: #01458E;">Respondents Details</span><h6></div> <p class="fs-10 text" style="font-size: 13px;"> (refer to the identifying information of the individual, organization, or party being accused or addressed in response to the submitted complaint or concern)</p>' +
	//	'		</div>' +
	//	'<div id="respondentRowId" class="p-2">' +
	//	'<div class="row respondentRow">' +
	//
	//	'			<input type="hidden" id="respondentHidId0" name="grievanceRequest.respondentsList[0].id">' +
	//	'			<input type="hidden" id="respondentHidIdEnc0" name="grievanceRequest.respondentsList[0].idEnc">' +
	//
	//	'<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 pt-2">' +
	//	'    <div class="form-group custom-form-group">' +
	//	'        <select class="form-select custom-select custom-input" id="TitleIdRespondent" name="grievanceRequest.respondentsList[0].titleNameRespondent">' +
	//	'            <option value="Mr.">Mr.</option>' +
	//	'            <option value="Mrs.">Mrs.</option>' +
	//	'            <option value="Ms.">Ms.</option>' +
	//	'        </select>' +
	//	'        <label for="Title">Title&nbsp;<font color="red">*</font></label>' +
	//	'    </div>' +
	//	'</div>' +
	//
	//	'		<div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-2">' +
	//	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentNameId" placeholder="" name="grievanceRequest.respondentsList[0].respondentName">' +
	//	' <label for="place">Name</label> </div>' +
	//	'		</div>' +
	//
	//	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-2">' +
	//	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentEmailId" placeholder="" name="grievanceRequest.respondentsList[0].respondentEmail" onchange="checkEmailres(this.id)">' +
	//	' <label for="place">Email Id</label> </div>' +
	//	'		</div>' +
	//
	//	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-2">' +
	//	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" maxlength="10" id="respondentPhoneNoId" placeholder="" oninput="validateContactNumber(this)" name="grievanceRequest.respondentsList[0].respondentMobileNo">' +
	//	' <label for="place">Contact Number </label> </div>' +
	//	'		</div>' +
	//
	//
	//	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-2 ">' +
	//	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="respondentPermanentAddressId" placeholder="" name="grievanceRequest.respondentsList[0].respondentPermanentAddress" style="height: 12px;"></textarea>' +
	//	' <label for="place">Permanent Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	//	'		</div>' +
	//
	//	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-2 ">' +
	//	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="respondentCommunicationAddressId" placeholder="" name="grievanceRequest.respondentsList[0].respondentCommunicationAddress" style="height: 12px;"></textarea>' +
	//	' <label for="place">Communication Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	//	'		</div>' +
	//
	//
	//	'<div class="col-12 text-end addRespondentRow mt-2">' +
	//	'<font style="font-size: 25px; color: rgb(78, 154, 6); "><i class="fa fa-plus-square" aria-hidden="true" id="addRespondentButton0"' +
	//	'title="Add more respondent details"' +
	//	'onclick="addMoreRespondent(this)"></i></font>' +
	//	'</div>' +
	//	'</div>' +
	//	'</div>' +
	//
	//	'	</div>' +
	'<div class="col-auto d-flex flex-row" id="proofRow"></div>' +
	'<div id="additionalIdProofAttachmentRow">' +
	'<div class="row idProofRow" id="idproofId">' +
	'<div class="col-sm-12 col-md-3 col-lg-4 col-xl-4 pt-3">' +
	'<div class="form-group custom-form-group">' +
	'<select class="form-select custom-select custom-input proofTypeDropdown" data-width="100%" data-live-search="true" title="Select Id Proof Type" name="idProofVOs[0].idProofType" id="proofTypeId0" onchange="updateDropdowns()">' +
	'<option value="0">--Select Id Proof Type--</option>' +
	'<option value="P">Pan card</option>' +
	'<option value="A">Aadhaar</option>' +
	'<option value="V">Voter Id</option>' +
	'<option value="L">Licence</option>' +
	'</select>' +
	' <label for="petitionertype">Id Proof Type</label>' +
	'</div>' +
	'</div>' +

	' <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 pt-3">' +
	'<div class="form-group custom-form-group mobile-attachment">' +
	'<input type="file" class="form-control custom-input" id="myfile0" placeholder="" name="idProofVOs[0].attachmentFile" accept=".pdf, .png, .jpg, .jpeg">' +
	'<label for="attachment"></label>' +
	'<p class="text mb-0 description-text">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p>' +
	' </div>' +
	'</div>' +

	'<div class="col-sm-12 col-md-3 col-lg-3 col-xl-1 pt-3 mobile-add">' +
	'<div class="form-group d-flex align-items-center" style="height: 51.6px;">' +
	'<a href="javascript:void(0);" onclick="removeIdProofRow(this,\'0\');" class="btn btn-datatable btn-icon btn-action-danger mx-2">' +

	'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Delete " aria-label="Delete "><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>' +

	'</a>' +
	'  <a id="idProofButton0" href="javascript:void(0);" onclick="javascript:addIdProofNewRow(this)" style="display: flex; padding: 0.1rem 0.2rem;font-size: 0.7rem;border-radius: 50%;width: 22px;height: 22px;" class="btn btn-primary">      ' +
	'  <em class="fa fa-plus"></em>' +
	'</a>' +
	'</div>' +
	'</div>' +
	' </div>' +
	'</div>' +


	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
	'			<div class="page-header page-header-compact page-header-light text-primary  mb-1">' +
	'				<h6><span style="color: #01458E;">Grievance Supporting Documents</span><h6></div> <p class="description-text text"> attach relevant files, such as images, documents, or other media, to provide additional information or evidence related to their grievance.(Max Size : 2mb)</p>' +
	'		</div>' +

	'<div class="col-auto d-flex flex-row " id="attachmentRow"></div>' +
	'<div id="additionalAttachmentRow">' +
	'<div class="row jnDetailRow">' +
	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 pt-3">' +
	'		<div class="form-group custom-form-group"> <input class="form-control custom-input" id="attachmentSubject0" placeholder="" name="grievanceAttachmentsVOs[0].subject" >' +
	' 				<label for="remark">Attachment Subject</label> </div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 pt-3">' +
	'			<div class="form-group custom-form-group mobile-attachment"> <input type="file" class="form-control custom-input" id="myfile0" placeholder="" name="grievanceAttachmentsVOs[0].attachmentFile" accept=".pdf, .png, .jpg, .jpeg" onchange="validateFile(this)" >' +
	'				 <label for="remark"></label><p class="description-text text mb-0">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p></div>' +
	'		</div>' +
	'    <div class="col-sm-12 col-md-3 col-lg-3 col-xl-1 pt-3 mobile-add">' +
	'<div class="form-group d-flex align-items-center" style="height: 51.6px;">' +
	'                     <a href="javascript:void(0);"  onclick="removeParameterRow(this,\'Count\');"  class="btn btn-datatable btn-icon btn-action-danger mx-2">' +

	'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Delete " aria-label="Delete "><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>' +

	'</a>' +
	
	'                            <a id="addButton0" href="javascript:void(0);" onclick="javascript:addParameterNewRow(this)" style="display: flex; padding: 0.1rem 0.2rem;font-size: 0.7rem;border-radius: 50%;width: 22px;height: 22px;" class="btn btn-primary">      ' +
	'  <em class="fa fa-plus"></em>' +
	'</a>' +
	'                 </div>' +
	'            </div>' +
	'       </div>' +
	'</div>' +
	'<div>' +
	'</div>' +
	'</div>' +

	'	<div class="row g-1 pt-2">' +
	//	'		<div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 text-left pb-0" id="fieldErrors">' +
	//	'		</div>' +
	'		<div id="buttonSpace" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center pr-3">' +

	'		</div>' +
	'	</div>' +

	'</form>' +
	'';

const idproofTemplate = '' +
	'<div class="row pt-1">' +
	'   <div class="col-sm-12 col-md-3 col-lg-4 col-xl-4 pt-3">' +
	'       <div class="form-group custom-form-group">' +
	'           <select class="form-select custom-select custom-input proofTypeDropdown" data-width="100%" data-live-search="true" title="Select Id Proof Type" name="idProofVOs[Count].idProofType" id="proofTypeIdCount" onchange="updateDropdowns()">' +
	'               <option value="0">--Select Id Proof Type--</option>' +
	'               <option value="P">Pan card</option>' +
	'               <option value="A">Aadhaar</option>' +
	'               <option value="V">Voter Id</option>' +
	'               <option value="L">Licence</option>' +
	'           </select>' +
	'           <label for="petitionertype">Id Proof Type</label>' +
	'       </div>' +
	'   </div>' +
	'   <div class="col-sm-12 col-md-3 col-lg-4 col-xl-4 pt-3">' +
	'       <div class="form-group custom-form-group">' +
	'           <input type="file" class="form-control custom-input" id="myfileCount" placeholder="" name="idProofVOs[Count].attachmentFile" accept=".pdf, .png, .jpg, .jpeg">' +
	'           <label for="attachment"></label><p class="fs-10 text">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p>' +
	'       </div>' +
	'   </div>' +
	'   <div class="col-sm-12 col-md-3 col-lg-3 col-xl-1 pt-3">' +
	'<div class="form-group d-flex align-items-center" style="height: 51.6px;">' +
	'           <a href="javascript:void(0);" onclick="removeIdProofRow(this);"  class="btn btn-datatable btn-icon btn-action-danger mx-2">' +

	'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Delete " aria-label="Delete "><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>' +

	'</a>' +
	
	'           <a id="idProofButtonCount" href="javascript:void(0);" onclick="addIdProofNewRow(this)" style="display: flex; padding: 0.1rem 0.2rem;font-size: 0.7rem;border-radius: 50%;width: 22px;height: 22px;" class="btn btn-primary">      ' +
	'  <em class="fa fa-plus"></em>' +
	'</a>' +
	'       </div>' +
	'   </div>' +
	'</div>';

const jnParameterCont = '' +
	'		<div class="row pt-1">' +
	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 pt-3">' +
	'		<div class="form-group custom-form-group"> <input class="form-control custom-input" id="attachmentSubjectCount" placeholder="" name="grievanceAttachmentsVOs[Count].subject" >' +
	' 				<label for="remark">Attachment Subject</label> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-3 col-lg-4 col-xl-4 pt-3">' +
	'			<div class="form-group custom-form-group"> <input type="file" class="form-control custom-input" id="myfileCount" placeholder="" name="grievanceAttachmentsVOs[Count].attachmentFile" accept=".pdf, .png, .jpg, .jpeg" onchange="validateFile(this)">' +
	'				 <label for="Attachment file"></label><p class="description-text text">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p></div>' +
	'		</div>' +
	'    <div class="col-sm-2 col-md-2 col-lg-1 col-xl-1 pe-0 pt-3">' +
	'<div class="form-group d-flex align-items-center" style="height: 51.6px;">' +
	'          <a href="javascript:void(0);" onclick="removeParameterRow(this,\'Count\');"  class="btn btn-datatable btn-icon btn-action-danger mx-2">' +

	'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Delete " aria-label="Delete "><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>' +

	'</a>' +
	
	'             <a id="addButtonCount" href="javascript:void(0);" onclick="javascript:addParameterNewRow(this)" style="display: flex; padding: 0.1rem 0.2rem;font-size: 0.7rem;border-radius: 50%;width: 22px;height: 22px;" class="btn btn-primary">      ' +
	'  <em class="fa fa-plus"></em>' +
	'</a>' +
	'         </div>' +
	'     </div>' +

	'       <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6" id="jnValueInputRowCount">' +
	'       </div>' +
	'</div>';

const respondentParameterCont = '' +
	'<div id="respondentRowAdd">' +
	'<div class="p-2">' +
	'<div class="row ">' +
	'			<input type="hidden" id="respondentHidIdEnccounter2" name="grievanceRequest.respondentsList[counter2].idEnc">' +
	'			<input type="hidden" id="respondentHidIdcounter2" name="grievanceRequest.respondentsList[counter2].id">' +
	'<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 pt-3">' +
	'    <div class="form-group custom-form-group">' +
	'        <select class="form-select custom-select custom-input" id="TitleIdRespondentcounter2" name="grievanceRequest.respondentsList[counter2].titleNameRespondent">' +
	'            <option value="Mr.">Mr.</option>' +
	'            <option value="Mrs.">Mrs.</option>' +
	'            <option value="Ms.">Ms.</option>' +
	'        </select>' +
	'        <label for="Title">Title&nbsp;<font color="red">*</font></label>' +
	'    </div>' +
	'</div>' +


	'		<div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-3">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="againstIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentName">' +
	' <label for="place">Name</label> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentEmailIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentEmail" onchange="checkEmailres(this.id)">' +
	' <label for="place">Email Id</label> </div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentPhoneNoIdcounter2" placeholder="" oninput="validateContactNumber(this)" name="grievanceRequest.respondentsList[counter2].respondentMobileNo">' +
	' <label for="place">Contact Number</label> </div>' +
	'		</div>' +
	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="respondentPermanentAddressIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentPermanentAddress" style="height: 12px;"></textarea>' +
	' <label for="place">Permanent Address</label><p class="description-text text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="respondentCommunicationAddressIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentCommunicationAddress" style="height: 12px;"></textarea>' +
	' <label for="place">Communication Address</label><p class="description-text text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +

	'</div>' +
	'    <div class="col-12 text-end addRemoveRespondentRow mt-2">' +
	'        <font style="font-size: 25px; color: rgb(78, 154, 6); "><i class="fa fa-plus-square" id="addRespondentButtoncounter2" ' +
	'           title="Add more respondent details" ' +
	'           onclick="addMoreRespondent(this)"></i></font>' +
	'         <font style="font-size: 25px; color: red; "><i class="fa fa-minus-square" id="removeRespondentButtoncounter2" ' +
	'           title="Remove this respondent" ' +
	'           onclick="removeRespondent(this)"></i></font>' +
	'    </div>' +
	'</div>' +
	'</div>';

const saveButtonTemplete =
	'<button type="button" id="clearButton" style="width: 70px;" class="btn btn-md btn-outline-secondary float-end">Clear</button><button type="button" id="saveButton" style="width: 70px;" class="btn btn-md btn-primary float-end mx-2">Submit</button>';

