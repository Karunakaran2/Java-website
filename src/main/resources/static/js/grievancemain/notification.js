const listingUrl = "/grievance/grievanceListing/notificationListing";
const toggleItem = 'sb|addFunction-toggle'

var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');
const addToggle = document.body.querySelector('#addToggle');
const addButtonArrow = document.body.querySelector('#addbutton-arrow');
const collapseAddHCard = document.body.querySelector('#collapseAddHCard');

$(window).scroll(function() { $(this).scrollTop() > 5 ? $("#addToggle").hide() : $("#addToggle").fadeIn() });

function validateForm() {
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
		$('#emailId').val(grievanceRequestVO.email);
		$('#mobilenoId').val(grievanceRequestVO.mobileNo);
		$('#addressId').val(grievanceRequestVO.address);
		//		For delete		
		$('#buttonSpace').html(saveButtonTemplete);
		//End delete	
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

function viewpublicVerificationLink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewAnonymousGrievanceRequestDetails?idEnc=" + idEnc;
	window.location.href = redirectURL;
}
function viewpublicForwardedLink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewAnonymousGrievanceRequestDetails?idEnc=" + idEnc;
	window.location.href = redirectURL;
}
function viewanonymousverificationLink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewAnonymousGrievanceRequestDetails?idEnc=" + idEnc;
	window.location.href = redirectURL;
}
function viewanonymousforwardedLink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewAnonymousGrievanceRequestDetails?idEnc=" + idEnc;
	window.location.href = redirectURL;
}
function viewunitverificationlink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewUnitGrievanceDetailsInHand?idEnc=" + idEnc;
	window.location.href = redirectURL;
}
function viewunitforwardedlink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewUnitGrievanceDetailsInHand?idEnc=" + idEnc;
	window.location.href = redirectURL;
}


function viewseepzuserverificationlink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewGrievanceRequestDetailsInHand?idEnc=" + idEnc;
	window.location.href = redirectURL;
}

function viewseepzuserforwardedlink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewGrievanceRequestDetailsInHand?idEnc=" + idEnc;
	window.location.href = redirectURL;
}

function viewGrievanceRequestDetails(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewUnitGrievanceDetailsInHand?idEnc=" + idEnc;
	window.location.href = redirectURL;
}

function viewAnonymousGrievanceRequestDetails(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewAnonymousGrievanceRequestDetails?idEnc=" + idEnc;
	window.location.href = redirectURL;
}
function viewGrievanceRequestDetailsOfSeepz(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewGrievanceRequestDetailsInHand?idEnc=" + idEnc;
	window.location.href = redirectURL;
}
function viewUnitUserSettlementLink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewSettledGrievanceRequestDetailsOfUnit?idEnc=" + idEnc;
	window.location.href = redirectURL;
}
function vieSseepzUserSettlementLink(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewSettledGrievanceRequestDetails?idEnc=" + idEnc;
	window.location.href = redirectURL;
}

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
		"data": "0", "className": "text-center ",
		render: function(data, type, row, meta) {
			return meta.row + meta.settings._iDisplayStart + 1;
		}
	},

	{
		"data": "0",
		"render": function(data, type, row) {
			if (row[4] == 'S' && row[6] == 'S') {
				var seepzuserlink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewGrievanceRequestDetailsOfSeepz(' + "'" + row[2] + "'" + ')">Grievance Submitted by SEEPZ Internal</a> - <a class="link-blue" href="javascript:viewGrievanceRequestDetailsOfSeepz(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return seepzuserlink;
			}
			else if (row[4] == 'S' && row[6] == 'F') {
				var seepzuserforwardedlink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewseepzuserforwardedlink(' + "'" + row[2] + "'" + ')">Internal Grievance Request Forwarded</a> - <a class="link-blue" href="javascript:viewseepzuserforwardedlink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return seepzuserforwardedlink;
			}
			else if (row[4] == 'S' && row[6] == 'V') {
				var seepzuserverificationlink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewseepzuserverificationlink(' + "'" + row[2] + "'" + ')">Verified Grievance Forwarded From ADC</a> - <a class="link-blue" href="javascript:viewseepzuserverificationlink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return seepzuserverificationlink;
			}
			else if (row[5] == 'U' && row[6] == 'S') {
				var unitlink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewGrievanceRequestDetails(' + "'" + row[2] + "'" + ')">Grievance Submitted by Unit User</a> - <a class="link-blue" href="javascript:viewGrievanceRequestDetails(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return unitlink;
			}
			else if (row[5] == 'U' && row[6] == 'F') {
				var unitforwardedlink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewunitforwardedlink(' + "'" + row[2] + "'" + ')">Unit Grievance Request Forwarded</a> - <a class="link-blue" href="javascript:viewunitforwardedlink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return unitforwardedlink;
			}
			else if (row[5] == 'U' && row[6] == 'V') {
				var unitverificationlink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewunitverificationlink(' + "'" + row[2] + "'" + ')">Verified Grievance Forwarded From ADC</a> - <a class="link-blue" href="javascript:viewunitverificationlink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return unitverificationlink;
			}
			else if (row[3] == 'P' && row[6] == 'S') {
				var publicLink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewAnonymousGrievanceRequestDetails(' + "'" + row[2] + "'" + ')">Grievance Submitted by Public</a> - <a class="link-blue" href="javascript:viewAnonymousGrievanceRequestDetails(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return publicLink;
			}
			else if (row[3] == 'P' && row[6] == 'F') {
				var publicForwardedLink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewpublicForwardedLink(' + "'" + row[2] + "'" + ')">Public Grievance Request Forwarded </a> - <a class="link-blue" href="javascript:viewpublicForwardedLink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return publicForwardedLink;
			}
			else if (row[3] == 'P' && row[6] == 'V') {
				var publicVerificationLink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewpublicVerificationLink(' + "'" + row[2] + "'" + ')">Verified Public Grievance Forwarded From ADC</a> - <a class="link-blue" href="javascript:viewpublicVerificationLink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return publicVerificationLink;
			}
			else if (row[3] == 'A' && row[6] == 'S') {
				var anonymousLink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewAnonymousGrievanceRequestDetails(' + "'" + row[2] + "'" + ')">Anonymous Public Grievance Submitted</a> - <a class="link-blue" href="javascript:viewAnonymousGrievanceRequestDetails(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return anonymousLink;
			}
			else if (row[3] == 'A' && row[6] == 'F') {
				var anonymousforwardedLink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewanonymousforwardedLink(' + "'" + row[2] + "'" + ')">Anonymous Public Grievance Request Forwarded</a> - <a class="link-blue" href="javascript:viewanonymousforwardedLink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return anonymousforwardedLink;
			}
			else if (row[3] == 'A' && row[6] == 'V') {
				var anonymousverificationLink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewanonymousverificationLink(' + "'" + row[2] + "'" + ')">Verified Anonymous Public Grievance Request Forwarded From ADC</a> - <a class="link-blue" href="javascript:viewanonymousverificationLink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return anonymousverificationLink;
			}
			else if (row[4] == 'S' && row[6] == 'C') {
				var seepzUserSettlementLink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:vieSseepzUserSettlementLink(' + "'" + row[2] + "'" + ')">Your grievance request is settled</a> - <a class="link-blue" href="javascript:vieSseepzUserSettlementLink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return seepzUserSettlementLink;
			}
			else if (row[5] == 'U' && row[6] == 'C') {
				var unitUserSettlementLink = '<div class="inline-block fw-600 text-uppercase"><a class="link-blue" href="javascript:viewUnitUserSettlementLink(' + "'" + row[2] + "'" + ')">Your grievance request is settled</a> - <a class="link-blue" href="javascript:viewUnitUserSettlementLink(' + "'" + row[2] + "'" + ')">(' + data.toLowerCase() + ')</a></div>';
				return unitUserSettlementLink;
			}
		}
	},
	{ "data": "1", "className": "text-center " },
	]
});





