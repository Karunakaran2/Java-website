const deleteUrl = 'deleteGrievanceRequestDetails';
const listingUrl = "/grievance/grievanceListing/forwardGrievanceLists?id=" + seatUserAllotedVO.id;
const toggleItem = 'sb|addFunction-toggle'

var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');
const addToggle = document.body.querySelector('#addToggle');
const addButtonArrow = document.body.querySelector('#addbutton-arrow');
const collapseAddHCard = document.body.querySelector('#collapseAddHCard');

$(window).scroll(function() { $(this).scrollTop() > 5 ? $("#addToggle").hide() : $("#addToggle").fadeIn() });

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
function viewGrievanceRequestDetails(idEnc) {
	let redirectURL = "/grievance/grievance/gotoViewAllForwardedGrievanceRequestDetails?idEnc=" + idEnc;
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
		"data": "0", "className": "text-center",
		render: function(data, type, row, meta) {
			return meta.row + meta.settings._iDisplayStart + 1;
		}
	},
	{
		"data": "2",
		"render": function(data, type, row) {
			if (row[8] != 'A')
				return '<div class="inline-block fw-600 text-uppercase" ><a class="link-blue" href="javascript:viewGrievanceRequestDetails(' + "'" + row[3] + "'" + ')">' + data + '</a></div>';
			else
				return '<div class="inline-block fw-600 text-uppercase" ><a class="link-blue" href="javascript:viewGrievanceRequestDetails(' + "'" + row[3] + "'" + ')">' + data + '</a><span class="mx-2"><img src="/grievance/images/anonymous-01-01.png" data-bs-toggle="tooltip" data-bs-placement="top" title="Anonymous" data-bs-original-title="Anonymous" aria-label="Anonymous" style="width: auto;height: 12px;"></span></div>';
			//		"render": function(data, type, row) {
			//			return '<div class="inline-block fw-600 text-uppercase" ><a href="javascript:viewGrievanceRequestDetails(' + "'" + row[3] + "'" + ')">' + data + '</a></div>';
		}
	},
	{ "data": "5" },
	{ "data": "6" },
	{ "data": "7" },

	{
		"data": "0",
		"className": "text-center",
	},
	{ "data": "4" },
		{
		"data": "9",

		"className": "text-center",
		"render": function(data, type, row) {
			if (row[9] == 'N')
				return '<div class="badge badge-status text-center text-primary bg-primary-soft" >Initiated</div>';
			if (row[9] == 'S')
				return '<div class="badge badge-status text-center text-warning bg-warning-soft" >Processing</div>';
			if (row[9] == 'F')
				return '<div class="badge badge-status text-center text-warning bg-warning-soft" >Processing</div>';
			if (row[9] == 'C')
				return '<div class="badge badge-status text-center text-success bg-success-soft" >Settled</div>';
		}

	}

	]
});

