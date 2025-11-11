const addOrEditUrl = 'addOrEditSampleTab';
const saveUrl = 'saveGrievanceRequest';
const deleteUrl = 'deleteActiveSampleTab';
const listingUrl = "/sample/sampleTabListing/activeSampleTabList";
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
		
		
		 let grievanceTypeDisplay=categoryDisplay;
         let grievanceTypeOptions=getgrievanceTypeListOptions(grievanceTypeVOs);
         grievanceTypeDisplay=grievanceTypeDisplay.replace(/grievanceTypeOptions/g,grievanceTypeOptions)
         inputTaker.innerHTML=grievanceTypeDisplay;
		
		

		inputTaker.innerHTML = grievanceTypeDisplay;
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
					$.when(inputTaker.innerHTML = addSampleTemplate).then(loadValues(result.resultObject)).then($('#buttonSpace').html(deleteButtonTemplete)).then($('#inputTaker').fadeIn(3000));
				}
				else if (buttonType == "xEnbpmjQulU=") {//for Edit
					$.when(inputTaker.innerHTML = addSampleTemplate).then(loadValues(result.resultObject)).then($('#buttonSpace').html(updateButtonTemplete)).then($('#inputTaker').fadeIn(3000));
				}
				$(window).scrollTop(0);
			}
		});
	}
}

// for drop down 

function loadTemplate() {
	let categoryDisplay = addSampleTemplate;
	let categoryOptions = getcategoryListOptions(categorySetupVOs);
	categoryDisplay = categoryDisplay.replace(/categoryOptions/g, categoryOptions)
	inputTaker.innerHTML = categoryDisplay;
	
	
	let grievanceTypeDisplay = addSampleTemplate;
	let grievanceTypeOptions = getgrievanceTypeListOptions(grievanceTypeVOs);
    grievanceTypeDisplay = grievanceTypeDisplay.replace(/grievanceTypeOptions/g, grievanceTypeOptions)
	inputTaker.innerHTML = grievanceTypeDisplay;		
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
	if (validateForm()) {
		$.ajax({
			url: saveUrl,
			type: 'POST',
			data: $('#newForm').serialize(),
			beforeSend: function() {
				$('#saveButton').attr('disabled', 'disabled')
			},
			success: function(d) {
				table.ajax.reload();
				$('#inputTaker').html(d);
			}
		});
	}
});
$(document).on("click", "#deleteButton", function() {
	$.ajax({
		url: deleteUrl,
		type: 'POST',
		data: $('#newForm').serialize(),
		beforeSend: function() {
			$('#deleteButton').attr('disabled', 'disabled')
		},
		success: function(d) {
			table.ajax.reload();
			$('#inputTaker').html(d);
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
		render: function(data, type, row, meta) {
			return meta.row + meta.settings._iDisplayStart + 1;
		}
	},

	{ "data": "0" },

	{ "data": "1" },
	{
		"title": "Action",
		"data": "2",
		"searchable": false,
		"sortable": false,
		"render": function(data, type, row) {

			iconEdit = '<i data-feather="edit" color="blue"  data-bs-toggle="tooltip" data-bs-placement="left" title="Edit "></i>'
			iconDel = '<i   data-feather="trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="right" title="Delete "></i>'

			return '<div class="inline-block text-center" ><a class="btn btn-datatable btn-icon btn-transparent-dark "  href="javascript:ajaxLoad(' + "'" + data + "'" + ",'xEnbpmjQulU='," + "'" + addOrEditUrl + "'" + ')">' + iconEdit + '</a>' +
				'<a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:ajaxLoad(' + "'" + data + "'" + ",'VKpmwOifDEs='," + "'" + addOrEditUrl + "'" + ')" >' + iconDel + '</a>' +
				'';


		}
	}
	]
});


var addSampleTemplate = '' +
	'<form id="newForm">' +
	'<div class="row ">' +
	'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 ">' +
	'			<div class="page-header page-header-compact page-header-light border-bottom  mb-1"> Grievance Request ' +
	'				</div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-3">' +
	'			<div class="form-group">' +
	'			<input type="hidden" id="requestId" name="id">' +

	'				<label for="type"> Category of Grievance<font color="red">*</font></label>  <select class="form-select text-uppercase" data-width="100%" data-live-search="true" title="Select Category"' +
	'                    name="category.id"  id="categoryId" >' +
	'             <option value="O">--select--</option>' +

	' categoryOptions </select>' +
	'			</div>' +
	'		</div>' +
	
	
		'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Against<font color="red">*</font></label> <input class="form-control"' +
	'					id="against" name="against"></textarea>' +
	'			</div>' +
	'		</div>' +
	
	
	
			'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Email<font color="red">*</font></label> <input class="form-control"' +
	'					id="email" name="email"></textarea>' +
	'			</div>' +
	'		</div>' +
	
	
				'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Mobile No<font color="red">*</font></label> <input class="form-control"' +
	'					id="mobileno" name="mobileno"></textarea>' +
	'			</div>' +
	'		</div>' +
	
	
					'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Address<font color="red">*</font></label> <input class="form-control"' +
	'					id="address" name="address"></textarea>' +
	'			</div>' +
	'		</div>' +


					'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'			<div class="form-group">' +
	'				<label for="purpose">Place<font color="red">*</font></label> <input class="form-control"' +
	'					id="place" name="place"></textarea>' +
	'			</div>' +
	'		</div>' +



	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'			<div class="form-group">' +
	'				<label for="place"> Date of event leading to grievance:<font color="red">*</font></label> <input type="date" id="dateOfEvent" class="form-control datetimepicker" name="dateOfEventStr"' +
	'                        >' +
	'			</div>' +
	'		</div>' +


	'		<div class="col-sm-12 col-md-3">' +
	'			<div class="form-group">' +
	'			<input type="hidden" id="requestId" name="id">' +

	'				<label for="type">  Grievance Type* <font color="red">*</font></label>  <select class="form-select text-uppercase" data-width="100%" data-live-search="true" title="Select Type"' +
	'                    name="grievanceType.id"  id="typeId" >' +
	'             <option value="O">--select--</option>' +

	' grievanceTypeOptions </select>' +
	'			</div>' +
	'		</div>' +

	'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' +
	'			<div class="form-group">' +
	'				<label for="place"> Complaint:<font color="red">*</font></label> <input class="form-control"' +
	'					id="complaint" name="complaint"></textarea>' +
	'			</div>' +
	'		</div>' +

	'	</div>' +
	'	<div class="row pt-2">' +
	'		<div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 text-left pb-0" id="fieldErrors">' +
	'		</div>' +
	'		<div id="buttonSpace" class="col-xl-4 col-lg-4 col-md-6 col-sm-12  pr-3">' +
	'		</div>' +
	'	</div>' +
	'</form>' +
	'';

const updateButtonTemplete =
	'<button type="button" id="updateButton" class="btn btn-sm btn-success float-end mx-2">Update</button><button type="button" id="clearButton" class="btn btn-sm btn-warning float-end">Clear</button> ';


const saveButtonTemplete =
	'<button type="button" id="saveButton" class="btn btn-sm btn-success float-end">Save</button>';



const deleteButtonTemplete =
	'<button type="button" id="deleteButton" class="btn btn-sm btn-danger float-end">Delete</button>';


