const listingUrl = "/grievance/grievanceListing/publicGrievancesListsForVerification?id="+seatUserAllotedVO.id;
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
		$('#buttonSpace').html(saveButtonTemplete);
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
	let redirectURL = "/grievance/grievance/gotoViewGrievanceRequestDetailsForVerification?idEnc=" + idEnc;
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
		"data": "0",
		render: function(data, type, row, meta) {
			return meta.row + meta.settings._iDisplayStart + 1;
		}
	},

	{
		"data": "0",
		"render": function(data, type, row) {
			/*alert(row[6])*/
			if (row[6] == 'N' || row[6] == 'P' )
			return '<div class="inline-block fw-600 text-uppercase" ><a href="javascript:viewGrievanceRequestDetails(' + "'" + row[8] + "'" + ')">' + data + '</a></div>';
			else
			return '<div class="inline-block fw-600 text-uppercase" ><a href="javascript:viewGrievanceRequestDetails(' + "'" + row[8] + "'" + ')">' + data + '</a><div class="float-end badge bg-danger fst-italic text-center">Anonymous</div></div>';
		}
	},

	{ "data": "1"
	 },
	{ "data": "2" },
	{ "data": "3" },
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
				return '<div class="badge bg-primary text-center" >INITIATED</div>';
			if (row[5] == 'S')
				return '<div class="badge bg-warning text-center" >PROCESSING</div>';
			if (row[5] == 'C')
				return '<div class="badge bg-success text-center" >SETTLED</div>';
				if (row[5] == 'F')
				return '<div class="badge bg-success text-center" >FORWARDED FROM LDC</div>';
		}
	},
	]
});





