var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');

window.addEventListener('DOMContentLoaded', event => {
	loadSettlement();

});

function validateSettlementForm() {
	if ($('#disposeId').val() == null || $('#disposeId').val() == "0" || $('#disposeId').val() == "") {
		alert("Please Enter Dispose remark");
		document.getElementById('disposeId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('disposeId').style.borderColor = "lightgray";
	}
	return true;
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
const grievanceSettlementUrl = 'grievanceRequestSettlement';

function closeconfirmationModal() {
			$("#confirmationModal").modal("hide");
		}

$(document).on("click", "#saveButton", function() {
	if (validateSettlementForm()) {
		$('#confirmationModal').modal('show');
	}
});



$(document).on("click", "#confirmYesButton", function() {
	$('#confirmationModal').modal('hide');
	var formData = new FormData($("#settlemetFormId")[0]);
	if (validateSettlementForm()) {
		$.ajax({
			url: grievanceSettlementUrl,
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
				$("#saveNoteButton").removeAttr("disabled");
				if (result.resultObject.attachmentStatus == 'N') {
						alert("Attachment file is not saved.")
					}
				if (result.result == 'Y') {
					//					addTemplate.hide();
					$('#settlemetFormId').hide();
					$('#successDiv').show();
					$('#collapseAddHCard').hide();
					setTimeout(function() {
						                window.top.location.href = "/grievance/grievance/gotoAllSettledRequestsLists";
					}, 2000);
					//					displaySuccessToastNew('sucessToastNDisplay', "Successfully Saved");
					//					$('#noteIdEnc').val(result.resultObject.idEnc)
					//					notesDisplay();
					//					templateNoteLoad();
					//					getNotesAttachments(result.resultObject.idEnc);
					//					populateMonthlyDeductionValue(result.resultObject.monthlyClaimDeductionVOs)
				} else {
					displayFieldErrors(result)
				}
			}
		});
	}
});

function loadSettlement(id, buttonType, actionName) {
	let inputTakerSettlement = document.body.querySelector('#inputTaker');
	if ((id == '' || id == 0 || id == null)) {
		$.when(inputTakerSettlement.innerHTML = addTemplate).then
		$('#grievanceId').val(grievanceRequestVO.id)

		$('#buttonSpaceN').html(saveButtonTemplete)

	}
	else {
		//no conditions as of now
	}
}

const saveButtonTemplete =
	'<button type="button" id="saveButton" class="btn btn-md btn-primary float-end ms-2">Settle</button><button type="reset" id="clearButton" class="btn btn-md btn-outline-secondary float-end">Clear</button>';


const addTemplate = '' +
	'<form id="settlemetFormId" enctype="multipart/form-data">' +
	'			<input type="hidden" id="grievanceId" name="id">' +
	'<div class="row ">' +
	
	 '<div class="col-sm-12 col-md-12 col-lg-10 col-xl-12 pt-3">' +
	'		<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="disposeId" placeholder="" name="settlementDescription" rows="5"></textarea>' +
	' 				<label for="Dispose">Dispose Remark<font color="red">*</font></label> </div>' +
	'		</div>' +


	'<div class="col-auto d-flex flex-row " id="attachmentRow"></div>' +
	'<div id="additionalAttachmentRow">' +
	'<div class="row jnDetailRow">' +
	'		<div class="col-sm-5 col-md-6 col-lg-5 col-xl-5 pt-3">' +
	'		<div class="form-group custom-form-group"> <input class="form-control custom-input" id="attachmentSubject0" placeholder="" name="grievanceAttachmentsVOs[0].subject" >' +
	' 				<label for="remark">Attachment Subject</label> </div>' +
	'		</div>' +


	'		<div class="col-sm-5 col-md-6 col-lg-5 col-xl-5 pt-3">' +
	'			<div class="form-group custom-form-group"> <input type="file" class="form-control custom-input" id="myfile0" placeholder="" name="grievanceAttachmentsVOs[0].attachmentFile" accept=".pdf, .png, .jpg, .jpeg" onchange="validateFile(this)" >' +
	'				 <label for="remark"></label><p class="text" style="font-size: 0.705rem;">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size : 2mb)</p></div>' +
	'		</div>' +
	'    <div class="col-sm-2 col-md-3 col-lg-2 col-xl-1 pt-4">' +
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


	'	</div>' +
	'	<div class="row pt-2">' +
//	'       <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left pb-0" id="fieldErrors">' +
//	'		</div>' +
//	'		<div class="col-xl-6 col-lg-3 col-md-6 col-sm-12 text-left pb-0" id="sucessToastNDisplay">' +
//	'		</div>' +
	'		<div class="col-xl-12 col-lg-3 col-md-12 col-sm-12  pr-3" id="buttonSpaceN">' +
	'		</div>' +
	'	</div>' +
	'</form>' +
	'';

const jnParameterCont = '' +
	'		<div class="row pt-1">' +
	'		<div class="col-sm-5 col-md-6 col-lg-5 col-xl-5 pt-3">' +
	'		<div class="form-group custom-form-group"> <input class="form-control custom-input" id="attachmentSubjectCount" placeholder="" name="grievanceAttachmentsVOs[Count].subject" >' +
	' 				<label for="remark">Attachment Subject</label> </div>' +
	'		</div>' +

	'		<div class="col-sm-5 col-md-6 col-lg-5 col-xl-5 pt-3">' +
	'			<div class="form-group custom-form-group"> <input type="file" class="form-control custom-input" id="myfileCount" placeholder="" name="grievanceAttachmentsVOs[Count].attachmentFile" accept=".pdf, .png, .jpg, .jpeg" onchange="validateFile(this)">' +
	'				 <label for="Attachment file"></label><p class="fs-8 text" style="color: black; font-size: 10px;">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size: 2mb)</p></div>' +
	'		</div>' +
	'    <div class="col-sm-2 col-md-3 col-lg-2 col-xl-1 pt-4">' +
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








