const addOrEditUrl = 'addOrEditFaq';
const saveUrl = 'saveFaq';
const deleteUrl =  'deleteFaq';
const listingUrl = "/grievance/setupList/faqSetupListing";
const toggleItem = 'sb|addFunction-toggle'


const addToggleTextContent = 'Add Category'
const closeToggleTextContent = ''
const addToggleText = document.body.querySelector('#addToggleText');
var token = $('#_csrf').attr('content');
var header = $('#_csrf_header').attr('content');
const addToggle = document.body.querySelector('#addToggle');
const addButtonArrow = document.body.querySelector('#addbutton-arrow');
const collapseAddHCard = document.body.querySelector('#collapseAddHCard');

$(window).scroll(function(){$(this).scrollTop()>5?$("#addToggle").hide():$("#addToggle").fadeIn()});

function validateForm() {
	if ($('#questionId').val() == null || $('#questionId').val() == "0" || $('#questionId').val() == "") {
		alert("Please Enter Grievance Type");
		document.getElementById('questionId').style.borderColor = "red";
		return false;
	} else {
		document.getElementById('questionId').style.borderColor = "lightgray";
	}
	return true;
}


function ajaxLoad(id, buttonType, actionName) {
	const inputTaker = document.body.querySelector('#inputTaker');
      if(id==''||id==0||id==null){
            inputTaker.innerHTML=faqTemplate;
            $('#buttonSpace').html(saveButtonTemplete);
            
      }
      else{
      $.ajax({
            url: actionName,
            data: {
                  idEnc: id,
            },
            beforeSend: function() {
                  inputTaker.classList.add('text-center');
                  inputTaker.innerHTML = '<div class="spinner-border" style="width: 6.8rem; height: 6.8rem;text-align:center" role="status">' +
                        '<span class="sr-only">Loading...</span></div>Loading'
            },
            success: function(result) {
                  inputTaker.classList.remove('text-center');
                  if(buttonType=="xEnbpmjQulU=")
                  {
                                    $.when(inputTaker.innerHTML=faqTemplate).then(loadValues(result.resultObject)).then($('#buttonSpace').html(updateButtonTemplete)).then($('#inputTaker').fadeIn(3000));
      
                  }
                  else if(buttonType=="VKpmwOifDEs=")
                  {
                                    $.when(inputTaker.innerHTML=faqTemplate).then(loadValues(result.resultObject)).then($('#buttonSpace').html(deleteButtonTemplete)).then($('#inputTaker').fadeIn(3000));
                  }
            $(window).scrollTop(0);

            }
      });
      }
}

function loadValues(faqSetupVO){
		$('#faqId').val(faqSetupVO.id);
      	$('#questionId').val(faqSetupVO.question);
      	$('#answerId').val(faqSetupVO.answer);
      
      
      
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
					$('#faqId').val(result.resultObject.id);
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
			addButtonArrow.classList.remove("d-none")
			addButtonArrow.classList.toggle('rotate45');
			collapseAddHCard.classList.add("show");
			addToggleText.textContent = closeToggleTextContent;
			ajaxLoad('', '', addOrEditUrl)
		} else {
			addButtonArrow.classList.add("d-none")
			collapseAddHCard.classList.remove("show");
			addToggle.classList.add("btn-outline-primary")
			addToggleText.textContent = addToggleTextContent;
		}
		addToggle.addEventListener('click', event => {
			addButtonArrow.classList.toggle('rotate45');
			localStorage.setItem(toggleItem, addButtonArrow.classList.contains('rotate45'));
			if (localStorage.getItem(toggleItem) === 'true') {
				addButtonArrow.classList.remove("d-none")
				collapseAddHCard.classList.add("show");
				addToggleText.textContent = closeToggleTextContent;
				ajaxLoad('', '', addOrEditUrl)
			} else {
				addButtonArrow.classList.add("d-none")
				collapseAddHCard.classList.remove("show");
				addToggleText.textContent = addToggleTextContent;
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
		"data": "0","className": "text-center ",
		render: function(data, type, row, meta) {
			return meta.row + meta.settings._iDisplayStart + 1;
		}
	},
	
	{ "data": "0", 
	},
	
	{ "data": "1" },
	{
		"data": "2",
		"searchable": false,
		"sortable": false,
		"render": function(data, type,row) {
			
			iconEdit = '<i data-feather="edit" color="blue"  data-bs-toggle="tooltip" data-bs-placement="top" title="Edit "></i>'
			iconDel = '<i   data-feather="trash-2" color="red" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete "></i>'
			
			return '<div class="inline-block text-center" ><a class="btn btn-datatable btn-icon btn-action-primary "  href="javascript:ajaxLoad(' + "'" + data + "'" + ",'xEnbpmjQulU='," + "'" + addOrEditUrl + "'" + ')">' + iconEdit + '</a>' +
				'<a class="btn btn-datatable btn-icon btn-action-danger " href="javascript:ajaxLoad(' + "'" + data + "'" + ",'VKpmwOifDEs='," + "'" + addOrEditUrl + "'" + ')" >' + iconDel + '</a>' +
				'' ;
				
		
		}
	}
	]
});


const faqTemplate = '' + 
'<form id="newForm">' + 
'<div class="row ">' + 
'			<input type="hidden" id="faqId" name="id">' + 
'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-3 pt-3">' +

	'			<div class="form-group custom-form-group"> <input class="form-control custom-input" id="questionId" placeholder="" name="question">' +
	' <label for="Question">Question<font color="red">*</font></label> </div>' +

	'		</div>' +
'		<div class="col-sm-12 col-md-3 col-lg-2 col-xl-6 pt-3">' +
	'			<div class="form-group custom-form-group"> <textarea class="form-control custom-input h-42px " id="answerId" placeholder="" name="answer" ></textarea>' +
	' <label for="Answer">Answer</label> </div>' +
	'		</div>' +

'	</div>' + 
'	<div class="row pt-2">' + 
'		<div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 text-left pb-0" id="fieldErrors">' + 
'		</div>' + 
'		<div id="buttonSpace" class="col-xl-4 col-lg-4 col-md-6 col-sm-12  pr-3">' + 

'		</div>' + 
'	</div>' + 
'</form>'+
'';
var saveButtonTemplete=' <button type="button" id="saveButton" class="btn btn-md btn-primary float-end mx-2">Save' +' </button><button type="button" id="clearButton" style="width: 70px;" class="btn btn-md btn-outline-secondary float-end">Clear</button>';

var updateButtonTemplete=' <button type="button" id="updateButton" class="btn btn-md btn-primary float-end mx-2">Update' +' </button><button type="button" id="clearButton" style="width: 70px;" class="btn btn-md btn-outline-secondary float-end">Clear</button>';
var deleteButtonTemplete=' <button type="button" id="deleteButton" class="btn btn-md btn-danger float-end mx-2">Delete' +' </button><button type="button" id="clearButton" style="width: 70px;" class="btn btn-md btn-outline-secondary float-end">Clear</button>';
