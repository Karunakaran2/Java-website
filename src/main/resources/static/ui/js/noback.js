window.history.forward();

$(document).on('load', 'body', function(event) {
	noBack();
});

$(document).on('pageshow', 'body', function(event) {
	if (event.persisted)
		noBack();
});
function noBack() {
	window.history.forward();
}