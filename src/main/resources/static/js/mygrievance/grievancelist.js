const addOrEditUrl = ' ';
const saveUrl = 'saveCategorySetup';
const deleteUrl =  ' ';
const listingUrl = "/grievance/mygrievance/activeGrievanceList";
const toggleItem = 'sb|addFunction-toggle'

var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');
const addToggle = document.body.querySelector('#addToggle');
const addButtonArrow = document.body.querySelector('#addbutton-arrow');
const collapseAddHCard = document.body.querySelector('#collapseAddHCard');

$(window).scroll(function(){$(this).scrollTop()>5?$("#addToggle").hide():$("#addToggle").fadeIn()});

function validateForm() {
	return true;
}


function ajaxLoad(id, buttonType, actionName) {
	const inputTaker = document.body.querySelector('#inputTaker');
	if(id==''||id==0||id==null){
		inputTaker.innerHTML=addCategoryTemplate;
	}
	else{
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
		success: function(d) {
			inputTaker.classList.remove('text-center');
			$('#inputTaker').fadeIn(3000)
			inputTaker.innerHTML = d;
			$(window).scrollTop(0);

		}
	});
	}
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
	{ "data": "0" 
	},
	{ "data": "1" },
	{
		"data": "2",
		"searchable": false,
		"sortable": false,
		"render": function(data, type,row) {
			iconEdit = '<i data-feather="edit" color="blue"  data-bs-toggle="tooltip" data-bs-placement="left" title="Edit "></i>'
			iconDel = '<i   data-feather="trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="right" title="Delete "></i>'
			
			return '<div class="inline-block text-center" ><a class="btn btn-datatable btn-icon btn-transparent-dark "  href="javascript:ajaxLoad(' + "'" + data + "'" + ",'xEnbpmjQulU='," + "'" + addOrEditUrl + "'" + ')">' + iconEdit + '</a>' +
				'<a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:ajaxLoad(' + "'" + data + "'" + ",'VKpmwOifDEs='," + "'" + addOrEditUrl + "'" + ')" >' + iconDel + '</a>' +
				'' ;
				
		
		}
	}
	]
});


const addCategoryTemplate = '' + 
'<form id="newForm">' + 
'<div class="row ">' + 
'		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 ">' + 
'			<div class="page-header page-header-compact page-header-light border-bottom  mb-1">Add' + 
'				Category Setup</div>' + 
'		</div>' + 
'		<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3 ">' + 
'			<div class="form-group">' + 
'			<input type="hidden" id="categoryId" name="id">' + 
'				<label for="type">Category Name<font color="red">*</font></label>  <input class="form-control"' + 
'					id="categoryName" placeholder="Enter Category Name" name="category">' +  
'	' + 
'			</div>' + 
'		</div>' + 
'		<div class="col-sm-12 col-md-12 col-lg-9 col-xl-9 ">' + 
'			<div class="form-group">' + 
'				<label for="remarks">Remarks<font color="red">*</font></label> <textarea class="form-control"' + 
'					id="remarksId" placeholder="Enter Remarks" name="description"></textarea>' + 
'	' + 
'	' + 
'			</div>' + 
'		</div>' + 

'	</div>' + 
'	<div class="row pt-2">' + 
'		<div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 text-left pb-0" id="fieldErrors">' + 
'		</div>' + 
'		<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12  pr-3">' + 
'			<button type="button" id="saveButton" class="btn btn-sm btn-success float-end">Save' + 
'			</button>' + 
'		</div>' + 
'	</div>' + 
'</form>'+
'';

