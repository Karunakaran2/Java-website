const addOrEditUrl = 'addOrEditGrievanceRequest';
const saveUrl = 'saveGrievanceRequest';
const deleteUrl = 'deleteGrievanceRequestDetails';
const listingUrl = "/grievance/grievanceListing/myGrievancesListing?id=" + seatUserAllotedVO.user.id;
const toggleItem = 'sb|addFunction-toggle'

const addToggleTextContent = 'Add Grievance'
const closeToggleTextContent = ''
const addToggleText = document.body.querySelector('#addToggleText');
var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');
const addToggle = document.body.querySelector('#addToggle');
const addButtonArrow = document.body.querySelector('#addbutton-arrow');
const collapseAddHCard = document.body.querySelector('#collapseAddHCard');

$(window).scroll(function() { $(this).scrollTop() > 5 ? $("#addToggle").hide() : $("#addToggle").fadeIn() });

function validateForm() {

	if ($('#categoryId').val() == null || $('#categoryId').val() == "0" || $('#categoryId').val() == "") {
		alert("Please Select Category");
		document.getElementById('categoryId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('categoryId').style.borderColor = "lightgray";
	}
	if ($('#typeId').val() == null || $('#typeId').val() == "0" || $('#typeId').val() == "") {
		alert("Please Select Grievance Type");
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
	if ($('#grievantNameId').val() == null || $('#grievantNameId').val() == "0" || $('#grievantNameId').val() == "") {
		alert("Please Enter Name of Grievant");
		document.getElementById('grievantNameId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('grievantNameId').style.borderColor = "lightgray";
	}

	return true;
}

function ajaxLoad(id, buttonType, actionName) {
	const inputTaker = document.body.querySelector('#inputTaker');
	if (id == '' || id == 0 || id == null) {

		let categoryDisplay = addSampleTemplate;
		let categoryOptions = getcategoryListOptions(categorySetupVOs);
		categoryDisplay = categoryDisplay.replace(/categoryOptions/g, categoryOptions)


		let grievanceTypeDisplay = categoryDisplay;
		let grievanceTypeOptions = getgrievanceTypeListOptions(grievanceTypeVOs);
		grievanceTypeDisplay = grievanceTypeDisplay.replace(/grievanceTypeOptions/g, grievanceTypeOptions)
		inputTaker.innerHTML = grievanceTypeDisplay;

		let attachments = '';
		let newDisplay = grievanceTypeDisplay;
		newDisplay = newDisplay.replace(/attachments/g, attachments)
		inputTaker.innerHTML = newDisplay;
		$('#emailId').val(grievanceRequestFormVO.grievanceRequest.email);
		$('#mobilenoId').val(grievanceRequestFormVO.grievanceRequest.mobileNo);
		$('#addressId').val(grievanceRequestFormVO.grievanceRequest.address);
		$('#grievantNameId').val(grievanceRequestFormVO.grievanceRequest.grievantName);

		$('#buttonSpace').html(saveButtonTemplete);
		const currentMoment = moment().format("YYYY-MM-DD");
		$('#dateOfEventId').attr("max", currentMoment);
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
				if (localStorage.getItem(toggleItem) === 'true') {
					addButtonArrow.classList.remove("d-none")
					addToggleText.textContent = closeToggleTextContent;
					collapseAddHCard.classList.add("show");

				} else {
					addButtonArrow.classList.remove("d-none")
					addToggleText.textContent = closeToggleTextContent;
					addButtonArrow.classList.toggle('rotate45');
					localStorage.setItem(toggleItem, addButtonArrow.classList.contains('rotate45'));
					collapseAddHCard.classList.add("show");
				}

				inputTaker.classList.remove('text-center');
				if (buttonType == "VKpmwOifDEs=") {//for Delete
					$.when(loadTemplate()).then(loadValues(result.resultObject, buttonType)).then($('#buttonSpace').html(deleteButtonTemplete)).then($('#inputTaker').fadeIn(3000));
				}
				else if (buttonType == "xEnbpmjQulU=") {//for Edit
					$.when(loadTemplate()).then(loadValues(result.resultObject, buttonType)).then($('#buttonSpace').html(updateButtonTemplete)).then($('#inputTaker').fadeIn(3000));
				}
				$(window).scrollTop(0);
			}
		});
	}
}

function loadValues(grievanceRequestFormVO, buttonType) {
	//alert(grievanceRequestVO.attachmentsList.length)
	//	alert(grievanceRequestVO.respondentsList.length)
	//	document.getElementById('respondentRowId').innerHTML = '';
	//
	//	for (let count = 0; count < grievanceRequestFormVO.grievanceRequest.respondentsList.length; count++) {
	//		// Clone the template for each respondent
	//		let respondentTemplate = respondentParameterCont.slice();
	//		respondentTemplate = respondentTemplate.replace(/counter2/g, count);
	//
	//		// Create a new div element for the respondent row
	//		let newRow = document.createElement('div');
	//		newRow.className = 'respondentRow'; // Use your actual row class name
	//		newRow.innerHTML = respondentTemplate;
	//
	//		// Append the new row to the container
	//		document.getElementById('respondentRowId').appendChild(newRow);
	//
	//		// Set values after a slight delay
	//		setTimeout(function() {
	//			// Your existing value setting code goes here
	//			$('#respondentHidId' + count).val(grievanceRequestFormVO.grievanceRequest.respondentsList[count].id);
	//			$('#respondentHidIdEnc' + count).val(grievanceRequestFormVO.grievanceRequest.respondentsList[count].idEnc);
	//			$('#TitleIdRespondent' + count).val(grievanceRequestFormVO.grievanceRequest.respondentsList[count].titleNameRespondent);
	//			$('#againstId' + count).val(grievanceRequestFormVO.grievanceRequest.respondentsList[count].respondentName);
	//			$('#respondentEmailId' + count).val(grievanceRequestFormVO.grievanceRequest.respondentsList[count].respondentEmail);
	//			$('#respondentPhoneNoId' + count).val(grievanceRequestFormVO.grievanceRequest.respondentsList[count].respondentMobileNo);
	//			$('#respondentPermanentAddressId' + count).val(grievanceRequestFormVO.grievanceRequest.respondentsList[count].respondentPermanentAddress);
	//			$('#respondentCommunicationAddressId' + count).val(grievanceRequestFormVO.grievanceRequest.respondentsList[count].respondentCommunicationAddress);
	//
	//			$('.addRespondentRow', newRow).on('click', function() {
	//				addMoreRespondent(this, index + 1);
	//			});
	//
	//		}, 100);
	//	}

	//**********************old version attachment load*******************************//
	//	let attachments = '';
	//	for (var count = 0; count < grievanceRequestVO.attachmentsList.length; count++) {
	//		//alert()
	//		let option = '<div class="row"><div class="2 text-decoration-underline text-primary" style="font-size:13px">' +
	//			grievanceRequestVO.attachmentsList[count].subject +
	//			'</div><div class="col-4 fw-200 fst-italic" style="font-size:13px">' +
	//			'<a class="text-dark" target="_blank" href="/grievance/grievance/downloadGrievanceAttachment?idEnc='
	//			+ grievanceRequestVO.attachmentsList[count].idEnc + '"> '
	//			/*+contractsDetailsVO.attachmentsList[count].attachmentSubject+" - "*/
	//			+ grievanceRequestVO.attachmentsList[count].attachmentName +
	//			' </a><a id="" href="javascript:void(0);" onclick="return removeAttachment(' + "'"
	//			+ grievanceRequestVO.attachmentsList[count].idEnc + "'" + ",'"
	//			+ grievanceRequestVO.idEnc + "','" + buttonType + "',  '" + addOrEditUrl + "'"
	//			+ ')" style="display: inline-block; text-align: right">' +
	//			'<font style="font-size: 20px; color: rgb(78, 154, 6); ">' +
	//			'<i class="mt-1 fa fa-times text-danger fst-italic" aria-hidden="true" title="Click to remove attachment"></i>' +
	//			'</font></a></div></div>';
	//		attachments = attachments + option;
	//	}
	//
	//	let newDisplay = $('#inputTaker').html();
	//	newDisplay = newDisplay.replace(/attachments/g, attachments)
	//	inputTaker.innerHTML = newDisplay;
	//	let attachments = '';
	//	for (var count = 0; count < grievanceRequestVO.attachmentsList.length; count++) {
	//		let option = '<div class="d-flex badge bg-primary-soft text-primary text-center my-2 mx-2" style="font-size:13px">' +
	//			'<div class="fs-6 pt-1 pe-1">' +
	//			grievanceRequestVO.attachmentsList[count].subject +
	//			'</div>' +
	//			'<div>' +
	//			'<a class="btn btn-datatable btn-icon btn-transparent-dark" target="_blank" href="/grievance/grievance/downloadGrievanceAttachment?idEnc=' +
	//			grievanceRequestVO.attachmentsList[count].idEnc + '">' +
	//			'<i data-feather="download" color="green" data-bs-toggle="tooltip" data-bs-placement="left"></i></a>' +
	//			'<a class="btn btn-datatable btn-icon btn-transparent-dark" href="javascript:void(0);" ' +
	//			'onclick="return removeAttachment(\'' + grievanceRequestVO.attachmentsList[count].idEnc + '\', \'' +
	//			grievanceRequestVO.idEnc + '\', \'' + buttonType + '\', \'' + addOrEditUrl + '\')" >' +
	//			'<i data-feather="x" color="red" data-bs-toggle="tooltip" data-bs-placement="right"></i></a>' +
	//			'</div>' +
	//			'</div>';
	//		attachments = attachments + option;
	//	}
	//
	//	let newDisplay = $('#inputTaker').html();
	//	newDisplay = newDisplay.replace(/attachments/g, attachments);
	//	inputTaker.innerHTML = newDisplay;
	//	feather.replace();


	//alert(grievanceRequestVO.mobileNo)
	$('#requestId').val(grievanceRequestFormVO.grievanceRequest.id);
	$('#categoryId').val(grievanceRequestFormVO.grievanceRequest.category.id);
	$('#TitleId').val(grievanceRequestFormVO.grievanceRequest.titleName);
	$('#applicationNumberId').val(grievanceRequestFormVO.grievanceRequest.applicationNo);
	$('#applicationNumberAutoId').val(grievanceRequestFormVO.grievanceRequest.applicationNoAuto);
	$('#typeId').val(grievanceRequestFormVO.grievanceRequest.grievanceType.id);
	$('#complaintId').val(grievanceRequestFormVO.grievanceRequest.complaint);
	$('#grievantNameId').val(grievanceRequestFormVO.grievanceRequest.grievantName);
	$('#againstId').val(grievanceRequestFormVO.grievanceRequest.against);
	$('#emailId').val(grievanceRequestFormVO.grievanceRequest.email);
	$('#mobilenoId').val(grievanceRequestFormVO.grievanceRequest.mobileNo);
	$('#addressId').val(grievanceRequestFormVO.grievanceRequest.address);
	$('#placeId').val(grievanceRequestFormVO.grievanceRequest.place);
	$('#dateOfEventId').val(grievanceRequestFormVO.grievanceRequest.dateOfEventStr);
	$('#grievanceDescriptionId').val(grievanceRequestFormVO.grievanceRequest.grievanceDescription);
	$('#solutionDescriptionId').val(grievanceRequestFormVO.grievanceRequest.solutionDescription);
	populateAttachmentsValue(grievanceRequestFormVO);
	//	populateIdProofValues(grievanceRequestFormVO.idProofVOs);
}

//var idProofTemplateLoad = '<div class="d-flex badge bg-primary-soft text-primary text-center my-2 mx-2" data-proof-id="attachmentIdEnc"><div class="fs-6 pt-1 pe-1">attachmentName</div><div ><a class="btn btn-datatable btn-icon btn-transparent-dark" href="javascript:idProofDownload(\'attachmentIdEnc\')"><i data-feather="download" color="green" data-bs-toggle="tooltip" data-bs-placement="left" ></i></a><a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:deleteIdProof(\'attachmentIdEnc\')"><i data-feather="x" color="red" data-bs-toggle="tooltip" data-bs-placement="right" ></i></a></div></div>';
//let selectedValues = [];

//function populateIdProofValues(idProofVOs) {
////    let idProofVOs = grievanceRequestFormVO.idProofVOs;
//    selectedValues = []; // Reset global array
//
//    if (idProofVOs !== null && idProofVOs !== undefined) {
//        let idProofDisplay = '';
//        for (let count = 0; count < idProofVOs.length; count++) {
//            let idProofSingle = idProofTemplateLoad;
//
//            let nameToDisplay;
//            if (idProofVOs[count].idProofType === 'A') {
//                nameToDisplay = 'Aadhaar';
//            } else if (idProofVOs[count].idProofType === 'P') {
//                nameToDisplay = 'PAN Card';
//            } else if (idProofVOs[count].idProofType === 'L') {
//                nameToDisplay = 'Licence';
//            } else if (idProofVOs[count].idProofType === 'V') {
//                nameToDisplay = 'Voter id';
//            } else {
//                nameToDisplay = idProofVOs[count].idProofType; // fallback to the original type
//            }
//
//            selectedValues.push(idProofVOs[count].idProofType);
//
//            idProofSingle = idProofSingle.replace(/attachmentName/g, nameToDisplay);
//            idProofSingle = idProofSingle.replace(/attachmentIdEnc/g, idProofVOs[count].idEnc);
//            idProofDisplay = idProofDisplay + idProofSingle;
//        }
//        $('#proofRow').html(idProofDisplay);
//        feather.replace();
//        proofTemplateLoad();
//    }
//
//    updateDropdowns();
//}

//function proofTemplateLoad() {
//    const rowTaker = document.body.querySelector('#additionalIdProofAttachmentRow');
//    let jnSingle = idproofTemplate;
//    jnSingle = jnSingle.replace(/Count/g, 0);
//    rowTaker.innerHTML = '<div class="idProofRow">' + jnSingle + '</div>';
//}

//function addIdProofNewRow(element) {
//    // Check if any dropdown has a value of '0'
//    let allSelected = true;
//    $('.proofTypeDropdown').each(function() {
//        if ($(this).val() === '0') {
//            allSelected = false;
//            return false; // Break out of the loop
//        }
//    });
//
//    if (!allSelected) {
//        alert('Please select id proof type');
//        return; // Prevent adding a new row
//    }
//
//    var res = $(element).closest('.idProofRow').find('[id^="idProofButton"]').attr('id').split("Button", 2);
//    var listCount = parseInt(res[1]) + 1;
//    $('[id^="idProofButton"]').hide();
//    var rowData = idproofTemplate;
//    rowData = rowData.replace(/Count/g, listCount);
//    $(element).closest('.idProofRow').after($('<div class="idProofRow"></div>').append(rowData));
//    
//    // Collect current selected values and merge with global selectedValues
//    selectedValues = []; // Reset global selectedValues
//    $('.proofTypeDropdown').each(function() {
//        var selectedValue = $(this).val();
//        if (selectedValue !== '0') {
//            selectedValues.push(selectedValue);
//        }
//    });
//    
//    updateDropdowns(); // Update dropdowns after adding a new row
//}
//
//function removeIdProofRow(element) {
//    var listLength = $('[class="idProofRow"]').length;
//    if (listLength > 0) { // Ensure at least one row remains
//        $(element).closest(".idProofRow").remove();
//        $('[id^="idProofButton"]').hide();
//        $('[id="' + $('.idProofRow:last').find('[id^="idProofButton"]').attr('id') + '"]').show();
//    } else {
//        alert("Minimum one Detail required");
//    }
//
//    // Re-collect selected values after removing a row
//    selectedValues = [];
//    $('.proofTypeDropdown').each(function() {
//        var selectedValue = $(this).val();
//        if (selectedValue !== '0') {
//            selectedValues.push(selectedValue);
//        }
//    });
//
//    updateDropdowns(); // Update dropdowns after removing a row
//}
//
//function updateDropdowns() {
//    // Ensure the selectedValues array is unique
//    selectedValues = [...new Set(selectedValues)];
//
//    // Update options in all dropdowns
//    $('.proofTypeDropdown').each(function() {
//        var currentDropdown = $(this);
//        var currentSelectedValue = currentDropdown.val();
//
//        currentDropdown.find('option').each(function() {
//            var optionValue = $(this).attr('value');
//            if (optionValue !== '0') {
//                if (selectedValues.includes(optionValue) && optionValue !== currentSelectedValue) {
//                    $(this).hide(); // Hide if selected in another dropdown
//                } else {
//                    $(this).show(); // Show if not selected or selected in current dropdown
//                }
//            }
//        });
//    });
//}
//
//$(document).ready(function() {
//    updateDropdowns();
//});


//function updateDropdowns(selectedValues) {
//    // Collect selected values
//    var selectedValues = [];
//    $('.proofTypeDropdown').each(function() {
//        var selectedValue = $(this).val();
//        if (selectedValue !== '0') {
//            selectedValues.push(selectedValue);
//        }
//    });
//
//    // Update options in all dropdowns
//    $('.proofTypeDropdown').each(function() {
//        var currentDropdown = $(this);
//        currentDropdown.find('option').each(function() {
//            var optionValue = $(this).attr('value');
//            if (optionValue !== '0' && !selectedValues.includes(optionValue)) {
//                $(this).show(); // Show only if not selected
//            } else {
//                $(this).hide();
//            }
//        });
//    });
//
//    // Ensure the selected option remains visible in each dropdown
//    $('.proofTypeDropdown').each(function() {
//        var selectedValue = $(this).val();
//        if (selectedValue !== '0') {
//            $(this).find('option[value="' + selectedValue + '"]').show();
//        }
//    });
//}
//
//$(document).ready(function() {
//    updateDropdowns();
//});

//function idProofDownload(attachmentIdEnc) {
//	window.open('/grievance/grievance/downloadIdProof?idEnc=' + attachmentIdEnc, '_blank');
//}
//function deleteIdProof(attachmentIdEnc) {
//	$.ajax({
//		url: "/grievance/grievance/deleteIdProofUploads?attachmentIdEnc=" + attachmentIdEnc,
//		type: 'POST',
//		data: $('#newForm').serialize(),
//		success: function(result) {
//			if (result.result == 'Y') {
//				displaySuccessToastNew('fieldErrors', "Attachment Successfully Deleted")
//				table.ajax.reload();
//				removeIdproofFromUI(attachmentIdEnc);
//				populateIdProofValues(result.idProofVOs)
//			} else {
//				displayFieldErrors(result)
//			}
//		}
//	});
//}
//function removeIdproofFromUI(attachmentIdEnc) {
//	// Identify and remove the deleted attachment from the UI
//	var idproofElement = $('[data-proof-id="' + attachmentIdEnc + '"]');
//	idproofElement.remove();
//	
//}
var attachmentTemplateLoad = '<div class="d-flex badge bg-primary-soft text-primary text-center my-2 mx-2" data-attachment-id="attachmentIdEnc"><div class="fs-6 pt-1 pe-1">attachmentName</div><div ><a class="btn btn-datatable btn-icon btn-transparent-dark" href="javascript:attachmentDownload(\'attachmentIdEnc\')"><i data-feather="download" color="green" data-bs-toggle="tooltip" data-bs-placement="left" ></i></a><a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:deleteAttachment(\'attachmentIdEnc\')"><i data-feather="x" color="red" data-bs-toggle="tooltip" data-bs-placement="right" ></i></a></div></div>';
function populateAttachmentsValue(grievanceRequestFormVO) {
	let grievanceAttachmentsVOs = grievanceRequestFormVO.grievanceAttachmentsVOs;
	let grievanceRequest = grievanceRequestFormVO.grievanceRequest;
	if (grievanceRequest.uploadStatus == 'Y') {
		let attachmentDisplay = '';
		for (let count = 0; count < grievanceAttachmentsVOs.length; count++) {
			let attachmentSingle = attachmentTemplateLoad;
			attachmentSingle = attachmentSingle.replace(/attachmentName/g, grievanceAttachmentsVOs[count].subject);
			attachmentSingle = attachmentSingle.replace(/attachmentIdEnc/g, grievanceAttachmentsVOs[count].idEnc);
			attachmentDisplay = attachmentDisplay + attachmentSingle;
		}
		$('#attachmentRow').html(attachmentDisplay);
		feather.replace();
		templateLoad();
	}

}
function templateLoad() {
	const rowTaker = document.body.querySelector('#additionalAttachmentRow');
	let jnSingle = jnParameterCont
	jnSingle = jnSingle.replace(/Count/g, 0);
	rowTaker.innerHTML = '<div class="jnDetailRow">' + jnSingle + '</div>';
}
function attachmentDownload(attachmentIdEnc) {
	window.open('/grievance/grievance/downloadGrievanceAttachment?idEnc=' + attachmentIdEnc, '_blank');
}
function deleteAttachment(attachmentIdEnc) {
	$.ajax({
		url: "/grievance/grievance/deleteGrievanceAttachment?attachmentIdEnc=" + attachmentIdEnc,
		type: 'POST',
		data: $('#newForm').serialize(),
		success: function(result) {
			if (result.result == 'Y') {
				displaySuccessToastNew('fieldErrors', "Attachment Successfully Deleted")
				table.ajax.reload();
				removeAttachmentFromUI(attachmentIdEnc);
			} else {
				displayFieldErrors(result)
			}
		}
	});
}
function removeAttachmentFromUI(attachmentIdEnc) {
	// Identify and remove the deleted attachment from the UI
	var attachmentElement = $('[data-attachment-id="' + attachmentIdEnc + '"]');
	attachmentElement.remove();
}

function loadTemplate() {

	let categoryDisplay = addSampleTemplate;
	let categoryOptions = getcategoryListOptions(categorySetupVOs);
	categoryDisplay = categoryDisplay.replace(/categoryOptions/g, categoryOptions)


	let grievanceTypeDisplay = categoryDisplay;
	let grievanceTypeOptions = getgrievanceTypeListOptions(grievanceTypeVOs);
	grievanceTypeDisplay = grievanceTypeDisplay.replace(/grievanceTypeOptions/g, grievanceTypeOptions)
	inputTaker.innerHTML = grievanceTypeDisplay;
}


function loadRespondednts(element) {
	var res = $(element).closest('.respondentRow').find('[id^="addRespondentButton"]').attr('id').split("Button", 2);
	var listCount = parseInt(res[1]) + 1;
	$('[id^="addRespondentButton"]').hide();
	var rowData = respondentParameterCont;
	rowData = rowData.replace(/counter2/g, listCount);
	$(element).closest('.respondentRow').after($('<div class="respondentRow" ></div>').append(rowData));
	//$(element).closest('div.addRespondentRow').after($('<div class="row respondentRow mt-2"></div>').append(rowData));

}

function enableDisableTextBox() {
	if ((document.getElementById('checkboxId').checked == true)) {
		//alert()
		$('#emailIdDiv').hide();
		$('#mobilenoIdDiv').hide()
		$('#addressIdDiv').hide();
		$('#requestTypeId').val("A");

	}
	else {
		$('#emailIdDiv').show();
		$('#mobilenoIdDiv').show();
		$('#addressIdDiv').show();
		$('#requestTypeId').val("N");
	}
	//alert($('#checkboxId').val());
}

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

//**********************old save*****************************************//
//$(document).on("click", "#saveButton", function() {
//
//
//
//	var formData = new FormData($("#newForm")[0]);
//	if (validateForm()) {
//		$.ajax({
//			url: saveUrl,
//			type: 'POST',
//			data: formData,
//			async: false,
//			cache: false,
//			processData: false,
//			contentType: false,
//			beforeSend: function() {
//				$('#saveButton').attr('disabled', 'disabled')
//			},
//			success: function(result) {
//
//				$("#saveButton").removeAttr("disabled");
//				$('#saveButton').html("Update")
//				if (result.result == 'Y') {
//					$('#requestId').val(result.resultObject.id);
//					displaySuccessToastNew('fieldErrors', "Successfully Saved");
//					table.ajax.reload();
//				} else {
//					displayFieldErrors(result)
//				}
//			}
//		});
//	}
//});
// Display the confirmation modal when the save button is clicked
$(document).on("click", "#saveButton", function() {
	if (validateForm()) {
		$('#confirmationModal').modal('show');
	}
});
// Handle the user's choice when they click "Yes" in the modal
$(document).on('click', '#confirmYesButton', function() {
	$('#confirmationModal').modal('hide');
	var formData = new FormData($("#newForm")[0]);
	if (validateForm()) {
		$.ajax({
			url: saveUrl,
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			processData: false,
			contentType: false,
			beforeSend: function() {
				$('#saveButton').attr('disabled', 'disabled');
			},
			success: function(result) {
				$("#saveButton").removeAttr("disabled");
				$('#saveButton').html("Update");
				if (result.result == 'Y') {
					$('#requestId').val(result.resultObject.grievanceRequest.id);
					$('#applicationNumberId').val(result.resultObject.grievanceRequest.applicationNo);
					$('#applicationNumberAutoId').val(result.resultObject.grievanceRequest.applicationNoAuto);
					for (i = 0; i < result.resultObject.grievanceRequest.respondentsList.length; i++) {
						$('#respondentHidId' + i).val(result.resultObject.grievanceRequest.respondentsList[i].id);
						$('#respondentHidId' + i).val();
					}
					//					populateIdProofValues(result.resultObject.idProofVOs);
					populateAttachmentsValue(result.resultObject);
					displaySuccessToastNew('fieldErrors', "Successfully Saved");
					table.ajax.reload();
					if (result.resultObject.attachmentStatus == 'N') {
						alert("Attachment file is not saved.Please select a valid file.")
					}

				} else {
					displayFieldErrors(result);
				}
			},
			complete: function() {
			}
		});
	}
});
// Handle the user's choice when they click "No" in the modal
$(document).on('click', '#confirmationModal button[data-dismiss="modal"]', function() {
	// Close the modal without saving and re-enable the save button
	$('#saveButton').removeAttr('disabled');
	$('#confirmationModal').modal('hide');
});


$(document).on("click", "#updateButton", function() {
	var formData = new FormData($("#newForm")[0]);
	if (validateForm()) {
		$.ajax({
			url: saveUrl,
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			processData: false,
			contentType: false,
			beforeSend: function() {
				$('#saveButton').attr('disabled', 'disabled')
			},
			success: function(d) {
				if (d.result == 'Y') {
					displaySuccessToastNew('fieldErrors', "Successfully Updated");
					//					populateIdProofValues(d.resultObject.idProofVOs);
					populateAttachmentsValue(d.resultObject);
					table.ajax.reload();
					if (d.resultObject.attachmentStatus == 'N') {
						alert("Attachment file is not saved.Please select a valid file.")
					}
				} else {
					displayFieldErrors(d)
				}
			}
		});
	}
});


function viewGrievanceRequestDetails(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewGrievanceRequestDetails?idEnc=" + idEnc + "&status=N";
	window.location.href = redirectURL;
}


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

//function addIdProofNewRow(element) {
//    var res = $(element).closest('.idProofRow').find('[id^="idProofButton"]').attr('id').split("Button", 2);
//    var listCount = parseInt(res[1]) + 1;
//    $('[id^="idProofButton"]').hide();
//    var rowData = idproofTemplate;
//    rowData = rowData.replace(/Count/g, listCount);
//    $(element).closest('.idProofRow').after($('<div class="idProofRow"></div>').append(rowData));
//    updateDropdowns(); // Update dropdowns after adding a new row
//}
//
//function removeIdProofRow(element) {
//    var listLength = $('[class="idProofRow"]').length;
//    if (listLength > 1) { // Ensure at least one row remains
//        $(element).closest(".idProofRow").remove();
//        $('[id^="idProofButton"]').hide();
//        $('[id="' + $('.idProofRow:last').find('[id^="idProofButton"]').attr('id') + '"]').show();
//    } else {
//        alert("Minimum one Detail required");
//    }
//    updateDropdowns(); // Update dropdowns after removing a row
//}
//
//function updateDropdowns() {
//    // Collect selected values
//    var selectedValues = [];
//    $('.proofTypeDropdown').each(function() {
//        var selectedValue = $(this).val();
//        if (selectedValue !== '0') {
//            selectedValues.push(selectedValue);
//        }
//    });
//
//    // Update options in all dropdowns
//    $('.proofTypeDropdown').each(function() {
//        var currentDropdown = $(this);
//        currentDropdown.find('option').each(function() {
//            var optionValue = $(this).attr('value');
//            if (optionValue !== '0' && selectedValues.includes(optionValue)) {
//                $(this).hide();
//            } else {
//                $(this).show();
//            }
//        });
//    });
//
//    // Ensure the selected option remains visible in each dropdown
//    $('.proofTypeDropdown').each(function() {
//        var selectedValue = $(this).val();
//        if (selectedValue !== '0') {
//            $(this).find('option[value="' + selectedValue + '"]').show();
//        }
//    });
//}
//
//
//$(document).ready(function() {
//    updateDropdowns();
//});
//function addIdProofNewRow(element) {
//	var res = $(element).closest('.idProofRow').find('[id^="idProofButton"]').attr('id').split("Button", 2);
//	var listCount = parseInt(res[1]) + 1;
//	$('[id^="idProofButton"]').hide();
//	var rowData = idproofTemplate;
//	rowData = rowData.replace(/Count/g, listCount);
//	$(element).closest('.idProofRow').after($('<div class="idProofRow" ></div>').append(rowData));
//}
//
//function removeIdProofRow(element, count) {
//	var listLength = $('[class="idProofRow"]').length;
//	if (listLength > 0) {
//		$(element).closest(".idProofRow").remove();
//		$('[id^="idProofButton"]').hide();
//		$('[id="' + $('.idProofRow:last').find('[id^="idProofButton"]').attr('id') + '"]').show();
//	} else {
//		alert("Minimum one Detail required")
//	}
//}


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

	if (respondentId != null && respondentId != "") {
		$.ajax({
			url: 'removeRespondentdetail?',
			method: 'GET',
			data: { respondentId: respondentId },
			success: function(response) {

				respondentRow.remove();
			},
			error: function(error) {
				console.error('Error removing respondent:', error);

			}
		});
	}

	else {

		respondentRow.remove();
	}
}



//function removeRespondent(button) {
//    // Get the parent container of the respondent row
//    const respondentRow = $(button).closest('.respondentRow');
//
//    // Remove the respondent row
//    respondentRow.remove();
//}


//function addMoreRespondentzzzzz(element) {
//	var listLength = $('#respondentRowId').find('div.respondentRow').length;
//	alert(listLength)
//	var rowData = $('#respondentRowAdd').html();
//	alert(rowData)
//	rowData = rowData.replace(/counter2/g, listLength);
//	$(element).closest('div.addRespondentRow')
//		.before(
//			$('<div class="row respondentRow mt-2"></div>').append(
//				rowData));
//	//$(element).closest('div.addRespondentRow').after($('<div class="row respondentRow mt-2"></div>').append(rowData));
//
//}

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


//function checkEmail(id) {
//	var emailInput = $('#' + id).val();
//	var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//
//	if (emailRegex.test(emailInput.value)) {
//		return true;
//	} else {
//		alert("You have entered an invalid email address!");
//		$('#' + id).val("");
//		setTimeout(function() {
//		$('#' + id).focus();
//		}, 10);
//		return false;
//	}
//}
function checkEmail(id) {
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






$(document).on("click", "#deleteButton", function() {
	if (confirm("Do you want to Delete?")) {
		$.ajax({
			url: deleteUrl,
			type: 'POST',
			data: $('#newForm').serialize(),
			beforeSend: function() {
				$('#deleteButton').attr('disabled', 'disabled')
			},
			success: function(result) {
				if (result.result == 'Y') {
					$.when(ajaxLoad('', '', addOrEditUrl)).then(displaySuccessToastNew('fieldErrors', "Successfully Deleted"))
					table.ajax.reload();
				} else {
					displayFieldErrors(result)
				}



			}
		});
	}
});
$(document).on("click", "#clearButton", function() {
	ajaxLoad('', '', addOrEditUrl);
});



window.addEventListener('DOMContentLoaded', event => {
	if (addToggle) {
		if (localStorage.getItem(toggleItem) === 'true') {
			addButtonArrow.classList.remove("d-none")
			addButtonArrow.classList.toggle('rotate45');
			collapseAddHCard.classList.add("show");
			addToggleText.textContent = closeToggleTextContent;
			ajaxLoad('', '', addOrEditUrl)
		} else {
			addButtonArrow.classList.add("d-none")
			collapseAddHCard.classList.remove("show");
			addToggle.classList.add("btn-outline-primary")
			addToggleText.textContent = addToggleTextContent;
		}
		addToggle.addEventListener('click', event => {
			addButtonArrow.classList.toggle('rotate45');
			localStorage.setItem(toggleItem, addButtonArrow.classList.contains('rotate45'));
			if (localStorage.getItem(toggleItem) === 'true') {
				addButtonArrow.classList.remove("d-none")
				collapseAddHCard.classList.add("show");
				addToggleText.textContent = closeToggleTextContent;
				ajaxLoad('', '', addOrEditUrl)
			} else {
				addButtonArrow.classList.add("d-none")
				collapseAddHCard.classList.remove("show");
				addToggleText.textContent = addToggleTextContent;
				document.body.querySelector('#inputTaker').innerHTML = ''
			}
		});
	}
});

var table = $('#tableData').DataTable({
	"processing": true,
	"serverSide": true,
	"ajax": {
		"url": listingUrl,
		"type": "POST",
		"dataType": "json",
		"contentType": "application/json",
		"data": function(d) {
			return JSON.stringify(d);
		},
	},
	'aoColumnDefs': [{
		'bSortable': false,
		'aTargets': [-1] /* 1st one, start by the right */

	}],
	"drawCallback": function(settings) {
		feather.replace();
		$('[data-bs-toggle="tooltip"]').tooltip();
	},
	"columns": [{
		"data": "0",
		"className": "text-center",
		render: function(data, type, row, meta) {
			return meta.row + meta.settings._iDisplayStart + 1;
		}
	},

	{
		"data": "0",
		"render": function(data, type, row) {
			if (row[6] == 'N' || row[6] == 'P')
				return '<div class="inline-block fw-600 text-uppercase" ><a class="link-blue" href="javascript:viewGrievanceRequestDetails(' + "'" + row[8] + "'" + ')">' + data + '</a></div>';
			else
				return '<div class="inline-block fw-600 text-uppercase" ><a class="link-blue" href="javascript:viewGrievanceRequestDetails(' + "'" + row[8] + "'" + ')">' + data + '</a><div class="float-end badge badge-status fst-italic text-center">Anonymous</div></div>';
		}
	},

	{ "data": "1" },
	{ "data": "2" },
	{ "data": "3" },
	{
		"data": "9",

	},
	//	{ "data": "7",
	//		"render": function(data, type, row) {
	//			if (row[6] == 'N')
	//				return '<div>'+data+'</div>';
	//				else
	//				return '<div >--</div>';
	//		}
	//	 },
	{
		"data": "4",
		"render": function(data, type, row) {
			return '<div class="inline-block text-center" >' + data + '</div>';
		}
	},
	{
		"data": "6",
		"className": "text-center",
		"render": function(data, type, row) {
			if (row[5] == 'N')
				return '<div class="badge badge-status text-center text-primary bg-primary-soft" >Initiated</div>';
			if (row[5] == 'S')
				return '<div class="badge bg-warning badge-status text-center" >Processing</div>';
			if (row[5] == 'C')
				return '<div class="badge bg-success badge-status text-center" >Settled</div>';
		}
	},
	{
		"title": "Action",
		"data": "8",
		"searchable": false,
		"sortable": false,
		"render": function(data, type, row) {

			iconEdit = '<i data-feather="edit" color="blue"  data-bs-toggle="tooltip" data-bs-placement="top" title="Edit "></i>'
			iconDel = '<i   data-feather="trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete "></i>'
			iconSubmit = '<i   data-feather="file" color="blue" data-bs-toggle="tooltip" data-bs-placement="top" title="View Request Details "></i>'
			if (row[5] == 'N')
				iconSubmit = '<i   data-feather="send" color="green" data-bs-toggle="tooltip" data-bs-placement="top" title="Submit"></i>'
			if (row[5] == 'N') {
				return '<div class="inline-block text-center" ><a class="btn btn-datatable btn-icon btn-action-primary "  href="javascript:ajaxLoad(' + "'" + data + "'" + ",'xEnbpmjQulU='," + "'" + addOrEditUrl + "'" + ')">' + iconEdit + '</a>' +
					'<a class="btn btn-datatable btn-icon btn-action-danger " href="javascript:ajaxLoad(' + "'" + data + "'" + ",'VKpmwOifDEs='," + "'" + addOrEditUrl + "'" + ')" >' + iconDel + '</a>' +
					'<a class="btn btn-datatable btn-icon btn-action-success " href="javascript:viewGrievanceRequestDetails(' + "'" + row[8] + "'" + ')" >' + iconSubmit + '</a>' +
					'';
			}
			else
				return '<div class="inline-block text-center" >' +
					'<a class="btn btn-datatable btn-icon btn-action-success " href="javascript:viewGrievanceRequestDetails(' + "'" + row[8] + "'" + ')" >' + iconSubmit + '</a>' +
					'</div>';

		}
	}
	]
});


var addSampleTemplate = '' +
	'<form id="newForm" enctype="multipart/form-data">' +
	'<input type="hidden" name="requestType" id="requestTypeId" value="N">' +
	'<div class="row ">' +
	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-1">' +
	'<h6 id="headingLabelId"><span style="color: #01458E;">Grievance Form</span></h6>' +
	'		</div>' +
	'		</div>' +

	'<div class="row ">' +


	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 pt-3">' +
	'			<input type="hidden" id="requestId" name="grievanceRequest.id">' +
	'			<input type="hidden" id="applicationNumberId" name="grievanceRequest.applicationNo">' +
	'			<input type="hidden" id="applicationNumberAutoId" name="grievanceRequest.applicationNoAuto">' +
	'			<div class="form-group custom-form-group"> <select class="form-select custom-select custom-input" data-width="100%" data-live-search="true" title="Select Category"  name="grievanceRequest.category.id" id="categoryId">' +
	' <option value="0">--Select Category--</option>categoryOptions </select> <label for="category">Category <font color="red">*</font></label> </div>' +

	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 pt-3">' +
	'			<div class="form-group custom-form-group"> <select class="form-select custom-select custom-input" data-width="100%" data-live-search="true" title="Select Type"  name="grievanceRequest.grievanceType.id" id="typeId">' +
	' <option value="0">--Select Type--</option>grievanceTypeOptions </select> <label for="Type">Type <font color="red">*</font></label> </div>' +

	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-3">' +

	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="complaintId" placeholder="" name="grievanceRequest.complaint">' +
	' <label for="place">Subject<font color="red">*</font></label> </div>' +

	'		</div>' +


	//	'<div class="col-sm-12 col-md-6 col-lg-2 col-xl-2 pt-3">' +
	//	'    <div class="form-group custom-form-group">' +
	//	'        <select class="form-select custom-select custom-input" id="TitleId" name="titleName">' +
	//	'            <option value="Mr.">Mr.</option>' +
	//	'            <option value="Mrs.">Mrs.</option>' +
	//	'            <option value="Ms.">Ms.</option>' +
	//	'        </select>' +
	//	'        <label for="Title">Title&nbsp;<font color="red">*</font></label>' +
	//	'    </div>' +
	//	'</div>' +




	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +

	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="grievantNameId" placeholder="" name="grievanceRequest.grievantName" readonly>' +
	' <label for="place">Name of Grievant<font color="red">*</font></label> </div>' +

	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +

	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="emailId" placeholder="" name="grievanceRequest.email" readonly>' +
	' <label for="place">Email Id</label> </div>' +

	'		</div>' +



	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3" id="mobilenoIdDiv">' +

	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="mobilenoId" placeholder="" name="grievanceRequest.mobileNo" oninput="validateContactNumber(this)" maxlength="10" readonly>' +
	' <label for="place">Contact Number</label> </div>' +

	'		</div>' +

	'		<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 pt-3 " id="addressIdDiv">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input h-42px " id="addressId" placeholder="" name="grievanceRequest.address" ></textarea>' +
	' <label for="purpose">Address of Grievant</label> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 pt-3">' +

	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="placeId" placeholder="" name="grievanceRequest.place">' +
	' <label for="place">Place of incident leading to Grievance</label> </div>' +

	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-2 col-xl-2 pt-3">' +

	'			<div class="form-group custom-form-group"> <input type="date" class="form-control custom-input" id="dateOfEventId" placeholder="" name="grievanceRequest.dateOfEventStr">' +
	' <label for="doa">Date of Incident</label> </div>' +

	'		</div>' +


	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input h-42px " id="grievanceDescriptionId" placeholder="" name="grievanceRequest.grievanceDescription" ></textarea>' +
	' <label for="purpose">Detailed Description of Grievance</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +


	//	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	//	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input h-42px " id="solutionDescriptionId" placeholder="" name="grievanceRequest.solutionDescription" ></textarea>' +
	//	' <label for="purpose">Desired Resolution/ Suggestions</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	//	'		</div>' +


	'	</div>' +
	'	</div>' +
	//	'<div class="row">' +
	//	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2">' +
	//	'			<div class="page-header page-header-compact page-header-light text-primary  mb-1">' +
	//	'				<h6><span style="color: #01458E;">Respondents Details</span><h6></div> <p class="fst-italic" style="font-size: 13px;"> (refer to the identifying information of the individual, organization, or party being accused or addressed in response to the submitted complaint or concern)</p>' +
	//	'		</div>' +
	//	'<div id="respondentRowId" class="p-2">' +
	//	'<div class="row respondentRow">' +
	//
	//	'			<input type="hidden" id="respondentHidId0" name="grievanceRequest.respondentsList[0].id">' +
	//	'			<input type="hidden" id="respondentHidIdEnc0" name="grievanceRequest.respondentsList[0].idEnc">' +
	//
	//	'<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 pt-3">' +
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
	//
	//	'		<div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-3">' +
	//	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentNameId" placeholder="" name="grievanceRequest.respondentsList[0].respondentName">' +
	//	' <label for="place">Name</label> </div>' +
	//	'		</div>' +
	//
	//	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	//	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentEmailId" placeholder="" name="grievanceRequest.respondentsList[0].respondentEmail" onchange="checkEmail(this.id)">' +
	//	' <label for="place">Email Id</label> </div>' +
	//	'		</div>' +
	//
	//
	//	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	//	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" maxlength="10" id="respondentPhoneNoId" placeholder="" oninput="validateContactNumber(this)" name="grievanceRequest.respondentsList[0].respondentMobileNo">' +
	//	' <label for="place">Contact Number </label> </div>' +
	//	'		</div>' +
	//
	//
	//	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	//	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input h-42px " id="respondentPermanentAddressId" placeholder="" name="grievanceRequest.respondentsList[0].respondentPermanentAddress" ></textarea>' +
	//	' <label for="place">Permanent Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	//	'		</div>' +
	//
	//	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	//	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input h-42px " id="respondentCommunicationAddressId" placeholder="" name="grievanceRequest.respondentsList[0].respondentCommunicationAddress" ></textarea>' +
	//	' <label for="place">Communication Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	//	'		</div>' +
	//
	//
	//
	//	'<div class="col-12 text-end addRespondentRow mt-2">' +
	//	'<font style="font-size: 25px; color: rgb(78, 154, 6); "><i class="fa fa-plus-square" id="addRespondentButton0"' +
	//	'title="Add more respondent details"' +
	//	'onclick="addMoreRespondent(this)"></i></font>' +
	//	'</div>' +
	//	'</div>' +
	//	'</div>' +
	//
	//
	//
	//	'	</div>' +
	//	'<div class="col-auto d-flex flex-row " id="proofRow"></div>' +
	//	'<div id="additionalIdProofAttachmentRow">' +
	//	'<div class="row idProofRow">' +
	//
	//	'		<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 pt-3">' +
	//	'			<div class="form-group custom-form-group"> <select class="form-select custom-select custom-input" data-width="100%" data-live-search="true" title="Select Petitioner Type"  name="idProofVOs[0].idProofType" id="proofTypeId0">' +
	//	' <option value="0">--Select Id Proof Type--</option>' +
	//	'                                    <option value="P">Pan card</option>' +
	//	'                                    <option value="A">Adhaar</option>' +
	//	'                                    <option value="V">Voter Id</option>' +
	//	'                                    <option value="L">Licence</option>' +
	//	' </select> <label for="petitionertype">Id Proof Type</label> </div>' +
	//	'		</div>' +
	//
	//
	//	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	//	'			<div class="form-group custom-form-group"> <input type="file" class="form-control custom-input" id="myfile0" placeholder="" name="idProofVOs[0].attachmentFile" accept=".pdf, .png, .jpg, .jpeg">' +
	//	'				 <label for="attachment"></label><p class="fs-10 text">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p></div>' +
	//	'		</div>' +
	//
	//	'    <div class="col-sm-12 col-md-3 col-lg-3 col-xl-1 pt-3">' +
	//	'              <div class="form-group">' +
	//	'                     <a href="javascript:void(0);"  onclick="removeIdProofRow(this,\'Count\');" style="display: inline-block; text-align: right">      ' +
	//	'                        <font style="font-size: 25px; color: red; ">' +
	//	'                          <i class="fa fa-minus-square" aria-hidden="true"></i>' +
	//	'                           </font></a>' +
	//	'                            <a id="idProofButton0" href="javascript:void(0);" onclick="javascript:addIdProofNewRow(this)" style="display: inline-block; text-align: right">      ' +
	//	'                            <font style="font-size: 25px; color: rgb(78, 154, 6); ">' +
	//	'                             <i class="fa fa-plus-square " aria-hidden="true"></i>' +
	//	'                            </font></a>' +
	//	'                 </div>' +
	//	'            </div>' +
	//	'       </div>' +
	//	'</div>' +
	// '<div class="col-auto d-flex flex-row" id="proofRow"></div>' +
	//    '<div id="additionalIdProofAttachmentRow">' +
	//        '<div class="row idProofRow">' +
	//           '<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 pt-3">' +
	//                '<div class="form-group custom-form-group">' +
	//                    '<select class="form-select custom-select custom-input proofTypeDropdown" data-width="100%" data-live-search="true" title="Select Petitioner Type" name="idProofVOs[0].idProofType" id="proofTypeId0" onchange="updateDropdowns()">' +
	//                        '<option value="0">--Select Id Proof Type--</option>' +
	//                        '<option value="P">Pan card</option>' +
	//                        '<option value="A">Aadhaar</option>' +
	//                        '<option value="V">Voter Id</option>' +
	//                        '<option value="L">Licence</option>' +
	//                    '</select>' +
	//                   ' <label for="petitionertype">Id Proof Type</label>' +
	//                '</div>' +
	//            '</div>' +
	//
	//           ' <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	//                '<div class="form-group custom-form-group">' +
	//                    '<input type="file" class="form-control custom-input" id="myfile0" placeholder="" name="idProofVOs[0].attachmentFile" accept=".pdf, .png, .jpg, .jpeg">' +
	//                    '<label for="attachment"></label>' +
	//                    '<p class="fs-10 text">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p>' +
	//               ' </div>' +
	//            '</div>' +
	//
	//            '<div class="col-sm-12 col-md-3 col-lg-3 col-xl-1 pt-3">' +
	//                '<div class="form-group">' +
	//                    '<a class="mx-1" href="javascript:void(0);" onclick="removeIdProofRow(this,\'0\');" style="display: inline-block; text-align: right">' +
	//                        '<font style="font-size: 25px; color: red;">' +
	//                           ' <i class="fa fa-minus-square" aria-hidden="true"></i>' +
	//                        '</font>' +
	//                    '</a>' +
	//                    '<a id="idProofButton0" href="javascript:void(0);" onclick="addIdProofNewRow(this)" style="display: inline-block; text-align: right">' +
	//                        '<font style="font-size: 25px; color: rgb(78, 154, 6);">' +
	//                           ' <i class="fa fa-plus-square" aria-hidden="true"></i>' +
	//                        '</font>' +
	//                    '</a>' +
	//                '</div>' +
	//            '</div>' +
	//       ' </div>' +
	//    '</div>' +

	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
	'			<div class="page-header page-header-compact page-header-light text-primary  mb-1">' +
	'				<h6><span style="color: #01458E;">Grievance Supporting Documents</span><h6></div> <p class="mb-0" style="font-size: 13px;""> attach relevant files, such as images, documents, or other media, to provide additional information or evidence related to their grievance.(Max Size : 2mb)</p>' +
	'		</div>' +

	'<div class="col-auto d-flex flex-row " id="attachmentRow"></div>' +
	'<div id="additionalAttachmentRow">' +
	'<div class="row jnDetailRow">' +
	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	'		<div class="form-group custom-form-group"> <input class="form-control custom-input" id="attachmentSubject0" placeholder="" name="grievanceAttachmentsVOs[0].subject" >' +
	' 				<label for="remark">Attachment Subject</label> </div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	'			<div class="form-group custom-form-group"> <input type="file" class="form-control custom-input" id="myfile0" placeholder="" name="grievanceAttachmentsVOs[0].attachmentFile" accept=".pdf, .png, .jpg, .jpeg" onchange="validateFile(this)" >' +
	'				 <label for="remark"></label><p class="fs-10 text">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p></div>' +
	'		</div>' +
	'    <div class="col-sm-12 col-md-3 col-lg-3 col-xl-1 pt-3">' +
	'              <div class="form-group">' +
	'                     <a href="javascript:void(0);"  onclick="removeParameterRow(this,\'Count\');" style="display: inline-block; text-align: right">      ' +
	'                        <font style="font-size: 25px; color: red; ">' +
	'                          <i class="fa fa-minus-square" aria-hidden="true"></i>' +
	'                           </font></a>' +
	'                            <a id="addButton0" href="javascript:void(0);" onclick="javascript:addParameterNewRow(this)" style="display: inline-block; text-align: right">      ' +
	'                            <font style="font-size: 25px; color: rgb(78, 154, 6); ">' +
	'                             <i class="fa fa-plus-square " aria-hidden="true"></i>' +
	'                            </font></a>' +
	'                 </div>' +
	'            </div>' +
	//	'       <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 " id="jnValueInputRow0">' +
	'       </div>' +
	'</div>' +

	//	'<div>' +
	////	'attachments' +
	//	'</div>' +



	'	<div class="row pt-2">' +
	'		<div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 text-left pb-0" id="fieldErrors">' +
	'		</div>' +
	'		<div id="buttonSpace" class="col-xl-4 col-lg-4 col-md-6 col-sm-12  pr-3">' +

	'		</div>' +
	'	</div>' +
	'</form>' +
	'';

//const idproofTemplate = '' +
//    '<div class="row pt-1">' +
//    '   <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 pt-3">' +
//    '       <div class="form-group custom-form-group">' +
//    '           <select class="form-select custom-select custom-input proofTypeDropdown" data-width="100%" data-live-search="true" title="Select Petitioner Type" name="idProofVOs[Count].idProofType" id="proofTypeIdCount" onchange="updateDropdowns()">' +
//    '               <option value="0">--Select Id Proof Type--</option>' +
//    '               <option value="P">Pan card</option>' +
//    '               <option value="A">Aadhaar</option>' +
//    '               <option value="V">Voter Id</option>' +
//    '               <option value="L">Licence</option>' +
//    '           </select>' +
//    '           <label for="petitionertype">Id Proof Type</label>' +
//    '       </div>' +
//    '   </div>' +
//    '   <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 pt-3">' +
//    '       <div class="form-group custom-form-group">' +
//    '           <input type="file" class="form-control custom-input" id="myfileCount" placeholder="" name="idProofVOs[Count].attachmentFile" accept=".pdf, .png, .jpg, .jpeg">' +
//    '           <label for="attachment"></label><p class="fs-10 text">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p>' +
//    '       </div>' +
//    '   </div>' +
//    '   <div class="col-sm-12 col-md-3 col-lg-3 col-xl-1 pt-3">' +
//    '       <div class="form-group">' +
//    '           <a href="javascript:void(0);" onclick="removeIdProofRow(this);" style="display: inline-block; text-align: right">' +
//    '               <font style="font-size: 25px; color: red;">' +
//    '                   <i class="fa fa-minus-square" aria-hidden="true"></i>' +
//    '               </font>' +
//    '           </a>' +
//    '           <a id="idProofButtonCount" href="javascript:void(0);" onclick="addIdProofNewRow(this)" style="display: inline-block; text-align: right">' +
//    '               <font style="font-size: 25px; color: rgb(78, 154, 6);">' +
//    '                   <i class="fa fa-plus-square" aria-hidden="true"></i>' +
//    '               </font>' +
//    '           </a>' +
//    '       </div>' +
//    '   </div>' +
//    '</div>';



const jnParameterCont = '' +
	'		<div class="row pt-1">' +
	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	'		<div class="form-group custom-form-group"> <input class="form-control custom-input" id="attachmentSubjectCount" placeholder="" name="grievanceAttachmentsVOs[Count].subject" >' +
	' 				<label for="remark">Attachment Subject</label> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 pt-3">' +
	'			<div class="form-group custom-form-group"> <input type="file" class="form-control custom-input" id="myfileCount" placeholder="" name="grievanceAttachmentsVOs[Count].attachmentFile" accept=".pdf, .png, .jpg, .jpeg" onchange="validateFile(this)">' +
	'				 <label for="Attachment file"></label><p class="fs-10 text">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p></div>' +
	'		</div>' +
	'    <div class="col-sm-2 col-md-2 col-lg-1 col-xl-1 pe-0 pt-4">' +
	'       <div class="form-group">' +
	'          <a href="javascript:void(0);" onclick="removeParameterRow(this,\'Count\');" style="display: inline-block; text-align: right">      ' +
	'            <font style="font-size: 25px; color: red; ">' +
	'              <i class="fa fa-minus-square" aria-hidden="true"></i>' +
	'             </font></a>' +
	'             <a id="addButtonCount" href="javascript:void(0);" onclick="javascript:addParameterNewRow(this)" style="display: inline-block; text-align: right">      ' +
	'              <font style="font-size: 25px; color: rgb(78, 154, 6); ">' +
	'              <i class="fa fa-plus-square " aria-hidden="true"></i>' +
	'                </font></a>' +
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
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentEmailIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentEmail" onchange="checkEmail(this.id)">' +
	' <label for="place">Email Id</label> </div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentPhoneNoIdcounter2" placeholder="" oninput="validateContactNumber(this)" name="grievanceRequest.respondentsList[counter2].respondentMobileNo">' +
	' <label for="place">Contact Number</label> </div>' +
	'		</div>' +
	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input h-42px " id="respondentPermanentAddressIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentPermanentAddress" ></textarea>' +
	' <label for="place">Permanent Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input h-42px " id="respondentCommunicationAddressIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentCommunicationAddress" ></textarea>' +
	' <label for="place">Communication Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +

	'</div>' +
	'    <div class="col-12 text-end addRemoveRespondentRow mt-2">' +
	'        <font style="font-size: 25px; color: rgb(78, 154, 6); "><i class="fa fa-plus-square" id="addRespondentButtoncounter2" ' +
	'           title="Add more respondent details" ' +
	'           onclick="addMoreRespondent(this)"></i></font>' +
	'        <font style="font-size: 25px; color: red; "><i class="fa fa-minus-square" id="removeRespondentButtoncounter2" ' +
	'           title="Remove this respondent" ' +
	'           onclick="removeRespondent(this)"></i></font>' +
	'    </div>' +
	'</div>' +
	'</div>';



const updateButtonTemplete =
	'<button type="button" id="updateButton" class="btn btn-md btn-primary float-end mx-2">Update</button><button type="button" id="clearButton" class="btn btn-md btn-outline-secondary float-end">Clear</button> ';

const saveButtonTemplete =
	'<button type="button" id="saveButton" class="btn btn-md btn-primary float-end mx-2">Save</button><button type="button" id="clearButton" class="btn btn-md btn-outline-secondary float-end">Clear</button>';

const deleteButtonTemplete =
	'<button type="button" id="deleteButton" class="btn btn-md btn-danger float-end mx-2">Delete</button><button type="button" id="clearButton" class="btn btn-md btn-outline-secondary float-end">Clear</button>';


