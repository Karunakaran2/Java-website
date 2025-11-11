var identificationClickEvent = false;

var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');


window.addEventListener('DOMContentLoaded', event => {
	identificationClickEvent = false;
	
});

function viewRequestForm(modalXL, param) {
	$.ajax({
		type: 'GET',
		url: "public/typeSetuplist",
		data: '',
		success: function(result) {
			$('#modalXLLabel').html("Public Grievance | SEEPZ SEZ");
			let categoryDisplay = formHtml;
			let categoryOptions = getcategoryListOptions(result.resultObject.categorySetupVOs);
			categoryDisplay = categoryDisplay.replace('categoryOptions', categoryOptions);

			let grievanceTypeOptions = getgrievanceTypeListOptions(result.resultObject.grievanceTypeVOs);
			categoryDisplay = categoryDisplay.replace('grievanceTypeOptions', grievanceTypeOptions)

			$('#modalXLBody').html(categoryDisplay);
			$('#modalXLFooter').html(forwardButton);
			$('#' + modalXL).modal('show');
			 $('#' + modalXL).on('shown.bs.modal', function (e) {
                // Call your getDivShow function here
                getDivShow();
            });
		}

	});
}
//2.//
function grievanceSubmission() {													
	$('#roomRequest').modal({
		backdrop: 'static',
		keyboard: false
	})
	$.ajax({
		type: 'GET',
		url: "public/gotoPublicGrievanceRequest",
		data: '',
		success: function(msg) {
			$('#roomRequestBody').html(msg);
		}
	});
	$('#roomRequest').modal('show');
}

function publicgrievance(param) {
	$(document).ready(function() {
		if (validateForm()) {
			var formData = new FormData($("#newForm")[0]);
			$('#confirmationModal').modal('show');
			$('#confirmationModal').addClass('fade-background');
			$('#confirmYesButton').click(function() {
				$('#confirmationModal').modal('hide');
				//				$('#loadingSpinnerModal').addClass('fade-background');
				//				$('#loadingSpinnerModal').modal('show');
				$('#confirmYesButton').prop('disabled', true);
				$.ajax({
					type: 'POST',
					data: formData,
					async: false,
					cache: false,
					processData: false,
					contentType: false,
					url: '/grievance/public/submitPublicGrievanceRequest',
					beforeSend: function() {
						//						$('#loadingSpinnerModal').modal('show');
						$('#confirmYesButton').prop('disabled', true);
					},
					success: function(result) {
						//						$('#loadingSpinnerModal').modal('hide');
						$('#forwardButton').html('');
						$('#successModal').modal('show');
						$('#successModal').addClass('fade-background');
						$('#fileNoIdModal').html(result.resultObject.applicationNo);
					},
				});
			});
		}
	});
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
        if (document.getElementById('inlineRadio1').checked) {
            $('#phoneNoId').hide();
            $('#titleId').hide();
            $('#emailId').hide();
            $('#addressId').hide();
            $('#nameOfGrievantId').hide();
            $('#requestTypeId').val("A");
        } else {
            $('#titleId').show();
            $('#phoneNoId').show();
            $('#emailId').show();
            $('#addressId').show();
            $('#nameOfGrievantId').show();
            $('#requestTypeId').val("P");
        }
    }
    
const forwardButton = '<div class="row" id="forwardButton">' +
	'<div class="col-12 float-end text-end mt-2">' +
	'<button type="button" class="btn btn-md btn-primary float-end mx-2" onclick="publicgrievance(\'FD\')">Submit</button>' +
	'<button type="reset" id="clearButton" style="width: 70px;" class="btn btn-md btn-outline-secondary float-end">Clear</button>' +
	'</div>' +
	'</div>';
const formHtml = '' +
	'<form id="newForm" enctype="multipart/form-data">' +
	'<div class="card-header">' +
	'<div class="row">' +
	 '<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">'+
       ' <div class="page-header page-header-compact page-header-light text-primary">'+
            '<h6><span style="color: #01458E;">Would you like to keep your identity anonymous? &emsp;</span></h6>'+
            '<div class="form-check form-check-inline">'+
                '<input class="form-check-input mt-2" type="radio" name="grievanceRequest.inlineRadioOptions" id="inlineRadio1" onchange="getDivShow()" value="option1" checked> '+
                '<label class="form-check-label py-2" for="inlineRadio1">Yes</label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
                '<input class="form-check-input mt-2" type="radio" name="grievanceRequest.inlineRadioOptions" id="inlineRadio2" onchange="getDivShow()" value="option2">'+
                '<label class="form-check-label py-2" for="inlineRadio2">No</label>'+
            '</div>'+
        '</div>'+
    '</div>'+



	'<input type="hidden" name="grievanceRequest.requestType" id="requestTypeId">' +
	'<div class="row">' +
	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 pt-2">' +
	'			<input type="hidden" id="requestId" name="grievanceRequest.id">' +
	'			<input type="hidden" id="applicationNumberId" name="grievanceRequest.applicationNo">' +
	'			<input type="hidden" id="applicationNumberAutoId" name="grievanceRequest.applicationNoAuto">' +
	'			<div class="form-group custom-form-group"> <select class="form-select custom-select custom-input" data-width="100%" data-live-search="true" title="Select Category"  name="grievanceRequest.category.id" id="categoryId">' +
	' <option value="0">--Select Category--</option>categoryOptions </select> <label for="category">Category <font color="red">*</font></label> </div>' +

	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 pt-2">' +
	'			<div class="form-group custom-form-group"> <select class="form-select custom-select custom-input" data-width="100%" data-live-search="true" title="Select Type"  name="grievanceRequest.grievanceType.id" id="typeId">' +
	' <option value="0">--Select Type--</option>grievanceTypeOptions </select> <label for="Type">Type <font color="red">*</font></label> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-2">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="complaintId" placeholder="" name="grievanceRequest.complaint">' +
	' <label for="place">Subject<font color="red">*</font></label> </div>' +
	'		</div>' +
	'		</div>' +

	'<div class="row">' +

	'<div class="col-sm-12 col-md-6 col-lg-2 col-xl-2 pt-2" id="titleId">' +
	'    <div class="form-group custom-form-group">' +
	'        <select class="form-select custom-select custom-input" id="TitleId" name="titleName">' +
	'            <option value="Mr.">Mr.</option>' +
	'            <option value="Mrs.">Mrs.</option>' +
	'            <option value="Ms.">Ms.</option>' +
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
	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-4 pt-2" id="phoneNoId">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="phoneNoId" placeholder="" name="grievanceRequest.mobileNo" oninput="validateContactNumber(this)" maxlength="10">' +
	' <label for="place">Contact Number<font color="red">*</font></label> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-8 pt-2 " id="addressId">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="addressId" placeholder="" name="grievanceRequest.address" style="height: 12px;"></textarea>' +
	' <label for="purpose">Address of Grievant</label> </div>' +
	'		</div>' +
	'		</div>' +

	'<div class="row">' +
	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 pt-2">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="placeId" placeholder="" name="grievanceRequest.place">' +
	' <label for="place">Place of incident leading to Grievance</label> </div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-2 col-xl-2 pt-2">' +
	'			<div class="form-group custom-form-group"> <input type="date" class="form-control custom-input" id="dateOfEventId" placeholder="" name="grievanceRequest.dateOfEventStr">' +
	' <label for="doa">Date of Incident</label> </div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-2 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="grievanceDescriptionId" placeholder="" name="grievanceRequest.grievanceDescription" style="height: 12px;"></textarea>' +
	' <label for="purpose">Detailed Description of Grievance</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-1 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="solutionDescriptionId" placeholder="" name="grievanceRequest.solutionDescription" style="height: 12px;"></textarea>' +
	' <label for="purpose">Desired Resolution/ Suggestions</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +





	'<div class="row">' +
	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
	'			<div class="page-header page-header-compact page-header-light text-primary  mb-1">' +
	'				<h6><span style="color: #01458E;">Respondents Details</span><h6></div> <p class="fst-italic" style="font-size: 13px;"> (refer to the identifying information of the individual, organization, or party being accused or addressed in response to the submitted complaint or concern)</p>' +
	'		</div>' +
	'<div id="respondentRowId" class="p-2">' +
	'<div class="row respondentRow">' +

	'			<input type="hidden" id="respondentHidId0" name="grievanceRequest.respondentsList[0].id">' +
	'			<input type="hidden" id="respondentHidIdEnc0" name="grievanceRequest.respondentsList[0].idEnc">' +

	'<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 pt-2">' +
	'    <div class="form-group custom-form-group">' +
	'        <select class="form-select custom-select custom-input" id="TitleIdRespondent" name="grievanceRequest.respondentsList[0].titleNameRespondent">' +
	'            <option value="Mr.">Mr.</option>' +
	'            <option value="Mrs.">Mrs.</option>' +
	'            <option value="Ms.">Ms.</option>' +
	'        </select>' +
	'        <label for="Title">Title&nbsp;<font color="red">*</font></label>' +
	'    </div>' +
	'</div>' +


	'		<div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-2">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentNameId" placeholder="" name="grievanceRequest.respondentsList[0].respondentName">' +
	' <label for="place">Name</label> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-2">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentEmailId" placeholder="" name="grievanceRequest.respondentsList[0].respondentEmail" onchange="checkEmailres(this.id)">' +
	' <label for="place">Email Id</label> </div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-2">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" maxlength="10" id="respondentPhoneNoId" placeholder="" oninput="validateContactNumber(this)" name="grievanceRequest.respondentsList[0].respondentMobileNo">' +
	' <label for="place">Contact Number </label> </div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-2 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="respondentPermanentAddressId" placeholder="" name="grievanceRequest.respondentsList[0].respondentPermanentAddress" style="height: 12px;"></textarea>' +
	' <label for="place">Permanent Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-2 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="respondentCommunicationAddressId" placeholder="" name="grievanceRequest.respondentsList[0].respondentCommunicationAddress" style="height: 12px;"></textarea>' +
	' <label for="place">Communication Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +


	'<div class="col-12 text-end addRespondentRow mt-2">' +
	'<i class="fa fa-plus-circle fs-4" id="addRespondentButton0"' +
	'title="Add more respondent details"' +
	'onclick="addMoreRespondent(this)"></i>' +
	'</div>' +
	'</div>' +
	'</div>' +



	'	</div>' +


	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">' +
	'			<div class="page-header page-header-compact page-header-light text-primary  mb-1">' +
	'				<h6><span style="color: #01458E;">Grievance Supporting Documents</span><h6></div> <p class="fst-italic" style="font-size: 13px;""> attach relevant files, such as images, documents, or other media, to provide additional information or evidence related to their grievance.(Max Size : 2mb)</p>' +
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
	'    <div class="col-sm-12 col-md-3 col-lg-3 col-xl-1 pt-2">' +
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

	'<div>' +
	//	'attachments' +
	'</div>' +






	'</div>' +
	'</form>';

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
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentEmailIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentEmail" onchange="checkEmailres(this.id)">' +
	' <label for="place">Email Id</label> </div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 pt-3">' +
	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="respondentPhoneNoIdcounter2" placeholder="" oninput="validateContactNumber(this)" name="grievanceRequest.respondentsList[counter2].respondentMobileNo">' +
	' <label for="place">Contact Number</label> </div>' +
	'		</div>' +
	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="respondentPermanentAddressIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentPermanentAddress" style="height: 12px;"></textarea>' +
	' <label for="place">Permanent Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3 ">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="respondentCommunicationAddressIdcounter2" placeholder="" name="grievanceRequest.respondentsList[counter2].respondentCommunicationAddress" style="height: 12px;"></textarea>' +
	' <label for="place">Communication Address</label><p class="fs-10 text">(Max. 2000 character allowed) </p> </div>' +
	'		</div>' +

	'</div>' +
	'    <div class="col-12 text-end addRemoveRespondentRow mt-2">' +
	'        <i class="fa fa-plus-circle fs-4" id="addRespondentButtoncounter2" ' +
	'           title="Add more respondent details" ' +
	'           onclick="addMoreRespondent(this)"></i>' +
	'        <i class="fa fa-minus-circle fs-4" id="removeRespondentButtoncounter2" ' +
	'           title="Remove this respondent" ' +
	'           onclick="removeRespondent(this)"></i>' +
	'    </div>' +
	'</div>' +
	'</div>';

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

function trackApplication() {
	$('#trackApplication').modal({
		backdrop: 'static',
		keyboard: false
	})
	$.ajax({
		type: 'GET',
		url: "public/trackApplicationDetails",
		data: '',
		success: function(msg) {
			$('#trackApplicationBdy').html(msg);
		}
	});
	$('#trackApplication').modal('show');
}

window.history.forward();
$('#radioBtn a').on(
	'click',
	function() {
		var sel = $(this).data('title');
		var tog = $(this).data('toggle');
		$('#' + tog).prop('value', sel);

		$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]')
			.removeClass('active').addClass('notActive');
		$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]')
			.removeClass('notActive').addClass('active');
	});

function closeJS() { window.parent.document.location.reload(); }

$(document).on('load', 'body', function(event) {
	noBack();
});

$(document).on('pageshow', 'body', function(event) {
	if (event.persisted)
		noBack();
});



function initializeIdentificationAddBtn() {
	if (!identificationClickEvent) {
		const addIdentificationToggle = document.body.querySelector('#addIdentificationToggle');
		const addButtonIdentificationArrow = document.body.querySelector('#addbuttonIdentification-arrow');
		const collapseAddIdentificationHCard = document.body.querySelector('#collapseAddIdentificationHCard');
		var toggleIdentificationItem = 'sb|addIdentification-toggle';
		addIdentificationToggle.addEventListener('click', event => {
			addButtonIdentificationArrow.classList.toggle('rotate45');
			localStorage.setItem(toggleIdentificationItem, addButtonIdentificationArrow.classList.contains('rotate45'));
			if (localStorage.getItem(toggleIdentificationItem) === 'true') {
				collapseAddIdentificationHCard.classList.add("show");
				ajaxLoad('', '', addOrEditUrl)
			} else {
				collapseAddIdentificationHCard.classList.remove("show");
				document.body.querySelector('#inputTaker').innerHTML = ''
			}
		});
		identificationClickEvent = true;
	}
}


$(document)
	.on(
		'click',
		'.reloadCaptcha',
		function(event) {
			$("input[name='captcha']").val("");
			$("#captchaIdentifier").attr(
				"src",
				"rise/captcha/getCaptcha?id="
				+ new Date().getTime());
		});

function noBack() {
	window.history.forward();
}

$(document).ready(
	function() {
		if (null != window.location.hash
			&& window.location.hash == '#department') {
			$('a[data-toggle="domain"][data-title="P"]').removeClass(
				'active').addClass('notActive');
			$('a[data-toggle="domain"][data-title="D"]').removeClass(
				'notActive').addClass('active');
		}
		$('#lm').height(window.innerHeight - 350);
		$('#rt').click(function(e) {

			$.ajax({
				type: 'POST',
				url: "rise/public/resetPwd",
				data: $('#rp').serialize(),
				beforeSend: function() {
					$("#rt").attr('disabled', 'disabled');
				},
				success: function(msg) {
					$('#cp').modal({
						backdrop: 'static',
						keyboard: false
					})
					$('#cpBdy').html(msg);
				}
			});

			e.preventDefault();

			// alert('Thanks');

		});
	});

function fp() {
	$('#lg').slideUp();
	$('#fp').slideDown();
}

function backLg() {
	$('#fp').slideUp();
	$('#lg').slideDown();
}

function openReg() {
	$('#otr').modal({
		backdrop: 'static',
		keyboard: false
	})
	$.ajax({
		type: 'GET',
		url: "public/openOneTimeRegistration?",
		data: '',
		success: function(msg) {
			$('#otrBdy').html(msg);
		}
	});
	$('#otr').modal('show');
}

function closeModal() {
	if (confirm("If you have submitted the form please wait for the OTP which will be arriving shortly as mail and complete the registration. Otherwise entered data will be lost.")) {
		$('#otr').modal('toggle');
	}
}

function validatePIN(pin) {
	return /^(\d{4}|\d{6})$/.test(pin);
}

function loadFile(event, id) {
	var allowedImages = ["jpg", "jpeg", "png"];
	if (id == 'photoImg') {
		var photoext = $('#photo').val().split('.').length;
		if (photoext > 2) {
			alert("Double Extension File not allowed");
			return false;
		} else {
			var ext = $('#photo').val().split('.').pop().toLowerCase();
			if (!allowedImages.includes(ext)) {
				alert('Invalid Image');
				$('#photo').val('');
				return false;
			}
		}
		if (event.target.files[0].size > 200000) {
			alert("Please upload photo less than 200KB");
			$('#photo').focus();
			$('#photo').val('');
			return false;
		}
	}

	if (id == 'signImg') {
		var signext = $('#signature').val().split('.').length;
		if (signext > 2) {
			alert("Double Extension File not allowed");
			return false;
		} else {
			var ext = $('#signature').val().split('.').pop().toLowerCase();
			if (!allowedImages.includes(ext)) {
				alert('Invalid Image');
				$('#signature').val('');
				return false;
			}
		}
		if (event.target.files[0].size > 100000) {
			alert("Please upload signature less than 100KB");
			$('#signature').focus();
			$('#signature').val('');
			return false;
		}
	}

	var output = document.getElementById(id);
	output.src = URL.createObjectURL(event.target.files[0]);
	output.onload = function() {
		URL.revokeObjectURL(output.src);
	}
}

function checkDocument(id) {
	var allowedTypes = ["pdf", "jpg", "jpeg", "png"];

	if (id == 'identityDoc') {
		var idext = $('#identityDocument').val().split('.').length;

		if (idext > 2) {
			alert("Double Extension File not allowed");
			return false;
		} else {
			var ext = $('#identityDocument').val().split('.').pop().toLowerCase();
			if (!allowedTypes.includes(ext)) {
				alert('Invalid Document');
				$('#uploadItem').val("");
				return false;
			}
		}
		if (event.target.files[0].size > 2000000) {
			alert("Please upload file less than 2MB");
			$('#identityDocument').focus();
			$('#identityDocument').val('');
			return false;
		}
	}

	if (id == 'rattach') {
		var rext = $('#rattach').val().split('.').length;
		if (rext > 2) {
			alert("Double Extension File not allowed");
			return false;
		} else {
			var ext = $('#rattach').val().split('.').pop().toLowerCase();
			if (!allowedTypes.includes(ext)) {
				alert('Invalid Image');
				$('#uploadItem').val("");
				return false;
			}
		}

	}

	if (id == 'qattach') {
		var qext = $('#qattach').val().split('.').length;
		if (qext > 2) {
			alert("Double Extension File not allowed");
			return false;
		} else {
			var ext = $('#qattach').val().split('.').pop().toLowerCase();
			if (!allowedTypes.includes(ext)) {
				alert('Invalid Image');
				$('#uploadItem').val("");
				return false;
			}
		}
	}

}

function getState(val) {
	$.ajax({
		type: 'GET',
		url: "public/getState",
		data: 'countryId=' + val,
		success: function(msg) {
			$('#stateContainer').html(msg);
		}
	});

	updateCountry();
}

function updateCountry() {
	country = $('[name="oneTimeregistrationVO.country.id"]').val();
	if (country == 1) {
		$("#containerForIndian").show();
		$("#containerForForeign").hide();
	} else {
		$("#containerForIndian").hide();
		$("#containerForForeign").show();
	}
}

function getDistrict(val) {
	$.ajax({
		type: 'GET',
		url: "public/getDistrict",
		data: 'stateId=' + val,
		success: function(msg) {
			$('#districtContainer').html(msg);
		}
	});
}

function getBlock(val) {
	$.ajax({
		type: 'GET',
		url: "public/getBlock?",
		data: 'districtId=' + val,
		success: function(msg) {
			$('#blockContainer').html(msg);
		}
	});
}

function ValidateEmail(mail) {
	if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
		return true;
	} else {
		return false;
	}
}

function ValidateMobile(txtPhone) {
	var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
	var mobileno = /^((\\+91-?)|0)?[0-9]{10}$/;
	if ((txtPhone.match(phoneno)) || (txtPhone.match(mobileno))) {
		return true;
	} else {
		return false;
	}
}

function ValidatePincode(code) {
	var no = /^((\\+91-?)|0)?[0-9]{6}$/;
	if (code.match(no)) {
		return true;
	} else {
		return false;
	}
}

function addEstablishment() {
	$('#es').modal({
		backdrop: 'static',
		keyboard: false
	})

	$.ajax({
		type: 'GET',
		url: "rise/addEstablishment?",
		data: {
			otrId: $("#id").val()
		},
		success: function(msg) {
			$('#esBdy').html(msg);
		}
	});
}

function saveEst() {

	var formData = new FormData(document.getElementById('estForm'));
	if ($("#dec").is(':checked')) {
		$.ajax({
			type: 'POST',
			url: "rise/common/saveEstablishmentDetails",
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(msg) {
				alert(msg);
				$('#es').modal('toggle');
				$.ajax({
					type: 'GET',
					url: "common/getEstablishmentDetails?",
					data: {
						otrId: $("#mid").val()
					},
					success: function(msg) {
						$('#mainform').html(msg);
						$('#otpform').show();
					}
				});
			}
		});
	} else {
		alert("Please accept declaration");
	}
}

/*function isRegisteredMobileNumber(id) {
	alert()
	if (($('#' + id).val() != "") && ($('#' + id).val() != '0')) {
		$
			.ajax({
				type: 'GET',
				url: "public/checkRegisteredMobileNumber?",
				data: 'mobNumber=' + $('#' + id).val(),
				beforeSend: function() {
					$("#submit").attr("disabled", true);
				},
				success: function(msg) {
					$("#submit").attr("disabled", false);
					if (msg == "Y") {
						alert($('#' + id).val()
							+ " is already registerd.Please register using another number.")
						$('#' + id).val("");
					}
				}
			});
	}
}*/

/*function isRegisteredEmailId(id) {
	if (($('#' + id).val() != "") && ($('#' + id).val() != '0')) {
		$
			.ajax({
				type: 'GET',
				url: "public/checkRegisteredEmailId?",
				data: 'emailId=' + $('#' + id).val(),
				beforeSend: function() {
					$("#submit").attr("disabled", true);
				},
				success: function(msg) {
					$("#submit").attr("disabled", false);
					if (msg == "Y") {
						alert($('#' + id).val()
							+ " is already registerd.Please register using another Email Id.")
						$('#' + id).val("");
					}
				}
			});
	}
}*/

function updateForgotPassword() {
	var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

	var otp = $("#fpForm input[name=oldPass]").val().trim();
	if (otp == "") {
		alert("Please provide OTP");
		return false;
	}

	var newPassword = $("#fpForm input[name=newPass]").val().trim();
	if (newPassword.match(decimal)) {
		var confirmPassword = $("#fpForm input[name=confirmPass]").val().trim();

		if (newPassword != confirmPassword) {
			alert("New Password & Confirm Password doesn't match. Please try again.");
			return false;
		}
	} else {
		alert("Please follow the Password Guidelines.");
		return false;
	}

	$.ajax({
		type: 'POST',
		url: "rise/public/updateForgotPassword",
		data: $('#fpForm').serialize(),
		success: function(msg) {
			alert(msg.returnMessage);
			if (msg.status || msg.reload) {
				window.location.reload();
			}
		}
	});
}

function encryptPassword() {

	var passwd = $("#password").val();
	passwd = Encrypt(passwd);
	$("#password").val(passwd);
}
function Encrypt(plainText) {


	var iv = "00000000000000000000000000000000";
	var salt = "00000000000000000000000000000000";
	var keySize = 128;
	var iterationCount = 10000;
	var passPhrase = "aesalgoisbestbes";
	var aesUtil = new AesUtil(keySize, iterationCount);
	var encrypt = aesUtil.encrypt(salt, iv, passPhrase, plainText);
	return encrypt;
}