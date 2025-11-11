function validateForm() {
    return true;
}

function ajaxLoad(id, buttonType, actionName) {
    const inputTaker = document.body.querySelector('#inputTaker');
    if (id == '' || id == 0 || id == null) {
        inputTaker.innerHTML = addIdentificationDetails;
        $('#buttonSpace').html(saveButtonTemplete);
    }
}

const addIdentificationDetails = '' +
    '<form id="newForm">' +
    '<div class="row ">' +
    '        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 ">' +
    '            <div class="page-header page-header-compact page-header-light border-bottom  mb-1">Add' +
    '                Identification Details</div>' +
    '        </div>' +
    '    </div>' +
    '</form>' +
    '';


var updateButtonTemplete =
    '<button type="button" id="updateButton" class="btn btn-sm btn-primary float-end mx-2">Update</button><button type="button" id="clearButton" class="btn btn-sm btn-warning float-end">Clear</button> ';

var saveButtonTemplete =
    '<button type="button" id="saveButton" class="btn btn-sm btn-primary float-end">Save</button>';

var deleteButtonTemplete =
    '<button type="button" id="deleteButton" class="btn btn-sm btn-danger float-end">Delete</button>';