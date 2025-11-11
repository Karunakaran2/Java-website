const successTemplate = '' + 
'<div class="row align-middle"><div class="col-4">'+
'<div class="success-checkmark ">' + 
'		<div class="check-icon ">' + 
'			<span class="icon-line line-tip"></span> <span' + 
'				class="icon-line line-long"></span>' + 
'			<div class="icon-circle"></div>' + 
'			<div class="icon-fix"></div>' + 
'		</div>' + 
'</div>' +
'</div>'+
'<div class="col-8 pt-5">'+
'		<div id="successMsg" class="fw-bold text-success ">SUCCESS</div>'  +
'</div>' +
'</div>'

;
function loadSuccess(id,successMsg){
	if(successMsg==''){
		successMsg="SUCCESS";
	}
	$.when($('#'+id).html(successTemplate)).then($('#successMsg').html(successMsg));
}