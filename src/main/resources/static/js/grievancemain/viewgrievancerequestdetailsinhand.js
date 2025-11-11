var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');

function validateForm() {
	if ($('#remarkId').val() == null || $('#remarkId').val() == "0" || $('#remarkId').val() == "") {
		alert("Please Enter Remarks");
		document.getElementById('remarkId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('remarkId').style.borderColor = "lightgray";
	}
	return true;
}
function validateForm2() {
	if ($('#verificationremarkId').val() == null || $('#verificationremarkId').val() == "0" || $('#verificationremarkId').val() == "") {
		alert("Please Enter Remarks");
		document.getElementById('verificationremarkId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('verificationremarkId').style.borderColor = "lightgray";
	}

	return true;
}
function clearForm() {
	document.getElementById('remarkId').value = '';
}
function clearForm2() {
	document.getElementById('verificationremarkId').value = '';
}
const forwardButton = '<div class="row" id="forwardButton">' +
	'<div class="col-12 float-end text-end mt-2">' +
	'<button type="button" class="btn btn-md btn-primary float-end mx-2" onclick="grievanceApproval(\'FD\')">Forward</button>' +
	'<button type="button" id="clearButton" style="width: 70px;" class="btn btn-md btn-outline-secondary float-end" onclick="clearForm()">Clear</button>' +
	'</div>' +
	'</div>';

const verifyForwardButton = '<div class="row" id="verifyForwardButton">' +
	'<div class="col-12 float-end text-end mt-2">' +
	'<button type="button" class="btn btn-md btn-primary float-end mx-2" onclick="verifiedGrievance(\'VF\')">Verify&Forward</button>' +
	'<button type="button" id="clearButton" style="width: 70px;" class="btn btn-md btn-outline-secondary float-end" onclick="clearForm2()">Clear</button>' +
	'</div>' +
	'</div>';

function verificationAndApprove(modalXL, param, idEcm) {
	$('#modalXLLabel').html("Forward");
	$.get('gotoforwardGrievanceApplicationDetails?idEcm=' + idEcm, function(result) {
		$('#modalXLBody').html(result)
	});
	//	$('#modalXLBody').html(formHtml);
	//	$('#grievanceIdEnc').val(idEcm);
	$('#modalXLFooter').html(forwardButton);
	$('#' + modalXL).modal('show');
}
function grievanceForwardedtoSettlement(modalXL, param, idEcm) {
	$('#modalXLLabel').html("Verify&Forward");
	$.get('gotoVerifyforwardGrievanceApplicationDetails?idEcm=' + idEcm, function(result) {
		$('#modalXLBody').html(result)
	});
	//	$('#modalXLBody').html(verifyformHtml);
	//	$('#grievanceIdEnc').val(idEcm);
	$('#modalXLFooter').html(verifyForwardButton);
	$('#' + modalXL).modal('show');
	//				'src',
	//				'/grievance/grievance/gotoGrievanceForwardedtoSettlement?id=' + id,
}


function grievanceApproval(param) {
	if (param == 'FD') {
		check = false;
		if ($('input:radio').filter(':checked').length == 0) {
			alert("Please select atleast one user")
		} else if (validateForm()) {
			var formData = new FormData($("#forwardFormId")[0]);
			if (confirm("Do you want to forward the grievance?")) {
				$.ajax({
					data: formData,
					async: false,
					cache: false,
					processData: false,
					contentType: false,
					type: 'POST',
					url: 'grievanceRequestApprovalSubmission',
					//data: $('#newEstimationForm1').serialize(),
					success: function(result) {
						if(result.result=="Y"){
							debugger
						$('#forwardButton').html('');
						loadSuccess('modalXLBody', 'Successfully Forwarded');
						}
						//							window.location.reload();
					}
				});
			}
		}
	}
	else
		return false;
}

function verifiedGrievance(param) {
	if (param == 'VF') {
		check = false;
		if ($('input:radio').filter(':checked').length == 0) {
			alert("Please select atleast one user")
		} else if (validateForm2()) {
			var formData = new FormData($("#verifyFormId")[0]);
			if (confirm("Do you want to verify&forward the grievance request?")) {
				$.ajax({
					data: formData,
					async: false,
					cache: false,
					processData: false,
					contentType: false,
					type: 'POST',
					url: 'grievanceRequestSubmissionForSettlement',
					success: function(result) {
						if(result.result=="Y"){
						$('#verifyForwardButton').html('');
						loadSuccess('modalXLBody', 'Verify&Forwarded Successfully');
						}
					}
				});
			}
		}
	}
	else
		return false;
}
//const formHtml = '<form id="newEstimationForm1">' +
//	'<div class="mx-4">' +
//	'<div class="row">' +
//	'<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-3">' +
//	'<input type="hidden" id="grievanceIdEnc" name="id">' +
//	'<div class="form-group custom-form-group">' +
//	'<textarea class="form-control custom-input custom-textarea-height" placeholder="" id="remarkId" name="forwardRemark" required></textarea>' +
//	'<label>Remarks<font color="red">*</font></label>' +
//	'</div>' +
//	'</div>' +
//	'</div>' +
//	'</div>' +
//	'</form>';
//
//const verifyformHtml = '<form id="newEstimationForm1">' +
//	'<div class="mx-4">' +
//	'<div class="row">' +
//	'<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-3">' +
//	'<input type="hidden" id="grievanceIdEnc" name="id">' +
//	'<div class="form-group custom-form-group">' +
//	'<textarea class="form-control custom-input custom-textarea-height" placeholder="" id="verificationremarkId" name="verificationRemark" required></textarea>' +
//	'<label>Remarks<font color="red">*</font></label>' +
//	'</div>' +
//	'</div>' +
//	'</div>' +
//	'</div>' +
//	'</form>';
