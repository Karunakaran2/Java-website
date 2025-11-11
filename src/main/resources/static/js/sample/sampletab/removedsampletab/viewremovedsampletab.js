const addOrEditUrl = 'addOrEditSampleTab';
const saveUrl = 'saveActiveSampleTab';
const deleteUrl =  'deleteActiveSampleTab';
const listingUrl = "/sample/sampleListing/activeSampleTabList";
const toggleItem = 'sb|addFunction-toggle'

var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');
const addToggle = document.body.querySelector('#addToggle');
const addButtonArrow = document.body.querySelector('#addbutton-arrow');
const collapseAddHCard = document.body.querySelector('#collapseAddHCard');

function validateForm() {
	return true;
}


function getName(val) {
	$.ajax({
		type: 'GET',
		url: 'getPlotOrGalaName',
		data: 'type=' + val,
		success: function(msg) {
			$('#nameContainer').html(msg);
		}
	});
}


function ajaxLoad(id, buttonType, actionName) {
	if (localStorage.getItem(toggleItem) === 'false') {
		localStorage.setItem(toggleItem, true);
		addButtonArrow.classList.toggle('rotate45');
		collapseAddHCard.classList.add("show");
	}
	const inputTaker = document.body.querySelector('#inputTaker');
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
			success: function(d) {
				table.ajax.reload();
				$('#inputTaker').html(d);
			}
		});
	}
});



$(document).on("click", "#deactivateButton", function() {
	if (validateForm()) {
		$.ajax({
			url: deactivateUrl,
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
				ajaxLoad('', '', addOrEditUrl)
			} else {
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
	
	{ "data": "1" },
	{ "data": "2" },
	
	{ "data": "3" ,
	   "render": function(data, type,row) {
			if (data == "N") {
				return '<div class="badge bg-success-soft text-success text-center">Auctionable</div>';
			} else if (data == "Y"){
				return '<div class="badge bg-warning-soft text-warning text-center">Auctioned</div>'
			}
			}
			},
	{
		"title": "Action",
		"data": "4",
		"searchable": false,
		"sortable": false,
		"render": function(data, type,row) {
			if(row[3]=='N')
			{
			iconEdit = '<i data-feather="edit" color="blue"  data-bs-toggle="tooltip" data-bs-placement="left" title="Edit "></i>'
			iconDel = '<i   data-feather="trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="right" title="Delete "></i>'
			iconSend = '<i   data-feather="send" color="blue" data-bs-toggle="tooltip" data-bs-placement="right" title="Send "></i>'
			
			return '<div class="inline-block text-center" ><a class="btn btn-datatable btn-icon btn-transparent-dark "  href="javascript:ajaxLoad(' + "'" + data + "'" + ",'xEnbpmjQulU='," + "'" + addOrEditUrl + "'" + ')">' + iconEdit + '</a>' +
				'<a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:ajaxLoad(' + "'" + data + "'" + ",'VKpmwOifDEs='," + "'" + addOrEditUrl + "'" + ')" >' + iconDel + '</a>' +
				'<a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:ajaxLoad(' + "'" + data + "'" + ",'DUfvVXCWEeM='," + "'" + addOrEditUrl + "'" + ')" >' + iconSend + '</a>' ;
				
		}
		else{
			iconPower = '<i  data-feather="power" color="red" data-bs-toggle="tooltip" data-bs-placement="right" title="Delete "></i>'
			return  '<div class="inline-block text-center" ><a class="btn btn-datatable btn-icon btn-transparent-dark " href="javascript:ajaxLoad(' + "'" + data + "'" + ",'IzkmevatceI='," + "'" + addOrEditUrl + "'" + ')" >' + iconPower + '</a></div>';
		;
		}
		}
	}
	]
});