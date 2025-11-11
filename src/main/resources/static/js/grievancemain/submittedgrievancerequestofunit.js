const addOrEditUrl = 'addOrEditGrievanceRequest';
const saveUrl = 'saveGrievanceRequest';
const deleteUrl = 'deleteGrievanceRequestDetails';
const listingUrl = "/grievance/grievanceListing/submittedGrievancesListingOfUnit?id=" + oneTimeRegistrationVO.id;
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

function loadValues(grievanceRequestVO, buttonType) {
	//alert(grievanceRequestVO.attachmentsList.length)
	let attachments = '';
	for (var count = 0; count < grievanceRequestVO.attachmentsList.length; count++) {
		//alert()
		let option = '<div class="row"><div class="2 text-decoration-underline text-primary" style="font-size:13px">' +
			grievanceRequestVO.attachmentsList[count].subject +
			'</div><div class="col-4 fw-200 fst-italic" style="font-size:13px">' +
			'<a class="text-dark" target="_blank" href="/grievance/grievance/downloadGrievanceAttachment?idEnc='
			+ grievanceRequestVO.attachmentsList[count].idEnc + '"> '
			/*+contractsDetailsVO.attachmentsList[count].attachmentSubject+" - "*/
			+ grievanceRequestVO.attachmentsList[count].attachmentName +
			' </a><a id="" href="javascript:void(0);" onclick="return removeAttachment(' + "'"
			+ grievanceRequestVO.attachmentsList[count].idEnc + "'" + ",'"
			+ grievanceRequestVO.idEnc + "','" + buttonType + "',  '" + addOrEditUrl + "'"
			+ ')" style="display: inline-block; text-align: right">' +
			'<font style="font-size: 20px; color: rgb(78, 154, 6); ">' +
			'<i class="mt-1 fa fa-times text-danger fst-italic" aria-hidden="true" title="Click to remove attachment"></i>' +
			'</font></a></div></div>';
		attachments = attachments + option;
	}

	let newDisplay = $('#inputTaker').html();
	newDisplay = newDisplay.replace(/attachments/g, attachments)
	inputTaker.innerHTML = newDisplay;



	//alert(grievanceRequestVO.mobileNo)
	$('#requestId').val(grievanceRequestVO.id);
	$('#categoryId').val(grievanceRequestVO.category.id);
	$('#applicationNumberId').val(grievanceRequestVO.applicationNo);
	$('#applicationNumberAutoId').val(grievanceRequestVO.applicationNoAuto);
	$('#typeId').val(grievanceRequestVO.grievanceType.id);
	$('#complaintId').val(grievanceRequestVO.complaint);
	$('#againstId').val(grievanceRequestVO.against);
	$('#emailId').val(grievanceRequestVO.email);
	$('#mobilenoId').val(grievanceRequestVO.mobileNo);
	$('#addressId').val(grievanceRequestVO.address);
	$('#placeId').val(grievanceRequestVO.place);
	$('#dateOfEventId').val(grievanceRequestVO.dateOfEventStr);
	$('#grievanceDescriptionId').val(grievanceRequestVO.grievanceDescription);
	$('#solutionDescriptionId').val(grievanceRequestVO.solutionDescription);
	if (grievanceRequestVO.requestType == "A") {
		$('#checkboxId').prop("checked", true);
		$('#emailIdDiv').hide();
		$('#mobilenoIdDiv').hide();
		$('#addressIdDiv').hide();
		//$('#checkboxId').checked(true)
	}


}

// for drop down 

function loadTemplate() {

	let categoryDisplay = addSampleTemplate;
	let categoryOptions = getcategoryListOptions(categorySetupVOs);
	categoryDisplay = categoryDisplay.replace(/categoryOptions/g, categoryOptions)


	let grievanceTypeDisplay = categoryDisplay;
	let grievanceTypeOptions = getgrievanceTypeListOptions(grievanceTypeVOs);
	grievanceTypeDisplay = grievanceTypeDisplay.replace(/grievanceTypeOptions/g, grievanceTypeOptions)
	inputTaker.innerHTML = grievanceTypeDisplay;



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

$(document).on("click", "#saveButton", function() {
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
			success: function(result) {

				$("#saveButton").removeAttr("disabled");
				$('#saveButton').html("Update")
				if (result.result == 'Y') {
					$('#sampleTabId').val(result.resultObject.id);
					displaySuccessToastNew('fieldErrors', "Successfully Saved");
					table.ajax.reload();
				} else {
					displayFieldErrors(result)
				}
			}
		});
	}
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
					table.ajax.reload();
				} else {
					displayFieldErrors(d)
				}
			}
		});
	}
});


function viewGrievanceRequestDetails(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewGrievanceRequestDetailsOfUnit?idEnc=" + idEnc + "&status=S";
	window.location.href = redirectURL;
}

function removeAttachment(id, grievanceId, buttonType, actionName) {
	alert(id)
	if (confirm("Do you want to remove the attachment?")) {
		$.ajax({
			type: 'GET',
			url: 'removeGrievanceAttachment?',
			data: 'idEnc=' + id,
			success: function(msg) {
				// $('#nameContainer').html(msg);
			}
		});
	}
	else
		return false;
	//let redirectURL = "/monitor/contract/removeContractAttachment?idEnc=" + id;
	//window.location.href = redirectURL;

	ajaxLoad(grievanceId, buttonType, actionName);
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
		$("#deleteStatus" + count).val("Y");
		$(element).closest(".jnDetailRow").hide();
		$('[id^="addButton"]').hide();
		$('[id="' + $('.jnDetailRow:last').find('[id^="addButton"]').attr('id') + '"]').show();
	} else {
		alert("Minimum one Detail required")
	}
}


$(document).on("click", "#deleteButton", function() {
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
});
$(document).on("click", "#clearButton", function() {
	ajaxLoad('', '', addOrEditUrl);
});



window.addEventListener('DOMContentLoaded', event => {
	if (addToggle) {
		if (localStorage.getItem(toggleItem) === 'true') {
			addButtonArrow.classList.toggle('rotate45');
			collapseAddHCard.classList.add("show");
			ajaxLoad('', '', addOrEditUrl)
		} else {
			collapseAddHCard.classList.remove("show");
		}
		addToggle.addEventListener('click', event => {
			addButtonArrow.classList.toggle('rotate45');
			localStorage.setItem(toggleItem, addButtonArrow.classList.contains('rotate45'));
			if (localStorage.getItem(toggleItem) === 'true') {
				collapseAddHCard.classList.add("show");
				ajaxLoad('', '', addOrEditUrl)
			} else {
				collapseAddHCard.classList.remove("show");
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
				return '<div class="inline-block fw-600 text-uppercase" ><a class="link-blue" href="javascript:viewGrievanceRequestDetails(' + "'" + row[8] + "'" + ')">' + data + '</a><div class="float-end badge bg-danger fst-italic text-center">Anonymous</div></div>';
		}
	},

	{ "data": "1" },
	{ "data": "2" },
	{ "data": "3" },
	{ "data": "9" },
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
				return '<div class="badge badge-status text-center text-warning bg-warning-soft" >Processing</div>';
			if (row[5] == 'F')
				return '<div class="badge badge-status text-center text-warning bg-warning-soft" >Processing</div>';
			if (row[5] == 'V')
				return '<div class="badge badge-status text-center text-warning bg-warning-soft" >Processing</div>';
			if (row[5] == 'C')
				return '<div class="badge badge-status text-center text-success bg-success-soft" >Settled</div>';
		}
	},
//	{
//		"title": "Action",
//		"data": "8",
//		"searchable": false,
//		"sortable": false,
//		"render": function(data, type, row) {
//
//			iconEdit = '<i data-feather="edit" color="blue"  data-bs-toggle="tooltip" data-bs-placement="left" title="Edit "></i>'
//			iconDel = '<i   data-feather="trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="right" title="Delete "></i>'
//			iconSubmit = '<i   data-feather="file" color="blue" data-bs-toggle="tooltip" data-bs-placement="right" title="View Request Details "></i>'
//			if (row[5] == 'N')
//				iconSubmit = '<i   data-feather="send" color="green" data-bs-toggle="tooltip" data-bs-placement="right" title="Submit and Forward "></i>'
//			if (row[5] == 'N') {
//				return '<div class="inline-block text-center" ><a class="btn btn-datatable btn-icon btn-transparent-dark "  href="javascript:ajaxLoad(' + "'" + data + "'" + ",'xEnbpmjQulU='," + "'" + addOrEditUrl + "'" + ')">' + iconEdit + '</a>' +
//					'<a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:ajaxLoad(' + "'" + data + "'" + ",'VKpmwOifDEs='," + "'" + addOrEditUrl + "'" + ')" >' + iconDel + '</a>' +
//					'<a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:viewGrievanceRequestDetails(' + "'" + row[8] + "'" + ')" >' + iconSubmit + '</a>' +
//					'';
//			}
//			else
//				return '<div class="inline-block text-center" >' +
//					'<a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:viewGrievanceRequestDetails(' + "'" + row[8] + "'" + ')" >' + iconSubmit + '</a>' +
//					'</div>';
//
//		}
//	}
	]
});


var addSampleTemplate = '' +
	'<form id="newForm" enctype="multipart/form-data">' +
	'<input type="hidden" name="requestType" id="requestTypeId" value="N">' +
	'<div class="row ">' +
	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center text-primary">' +
	'<h5 id="headingLabelId">Grievance Details</h5>' +
	'		</div>' +
	'		</div>' +
	'<div class="row ">' +

	'		<div class="col-sm-12 col-md-3">' +
	'			<div class="form-group">' +
	'			<input type="hidden" id="requestId" name="id">' +
	'			<input type="hidden" id="applicationNumberId" name="applicationNo">' +
	'			<input type="hidden" id="applicationNumberAutoId" name="applicationNoAuto">' +

	'				<label for="type"> Category<font color="red">*</font></label>  <select class="form-select form-select-sm text-uppercase" data-width="100%" data-live-search="true" title="Select Category"' +
	'                    name="category.id"  id="categoryId" >' +
	'             <option value="O">--select--</option>' +

	' categoryOptions </select>' +
	'			</div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-3">' +
	'			<div class="form-group">' +
	'			<input type="hidden" id="requestId" name="id">' +

	'				<label for="type">  Type <font color="red">*</font></label>  <select class="form-select form-select-sm text-uppercase" data-width="100%" data-live-search="true" title="Select Type"' +
	'                    name="grievanceType.id"  id="typeId" >' +
	'             <option value="O">--select--</option>' +

	' grievanceTypeOptions </select>' +
	'			</div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 ">' +
	'			<div class="form-group">' +
	'				<label for="place"> Subject<font color="red">*</font></label> <input type="text" class="form-control form-control-sm"' +
	'					id="complaintId" name="complaint"></textarea>' +
	'			</div>' +
	'		</div>' +



	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 " id="emailIdDiv">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Email</label> <input class="form-control form-control-sm"' +
	'					id="emailId" name="email" ></textarea>' +
	'			</div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 " id="mobilenoIdDiv">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Mobile No</label> <input class="form-control form-control-sm"' +
	'					id="mobilenoId" name="mobileNo"></textarea>' +
	'			</div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 " id="addressIdDiv">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Address</label> <textarea class="form-control form-control-sm"' +
	'					id="addressId" name="address" rows="3"></textarea>' +
	'			</div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 ">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Against</label> <input class="form-control form-control-sm"' +
	'					id="againstId" name="against" />' +
	'			</div>' +
	'		</div>' +



	'		<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 ">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Place of Event Leading to Grievance</label> <input class="form-control form-control-sm"' +
	'					id="placeId" name="place" />' +
	'			</div>' +
	'		</div>' +



	'		<div class="col-sm-12 col-md-6 col-lg-2 col-xl-2 ">' +
	'			<div class="form-group">' +
	'				<label for="place"> Date of Event</label> <input type="date" id="dateOfEventId" class="form-control form-control-sm datetimepicker" name="dateOfEventStr"' +
	'                        >' +
	'			</div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 ">' +
	'			<div class="form-group">' +
	'				<label for="place"> Detailed Description of Grievance:<font color="red">*</font></label> <textarea class="form-control form-control-sm"' +
	'					id="grievanceDescriptionId" name="grievanceDescription" rows="3"></textarea>' +
	'			</div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 ">' +
	'			<div class="form-group">' +
	'				<label for="place"> Proposed Solution/ Suggestions:</label> <textarea class="form-control form-control-sm"' +
	'					id="solutionDescriptionId" name="solutionDescription" rows="3"></textarea>' +
	'			</div>' +
	'		</div>' +

	'	</div>' +
	'	</div>' +
	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4">' +
	'			<div class="page-header page-header-compact page-header-light border-bottom text-primary  mb-1">' +
	'				Grievance Supporting Files</div>' +
	'		</div>' +


	'<div class="row jnDetailRow mt-2">' +
	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'			<div class="form-group">' +
	'				<input class="form-control form-control-sm"' +
	'					id="attachmentSubject0" placeholder="Attachment Subject" name="attachmentSubject[0]">' +
	'	' +
	'			</div>' +
	'		</div>' +
	'        <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'            <div class="form-group">' +
	'                     <input type="file"' +
	'                         class="form-control form-control-sm " id="myfile0" placeholder="Progress Document" name="grievanceAttachmentFile[0]">' +
	'                </div>' +
	'        </div>' +
	'           <div class="col-sm-2 col-md-2 col-lg-1 col-xl-1 pe-0">' +
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
	'       <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 " id="jnValueInputRow0">' +
	'       </div>' +
	'</div>' +

	'<div>' +
	'attachments' +
	'</div>' +

	'	<div class="row pt-2">' +
	'		<div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 text-left pb-0" id="fieldErrors">' +
	'		</div>' +
	'		<div id="buttonSpace" class="col-xl-4 col-lg-4 col-md-6 col-sm-12  pr-3">' +

	'		</div>' +
	'	</div>' +
	'</form>' +
	'';


const jnParameterCont = '' +
	'		<div class="row">' +
	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'			<div class="form-group">' +
	'				<input class="form-control form-control-sm"' +
	'					id="attachmentSubjectCount" placeholder="Attachment Subject" name="attachmentSubject[Count]">' +
	'	' +
	'			</div>' +
	'		</div>' +
	'        <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'            <div class="form-group">' +
	'                     <input type="file"' +
	'                         class="form-control form-control-sm " id="myfileCount" placeholder="Progress Document" name="grievanceAttachmentFile[Count]">' +
	'                </div>' +
	'        </div>' +
	'    <div class="col-sm-2 col-md-2 col-lg-1 col-xl-1 pe-0">' +
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

const updateButtonTemplete =
	'<button type="button" id="updateButton" class="btn btn-sm btn-primary float-end mx-2">Update</button><button type="button" id="clearButton" class="btn btn-sm btn-warning float-end">Clear</button> ';


const saveButtonTemplete =
	'<button type="button" id="saveButton" class="btn btn-sm btn-primary float-end">Save</button>';



const deleteButtonTemplete =
	'<button type="button" id="deleteButton" class="btn btn-sm btn-danger float-end">Delete</button>';


