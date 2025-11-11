const successBToast='<div style="position: absolute; bottom: -4rem; right: 1rem;">' + 
'							<!-- Toast -->' + 
'							<div class="toast" id="successToast" role="alert" aria-live="assertive" aria-atomic="true">' + 
'    <div class="toast-header bg-success text-white">' + 
'        <i data-feather="check"></i>' + 
'        <strong class="me-auto" id="toastHeadContent"> </strong>' + 
'        <small class="text-white-50 ml-2">just now</small>' + 
'        <button class="ml-2 mb-1 btn-close btn-close-white" type="button" data-bs-dismiss="toast" aria-label="Close">                                                            </button>' + 
'    </div>' + 
'    <div class="toast-body" id="toastContent"></div>' + 
'</div>' + 
'						</div>' + 
'';

const successTToast='<div style="position: absolute; top: 1rem; right: 1rem;">' + 
'							<!-- Toast -->' + 
'							<div class="toast" id="successToast" role="alert" aria-live="assertive" aria-atomic="true">' + 
'    <div class="toast-header bg-success text-white">' + 
'        <i data-feather="check"></i>' + 
'        <strong class="me-auto" id="toastHeadContent"> </strong>' + 
'        <small class="text-white-50 ml-2">just now</small>' + 
'        <button class="ml-2 mb-1 btn-close btn-close-white" type="button" data-bs-dismiss="toast" aria-label="Close">                                                            </button>' + 
'    </div>' + 
'    <div class="toast-body" id="toastContent"></div>' + 
'</div>' + 
'						</div>' + 
'';

const successLToast='<div style="position: absolute; left: 1rem; right: 1rem;">' + 
'							<!-- Toast -->' + 
'							<div class="toast" id="successToast" role="alert" aria-live="assertive" aria-atomic="true">' + 
'    <div class="toast-header bg-success text-white">' + 
'        <i data-feather="check"></i>' + 
'        <strong class="me-auto" id="toastHeadContent"> </strong>' + 
'        <small class="text-white-50 ml-2">just now</small>' + 
'        <button class="ml-2 mb-1 btn-close btn-close-white" type="button" data-bs-dismiss="toast" aria-label="Close">                                                            </button>' + 
'    </div>' + 
'    <div class="toast-body" id="toastContent"></div>' + 
'</div>' + 
'						</div>' + 
'';

const successRToast='<div style="position: absolute; right: 1rem; right: 1rem;">' + 
'							<!-- Toast -->' + 
'							<div class="toast" id="successToast" role="alert" aria-live="assertive" aria-atomic="true">' + 
'    <div class="toast-header bg-success text-white">' + 
'        <i data-feather="check"></i>' + 
'        <strong class="me-auto" id="toastHeadContent"> </strong>' + 
'        <small class="text-white-50 ml-2">just now</small>' + 
'        <button class="ml-2 mb-1 btn-close btn-close-white" type="button" data-bs-dismiss="toast" aria-label="Close">                                                            </button>' + 
'    </div>' + 
'    <div class="toast-body" id="toastContent"></div>' + 
'</div>' + 
'						</div>' + 
'';

function displaySuccessToast(parentId,position,toastHeadContent,toastContent){
	let displayToast = "";
	if (position == "B") {
		displayToast = successBToast;
	}
	else if (position == "T") {
		displayToast = successTToast;
	} else if (position == "L") {
		displayToast = successLToast;
	} else if (position == "R") {
		displayToast = successRToast;
	}
	else {
		displayToast = successBToast;
	}
	$('#'+parentId).append(displayToast);
	$('#toastHeadContent').html(toastHeadContent);
	$('#toastContent').html(toastContent);
	$("#successToast").toast("show");
}
const successToast='<div class="toast" id="successToastParentId"   role="alert" aria-live="assertive" aria-atomic="true">' + 
'    <div class="toast-header bg-success text-white">' + 
'        <i data-feather="check"></i>' + 
'        <strong class="me-auto" id="toastHeadContent"> Successfully Updated</strong>' + 
'        <small class="text-white-50 ml-2">just now</small>' + 
'        <button class="ml-2 mb-1 btn-close btn-close-white" type="button" data-bs-dismiss="toast" aria-label="Close">                                                            </button>' + 
'    </div>' + 
'</div>' ;
const deleteToast='<div class="toast" id="successToastParentId"   role="alert" aria-live="assertive" aria-atomic="true">' + 
'    <div class="toast-header bg-success text-white">' + 
'        <i data-feather="check"></i>' + 
'        <strong class="me-auto" id="toastHeadContent"> Successfully Deleted</strong>' + 
'        <small class="text-white-50 ml-2">just now</small>' + 
'        <button class="ml-2 mb-1 btn-close btn-close-white" type="button" data-bs-dismiss="toast" aria-label="Close">                                                            </button>' + 
'    </div>' + 
'</div>' ;
const successToastContent='<div class="toast" id="successToastParentId"   role="alert" aria-live="assertive" aria-atomic="true">' + 
'    <div class="toast-header bg-success text-white">' + 
'        <i data-feather="check"></i>' + 
'        <strong class="me-auto" id="toastHeadContent"> </strong>' + 
'        <small class="text-white-50 ml-2">just now</small>' + 
'        <button class="ml-2 mb-1 btn-close btn-close-white" type="button" data-bs-dismiss="toast" aria-label="Close">                                                            </button>' + 
'    </div>' + 
'</div>' ;
function displaySuccessToastNew(parentId){
var toast=successToast.replaceAll(/ParentId/g,parentId);
$('#'+parentId).append(toast);
$("#successToast"+parentId).toast("show");
}
function displaySuccessToastNew(parentId,successMessage){
var toast=successToastContent.replaceAll(/ParentId/g,parentId);
$('#'+parentId).append(toast);
$('#toastHeadContent').html(successMessage);
$("#successToast"+parentId).toast("show");
}

function displaySuccessToastDelete(parentId){
var toast=deleteToast.replaceAll(/ParentId/g,parentId);
$('#'+parentId).append(toast);
$("#successToast"+parentId).toast("show");
}