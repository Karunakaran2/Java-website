const notesListingUrl = "notesDetails";
const saveNotesDetails = 'saveNoteDetails';
const saveAttachmentDetails = 'saveAttachmentDetails'
var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');
const addNoteToggle = document.body.querySelector('#addNoteToggle');
const collapseAddNCard = document.body.querySelector('#collapseAddNCard');
const addButtonNotesArrow = document.body.querySelector('#addbutton-notesarrow');
const noteToggleItem = 'sb|addNotes-toggle'
const addOrEditNoteUrl = '';
const notesEditUrl = "/grievance/grievance/editNotes";
const updateNotesDetailsUrl = "/grievance/grievance/updateNotesDetail";
//
const attachmentUrl = "/grievance/grievance/getNoteAttachment";

const penalityToggleItem = 'sb|addPenalities-toggle'
const addPenalityToggle = document.body.querySelector('#addPenalityToggle');
const collapseAddPCard = document.body.querySelector('#collapseAddPCard');
const addButtonPenalityArrow = document.body.querySelector('#addbutton-penalityarrow');
//
const deductionToggleItem = 'sb|addDeduction-toggle'
const adddeDuctionToggle = document.body.querySelector('#adddeDuctionToggle');
const collapseAddDCard = document.body.querySelector('#collapseAddDCard');
const addButtonDeductionarrow = document.body.querySelector('#addbutton-deductionarrow');

const addQueryToggle = document.body.querySelector('#addQueryToggle');
const collapseAddQCard = document.body.querySelector('#collapseAddQCard');
const addButtonQueriesArrow = document.body.querySelector('#addbutton-queriesarrow');
const queryToggleItem = 'sb|addQueries-toggle';
const addOrEditQueryUrl = '';

const addAttachmentToggle = document.body.querySelector('#addAttachmentToggle');
const collapseAddACard = document.body.querySelector('#collapseAddACard');
const addButtonAttachmentArrow = document.body.querySelector('#addbutton-attachmentarrow');
const attachmentToggleItem = 'sb|addAttachments-toggle';
const addOrEditAttachmentUrl = '';

$(window).scroll(function() { $(this).scrollTop() > 5 ? $("#addToggle").hide() : $("#addToggle").fadeIn() });

function grievanceRequestSettlement() {
	var id = $('#grievanceId').val();
	$('#myModal3 .modal-title').html('Grievance Disposal');
	$('#modalframe6').attr(
		'src',
		'/grievance/grievance/gotoGrievanceSettlementPage?id=' + id,
	);
	$('#myModal3').modal('show');
}

//function clearForm() {
//	document.getElementById('remarkId').value = '';
//}
function validateForm() {
	//	if ($('#remarkId').val() == null || $('#remarkId').val() == "0" || $('#remarkId').val() == "") {
	//		alert("Please Enter Remarks");
	//		document.getElementById('remarkId').style.borderColor = "red";
	//		return false;
	//	} else {
	//		document.getElementById('remarkId').style.borderColor = "lightgray";
	//	}
	return true;
}
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
const forwardButton = '<div class="row" id="forwardButton">' +
	'<div class="col-12 float-end text-end mt-2">' +
	'<button type="button" class="btn btn-md btn-primary float-end mx-2" onclick="grievanceApproval(\'FD\')">Forward</button>' +
	'</div>' +
	'</div>';
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
						if (result.result == "Y") {
							$('#forwardButton').html('');
							loadSuccess('modalXLBody', 'Successfully Forwarded');
							setTimeout(function() {
								window.location.href = "/grievance/grievance/gotoForwardTab";
							}, 2000);
						}
					}
				});
			}
		}
	}
	else
		return false;
}

const forwardBtn =
	'<button type="button" class="btn btn-md btn-primary" onclick="javascript:doFunction(' + "'FD'" + ')">Forward</button>';
const verifyBtn =
	'<button type="button" class="btn btn-md btn-success" onclick="javascript:doFunction(' + "'VR'" + ')">Verify And Forward</button>';
const approveBtn =
	'<button type="button" class="btn btn-md btn-success" onclick="javascript:doFunction(' + "'AP'" + ')">Approve</button>';

const rejectBtn =
	'<button type="button" class="btn btn-md btn-danger" onclick="javascript:doFunction(' + "'RJ'" + ')">Reject And Forward</button>';

iconAttachment = '<i  data-feather="download" color="blue" data-bs-toggle="tooltip" data-bs-placement="top" title="download "></i>'
iconRemove = '<i   data-feather="x" color="red" data-bs-toggle="tooltip" data-bs-placement="top" ></i>'

$(document).ready(function() {
	notesDisplay();
});
//const notesDisplay = () => {
//	//	$('#deduction').html('');
//	//	$('#deduction').html(deductionTemplate)
//	//	$('#buttonSpaceD').html(saveButtoneductionTemplete);
//	grvAttachmentDetailsDisplay();
//}


const viewlistingUrlAttachmnet = "/grievance/grievanceListing/Attachmentlisting?IdEnc=" + grievanceRequestVO.idEnc;
var table6;
function grvAttachmentDetailsDisplay() {
	if (table6) {
		table6.destroy();
	}
	table6 = $('#tableAttachmentData').DataTable({
		"processing": true,
		"serverSide": true,
		"ajax": {
			"url": viewlistingUrlAttachmnet,
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
			"className": "text-center ",
			render: function(data, type, row, meta) {
				return meta.row + meta.settings._iDisplayStart + 1;
			}
		},

		{ "data": "0" },
		{
			"data": "1",
			"render": function(data, type, row) {
				return '<div ><a href="/grievance/grievance/viewAttachmentDetails?idEnc=' + row[2] + '" target="_blank">' + data + '</a></div>';
			}
		},
		{ "data": "3" },
		{
			"title": "Action",
			"className": "text-center ",
			"data": "2",
			"searchable": false,
			"sortable": false,
			"render": function(data, type, row) {

				let iconDel = '';

				// Ensure resultobject and necessary properties are defined
				if (row[4] === row[5]) {
					iconDel = '<i data-feather="trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="right" title="Delete "></i>';
				}

				return '<div class="inline-block text-center">' +
					(iconDel ? '<a class="btn btn-datatable btn-icon btn-transparent-dark" href="javascript:deleteAttachment(' + "'" + data + "'" + ')">' + iconDel + '</a>' : '') +
					'</div>';
			}
		}


		]
	});

}
//function deleteAttachment(idEnc) {
//	if (confirm("Do you want to Delete Attachment Details?")) {
//		$.ajax({
//			type: 'POST',
//			url: 'deleteAttachmentDetails?', // replace with your actual delete endpoint
//			data: { idEnc: idEnc }, // include the idEnc parameter in the data
//			success: function(msg) {
//				grvAttachmentDetailsDisplay();
//			},
//			error: function(error) {
//				console.error('Error deleting investigation:', error);
//			}
//		});
//	} else {
//		return false;
//	}
//}
function deleteAttachment(idEnc) {
	if (confirm("Do you want to Delete Attachment Details?")) {
		$.ajax({
			type: 'POST',
			url: 'deleteAttachmentDetails?', // replace with your actual delete endpoint
			data: { idEnc: idEnc }, // include the idEnc parameter in the data
			success: function(result) {
				if (result.result = 'Y') {
					$('#attachmentRow').html('');
					$('#fieldRow').show();
					notesDisplay();
				}
			},
			error: function(error) {
				console.error('Error deleting investigation:', error);
			}
		});
	} else {
		return false;
	}
}
function notesDisplay() {
	$.ajax({
		type: 'GET',
		url: notesListingUrl,
		data: {
			id: grievanceRequestVO.id
		},
		success: function(result) {
			populateNotes(result.resultObject)
		}
	});

}
function attachmentDownload(attachmentIdEnc) {
	window.open('/grievance/grievance/viewAttachmentDetails?idEnc=' + attachmentIdEnc, '_blank');
}
var attachmentTemplateLoad = '<div class="d-flex badge bg-primary-soft text-primary text-center my-2 mx-2"data-attachment-id="attachmentIdEnc"><div class="fs-6 pt-1 pe-1">attachmentName</div><div ><a class="btn btn-datatable btn-icon btn-transparent-dark" href="javascript:attachmentDownload(\'attachmentIdEnc\')"><i data-feather="download" color="green" data-bs-toggle="tooltip" data-bs-placement="left" ></i></a><a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:deleteAttachment(\'attachmentIdEnc\')"><i data-feather="x" color="red" data-bs-toggle="tooltip" data-bs-placement="right" ></i></a></div></div>';
function populateAttachmentsValue(notesAttachment) {
	//	let caseListAttachmentsVOs = caseListFormVO.caseListAttachmentsVOs;
	//	let caseListVO = caseListFormVO.caseListVO;
	//	if (caseListVO.uploadStatus == 'Y') {
	let attachmentDisplay = '';
	//	for (let count = 0; count < notesAttachment.length; count++) {
	let attachmentSingle = attachmentTemplateLoad;
	attachmentSingle = attachmentSingle.replace(/attachmentName/g, notesAttachment.subject);
	attachmentSingle = attachmentSingle.replace(/attachmentIdEnc/g, notesAttachment.idEnc);
	attachmentDisplay = attachmentDisplay + attachmentSingle;
	//	}
	$('#attachmentRow').html(attachmentDisplay);
	$('#fieldRow').hide();
	feather.replace();
	//	}

}
function getNoteAttachment(idEnc) {
	$.ajax({
		type: 'GET',
		url: attachmentUrl,
		data: {
			noteIdEnc: idEnc,
			//			attachmentIdEnc:attachmentIdEnc
		},
		success: function(result) {
			//			$("#saveNoteButton").removeAttr("disabled");
			//			$('#buttonSpaceN').html(updateButtonTemplete)
			//			if (result.result = 'Y') {
			populateAttachmentsValue(result.resultObject);
			//				$('#noteIdEnc').val(result.resultObject.idEnc)
			//				$('#notesId').val(result.resultObject.note);
			//				getNoteAttachment(result.resultObject.idEnc);
			//				getNotesAttachments(result.resultObject.idEnc);
			//			}
		}
	});

}
function editNotesdetails(idEnc) {
	$.ajax({
		type: 'GET',
		url: notesEditUrl,
		data: {
			noteIdEnc: idEnc,
			//			attachmentIdEnc:attachmentIdEnc
		},
		success: function(result) {
			$("#saveNoteButton").removeAttr("disabled");
			$('#buttonSpaceN').html(updateButtonTemplete)
			if (result.result = 'Y') {
				$('#noteIdEnc').val(result.resultObject.idEnc)
				$('#notesId').val(result.resultObject.note);
				getNoteAttachment(result.resultObject.idEnc);
				//				getNotesAttachments(result.resultObject.idEnc);
			}
		}
	});
}
iconEdit = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M11.854 0.146a1.5 1.5 0 0 1 2.122 2.122l-10 10a1.5 1.5 0 0 1-2.122-2.122l10-10zM12 2l2 2-10 10-2-2v-2l10-10v2z"/>
  <path fill-rule="evenodd" d="M11.854 0.146a1.5 1.5 0 0 1 2.122 2.122l-10 10a1.5 1.5 0 0 1-2.122-2.122l10-10zM12 2l2 2-10 10-2-2v-2l10-10v2z"/>
</svg>`;

function editNotes(idEnc) {
	//	$.ajax({
	//		type: 'GET',
	//		url: notesEditUrl,
	//		data: {
	//			noteIdEnc: idEnc,
	////			attachmentIdEnc:attachmentIdEnc
	//		},
	//		success: function(result) {
	//			$("#saveNoteButton").removeAttr("disabled");
	//			$('#buttonSpaceN').html(updateButtonTemplete)
	//			if(result.result='Y'){
	//				$('#noteIdEnc').val(result.resultObject.idEnc)
	//				$('#notesId').val(result.resultObject.notes);
	////				getNotesAttachments(result.resultObject.idEnc);
	//			}
	//		}
	//	});
}
const noteTemplate = '' +
	'<div class="d-flex text-muted pb-2 mt-3">' +
//	'      <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>' +
	'      <p class="pb-3 mb-0 small lh-sm border-bottom">' +
	'        <span class="d-block text-dark fs-6" >NOTECONTENT</span>' +
	'        @USERNAME on DATE' +
	'      </p>' +
	'      <div class="attachments-container">ATTACHMENTS</div>' + // Added this line
	'      <div class="justify-content-center"><a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:editNotesdetails(\'NOTEId\')">' + iconEdit + '</a></div>' +
	'</div>';

function populateNotes(noteVOs) {
	$('#notes').html('');
	for (var i = 0; i < noteVOs.length; i++) {
		let noteTempRow = noteTemplate;
		let noteAttachments = noteVOs[i].forwardAttachmentVOs;
		let attachmentDisplay = '';

		if (noteAttachments.length > 0) {
			for (var j = 0; j < noteAttachments.length; j++) {
				attachmentDisplay += '<div class="d-flex align-items-center bg-light border rounded p-2 my-2 mx-2 border-bottom">' +
					'<div class="flex-grow-1 fs-7 pe-1">' + noteAttachments[j].subject + '</div>' +
					'<div class="d-flex border-bottom">' +
					'<a class="btn btn-sm btn-outline-secondary float-end me-1" href="javascript:attachmentDownload(\'' + noteAttachments[j].idEnc + '\')">' +
					'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">' +
					'<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>' +
					'<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>' +
					'</svg>' +
					'</a>' +
					//                    '<a class="btn btn-sm btn-danger" href="javascript:deleteNoteAttachment(\'' + noteAttachments[j].idEnc + '\')">' +
					//                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">' +
					//                    '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
					//                    '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>' +
					//                    '</svg>' +
					//                    '</a>' +
					'</div>' +
					'</div>';
			}
		}

		noteTempRow = noteTempRow.replace(/NOTECONTENT/g, noteVOs[i].note)
			.replace(/USERNAME/g, noteVOs[i].enteredBy.user.titleName + " " + noteVOs[i].enteredBy.user.userName + " " + noteVOs[i].enteredBy.user.lastName + " (" + noteVOs[i].enteredBy.designation + ")")
			.replace(/DATE/g, noteVOs[i].enteredOnStr)
			.replace(/NOTEId/g, noteVOs[i].idEnc)
			.replace(/ATTACHMENTS/g, attachmentDisplay); // Replaced this line

		$('#notes').append(noteTempRow);
	}
}

//function populateNotes(noteVOs) {
//	$('#notes').html('');
//	let noteFull = '';
//	for (var i = 0; i < noteVOs.length; i++) {
//		let noteTempRow = '<div class="d-flex text-muted pb-2 mt-3">';
//		noteTempRow += '<svg class="bd-placeholder-img flex-shrink-NOTEId0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>';
//		noteTempRow += '<p class="pb-3 mb-0 small lh-sm border-bottom">';
//		noteTempRow += '<strong class="d-block text-dark fs-6">NOTECONTENT</strong>';
//		noteTempRow += '@USERNAME on DATE';
//		if (noteVOs[i].enteredBy.hierarchy.hierarchyId === grievanceRequestVO.heldBy) {
//			noteTempRow += '<a class="btn btn-datatable btn-icon btn-transparent-dark ms-auto" href="javascript:editNotesdetails(\'' + noteVOs[i].idEnc + '\')">' + iconEdit + '</a>';
//		}
//		noteTempRow += '</p></div>';
//
//		noteTempRow = noteTempRow.replace(/NOTECONTENT/g, noteVOs[i].note);
//		noteTempRow = noteTempRow.replace(/USERNAME/g, noteVOs[i].enteredBy.user.titleName + " " + noteVOs[i].enteredBy.user.userName + " " + noteVOs[i].enteredBy.user.lastName + " " + "(" + noteVOs[i].enteredBy.designation + ")");
//		noteTempRow = noteTempRow.replace(/DATE/g, noteVOs[i].enteredOnStr);
//		noteTempRow = noteTempRow.replace(/NOTEId/g, noteVOs[i].idEnc);
//
//		noteFull += noteTempRow;
//	}
//	$('#notes').html(noteFull)
//}

var notesAttachmentTemplate = '<div class="d-flex badge bg-primary-soft text-primary text-center my-2 mx-2"><div class="fs-7 pt-1 pe-1">AttachmentName</div><div ><a  class="btn btn-datatable btn-icon btn-transparent-dark"  href="javascript:attachmentNoteLoad(\'attachmentId\',\'type\')"><i   data-feather="download" color="green" data-bs-toggle="tooltip" data-bs-placement="top" ></i></a><a  class="btn btn-datatable btn-icon btn-transparent-dark "   href="javascript:deleteEditNoteAttachment(\'attachmentId\',\'type\')"><i   data-feather="x" color="red" data-bs-toggle="tooltip" data-bs-placement="top" ></i></a></div></div>';

//function loadAttachment(id, buttonType, actionName) {
//	let inputTakerAttachment = document.body.querySelector('#inputTakerAttachment');
//	if ((id == '' || id == 0 || id == null)) {
//		$.when(inputTakerAttachment.innerHTML = addAttachmentTemplate).then
//		$('#grievanceId1').val(grievanceRequestVO.id)
//
//		$('#buttonSpaceA').html(saveAttachmentButtonTemplete)
//	}
//	else {
//		//no conditions as of now
//	}
//}

function loadNote(id, buttonType, actionName) {
	let inputTakerNote = document.body.querySelector('#inputTakerNote');
	if ((id == '' || id == 0 || id == null)) {
		$.when(inputTakerNote.innerHTML = addNoteTemplate).then
		$('#grievanceId').val(grievanceRequestVO.id)

		$('#buttonSpaceN').html(saveNotesButtonTemplete)
	}
	else {
		//no conditions as of now
	}
}

window.addEventListener('DOMContentLoaded', event => {
	//	loadAttachment('', '', addOrEditAttachmentUrl);
	loadNote('', '', addOrEditNoteUrl);

	//	if (addNoteToggle) {
	//		if (localStorage.getItem(noteToggleItem) === 'true') {
	//			addButtonNotesArrow.classList.toggle('rotate45');
	//			collapseAddNCard.classList.remove("collapse");
	//			collapseAddNCard.classList.add("collapsed");
	//			collapseAddNCard.classList.add("show");
	//			loadNote('', '', addOrEditNoteUrl);
	//
	//		} else {
	//			collapseAddNCard.classList.add("collapse");
	//			collapseAddNCard.classList.remove("collapsed");
	//			collapseAddNCard.classList.remove("show");
	//		}
	//		addNoteToggle.addEventListener('click', event => {
	//			addButtonNotesArrow.classList.toggle('rotate45');
	//			localStorage.setItem(noteToggleItem, addButtonNotesArrow.classList.contains('rotate45'));
	//			if (localStorage.getItem(noteToggleItem) === 'true') {
	//				collapseAddNCard.classList.remove("collapse");
	//				collapseAddNCard.classList.add("collapsed");
	//				collapseAddNCard.classList.add("show");
	//				loadNote('', '', addOrEditNoteUrl)
	//			} else {
	//				collapseAddNCard.classList.add("collapse");
	//				collapseAddNCard.classList.remove("collapsed");
	//				collapseAddNCard.classList.remove("show");
	//				document.body.querySelector('#inputTakerNote').innerHTML = ''
	//			}
	//		});
	//	}



	// if (addAttachmentToggle) {
	//		if (localStorage.getItem(addAttachmentToggle) === 'true') {
	//			addButtonAttachmentArrow.classList.toggle('rotate45');
	//			collapseAddACard.classList.remove("collapse");
	//			collapseAddACard.classList.add("collapsed");
	//			collapseAddACard.classList.add("show");
	//			loadAttachment('', '', addOrEditAttachmentUrl)
	//		} else {
	//			collapseAddACard.classList.add("collapse");
	//			collapseAddACard.classList.remove("collapsed");
	//			collapseAddACard.classList.remove("show");
	//		}
	//		addAttachmentToggle.addEventListener('click', event => {
	//			addButtonAttachmentArrow.classList.toggle('rotate45');
	//			localStorage.setItem(queryToggleItem, addButtonAttachmentArrow.classList.contains('rotate45'));
	//			if (localStorage.getItem(queryToggleItem) === 'true') {
	//				collapseAddACard.classList.remove("collapse");
	//				collapseAddACard.classList.add("collapsed");
	//				collapseAddACard.classList.add("show");
	//				loadAttachment('', '', addOrEditAttachmentUrl)
	//			} else {
	//				collapseAddACard.classList.add("collapse");
	//				collapseAddACard.classList.remove("collapsed");
	//				collapseAddACard.classList.remove("show");
	//				document.body.querySelector('#inputTakerAttachment').innerHTML = ''
	//			}
	//		});
	//	}
});
const saveAttachmentButtonTemplete =
	'<button type="button" id="saveAttachmentButton" class="btn btn-md btn-primary float-end ms-2">Save</button><button type="reset" id="clearButton" class="btn btn-md btn-outline-secondary float-end">Clear</button>';

const saveNotesButtonTemplete =
	'<button type="button" id="saveNoteButton" class="btn btn-md btn-primary float-end ms-2">Save Note</button><button type="button" id="clearButton" class="btn btn-md btn-outline-secondary float-end">Clear</button>';

const updateButtonTemplete =
	'<button type="button" id="updateButton" class="btn btn-md btn-primary float-end ms-2">Update</button><button type="button" id="clearButton" class="btn btn-md btn-outline-secondary float-end">Clear</button> ';

const addNoteTemplate = '' +
	'<form id="noteFormId" enctype="multipart/form-data">' +
	'			<input type="hidden" id="grievanceId" name="grievanceDetails.id">' +
	'	       <input type="hidden" class="form-control " id="noteIdEnc" name="idEnc"> ' +
	'<div class="row ">' +
	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 ">' +
	'		</div>' +
	'<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-3">' +
	'		<div class="form-group custom-form-group"> <textarea class="form-control custom-input" id="notesId" placeholder="" name="note" rows="5"></textarea>' +
	' 				<label for="Note">Note<font color="red">*</font></label> </div>' +
	'		</div>' +
	'	</div>' +

	'<div class="row ">' +
	'<div class="col-auto d-flex flex-row " id="attachmentRow"></div>' +
	'</div>' +
	'<div class="row" id="fieldRow">' +



	'<div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-3">' +
	'		<div class="form-group custom-form-group"> <input class="form-control custom-input" id="attachmentSubject0" placeholder="" name="forwardAttachmentVOs[0].subject" >' +
	' 				<label for="AttachmentSubject">Attachment Subject</label> </div>' +
	'		</div>' +
	'<div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-3">' +
	'			<div class="form-group custom-form-group"> <input type="file" class="form-control custom-input" id="myfile0" placeholder="" name="forwardAttachmentVOs[0].attachmentFile" accept=".pdf, .png, .jpg, .jpeg" onchange="validateFile(this)" >' +
	'				 <label for="attachment"></label><p class="fs-10 text" style="color: gray;">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size: 2mb)</p></div>' +
	'		</div>' +
	'		</div>' +



	'	<div class="row pt-2">' +
	'       <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left pb-0" id="fieldErrors">' +
	'		</div>' +
	'		<div class="col-xl-6 col-lg-3 col-md-6 col-sm-12 text-left mb-2 d-flex justify-content-end" id="sucessToastNDisplay">' +
	'		</div>' +
	'		<div class="col-xl-12 col-lg-3 col-md-12 col-sm-12  pr-3" id="buttonSpaceN">' +
	'		</div>' +
	'	</div>' +
	'</form>' +
	'';


const addAttachmentTemplate = '' +
	'<form id="attachmentFormId">' +
	'			<input type="hidden" id="grievanceId1" name="grievanceDetails.id">' +
	//'	       <input type="hidden" class="form-control " id="noteIdEnc" name="idEnc"> ' +
	'<div class="row ">' +
	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 ">' +
	//	'			<div class="page-header page-header-compact page-header-light   mb-1">' +
	//	'				Add Attachments</div>' +
	'		</div>' +
	'<div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-3">' +
	'		<div class="form-group custom-form-group"> <input class="form-control custom-input" id="attachmentSubject0" placeholder="" name="subject" >' +
	' 				<label for="remark">Attachment Subject</label> </div>' +
	'		</div>' +
	'<div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-3">' +
	'			<div class="form-group custom-form-group"> <input type="file" class="form-control custom-input" id="myfile0" placeholder="" name="attachmentFile" accept=".pdf, .png, .jpg, .jpeg" onchange="validateFile(this)" >' +
	'				 <label for="remark"></label><p class="fs-10 text" style="color: black;">(Allowed Types: .pdf, .png, .jpg, .jpeg) (Max Size: 2mb)</p></div>' +
	'		</div>' +
	'	</div>' +
	'	<div class="row pt-2">' +
	'       <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left pb-0" id="fieldErrors">' +
	'		</div>' +
	'		<div class="col-xl-6 col-lg-3 col-md-6 col-sm-12 text-left pb-0" id="sucessToastNDisplay">' +
	'		</div>' +
	'		<div class="col-xl-12 col-lg-3 col-md-12 col-sm-12  pr-3" id="buttonSpaceA">' +
	'		</div>' +
	'	</div>' +
	'</form>' +
	'';

const saveButtonTemplete =
	'<button type="button" id="saveButton" class="btn btn-md btn-primary float-end mx-2">Save</button><button type="reset" id="clearButton" class="btn btn-md btn-outline-secondary float-end">Clear</button>';


const saveButtoneductionTemplete =
	'<button type="button" id="saveDeduction" class="btn btn-md btn-primary float-end mx-2">Save</button><button type="button" id="clearDeductionButton" class="btn btn-md btn-outline-secondary float-end">Clear</button>';



function validateNoteForm() {
	var notesId = $('#notesId').val();
	if (notesId == '' || notesId == null || notesId == undefined) {
		alert("Please enter Notes");
		document.getElementById('notesId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('notesId').style.borderColor = "lightgray";
	}
	return true;
}


$(document).on("click", "#saveAttachmentButton", function() {
	var formData = new FormData($("#attachmentFormId")[0]);
	//	if (validateNoteForm()) {
	$.ajax({
		url: saveAttachmentDetails,
		type: 'POST',
		data: formData,
		async: false,
		cache: false,
		processData: false,
		contentType: false,
		beforeSend: function() {
			$('#saveAttachmentButton').attr('disabled', 'disabled')
		},
		success: function(result) {
			$("#saveAttachmentButton").removeAttr("disabled");
			if (result.result == 'Y') {
				displaySuccessToastNew('sucessToastNDisplay', "Successfully Saved");
				table6.ajax.reload();
				loadAttachment();
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
	//	}
});






$(document).on("click", "#saveNoteButton", function() {
	var formData = new FormData($("#noteFormId")[0]);
	if (validateNoteForm()) {
		$.ajax({
			url: saveNotesDetails,
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			processData: false,
			contentType: false,
			beforeSend: function() {
				//				$('#saveNoteButton').attr('disabled', 'disabled')
			},
			success: function(result) {
				//				$("#saveNoteButton").removeAttr("disabled");
				//								$('#buttonSpaceN').html(updateButtonTemplete)
				if (result.result == 'Y') {
					displaySuccessToastNew('sucessToastNDisplay', "Successfully Saved");
					$('#noteIdEnc').val(result.resultObject.idEnc)
					notesDisplay();
					$('#notesId').val('');
					$('#attachmentSubject0').val('');
					$('#myfile0').val('');
					if (result.resultObject.attachmentStatus == 'N') {
						alert("Attachment file is not saved.Please select a valid file.")
					}
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


$(document).on("click", "#updateButton", function() {
	var formData = new FormData($("#noteFormId")[0]);
	if (validateNoteForm()) {
		$.ajax({
			url: updateNotesDetailsUrl,
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			processData: false,
			contentType: false,
			beforeSend: function() {
				$('#saveNoteButton').attr('disabled', 'disabled')
			},
			success: function(d) {
				if (d.result == 'Y') {
					displaySuccessToastNew('fieldErrors', "Successfully Updated");
					notesDisplay();
					$('#notesId').val('');
					$('#attachmentSubject0').val('');
					$('#myfile0').val('');
					$('#attachmentRow').html('');
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

$(document).on("click", "#clearButton", function() {
	loadNote();
});



const clearButtonTemplete =
	'<button type="button" id="saveButton" class="btn btn-md btn-primary float-end ms-2">Save</button><button type="button" id="clearButton" class="btn btn-md btn-outline-secondary float-end ">Clear</button>';

function forwardClaim() {
	var idEnc = $('#claimId').val();
	$('#myModal3 .modal-title').html('Forward');
	$('#modalframe6').attr(
		'src',
		'/scm/scmMain/getUserList?idEnc=' + idEnc,
	);
	$('#myModal3').modal('show');
}
//

function closeModal2() {
	$("#myModal3").modal("hide");
	window.location.reload();
}

