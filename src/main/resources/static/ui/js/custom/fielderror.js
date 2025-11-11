const fieldErrorTemplate = '<div id="alertMain" class="alert alert-warning alert-dismissible fade show d-none" role="alert">' +
		'<button type="button" class="btn btn-sm btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
		'<ul id="ful" class="mb-0" style="list-style-type: none;">' +

		'</ul>' +
		'</div>';
const fieldError = ' <li  >' +
		'<svg class="bi flex-shrink-0 me-2" width="15" height="15" role="img" aria-label="Warning:">' +
		'<use xlink:href="#exclamation-triangle-fill" /></svg>' +
		'replaceError</li>';
		
function displayFieldErrors(result) {
	let fe = result.fieldErrors;
	let fulContent = "";
	Object.keys(fe).forEach(key => {
		let customError = fieldError;
		customError = customError.replace(/replaceError/g, fe[key]);
		fulContent = fulContent + customError;
	});
	if(fulContent==''){
		fulContent="Somthing Went Wrong"
	}
	$('#fieldErrors').html(fieldErrorTemplate);
	$('#alertMain').removeClass('d-none');
				$('#ful').html(fulContent);
}
