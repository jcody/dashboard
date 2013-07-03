// UNUSED IN CURRENT IMPLEMENTATION

var clientId = '949723456500-hr3io126hgico9o1mpvnppd711gfsdqp.apps.googleusercontent.com';
var apiKey = 'AIzaSyCJVSZmJJh3nfXPSNeuSpLySqqGlJ4kK0A';
var scopes = 'https://spreadsheets.google.com/feeds';

function handleClientLoad() {
  console.log('inside handleClientLoad function');
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
	console.log('inside checkAuth function');
	gapi.auth.authorize({'client_id': clientId, 'scope': scopes, 'immediate': false}, handleAuthResult);
	console.log('out of checkAuth');
}

function handleAuthResult(authResult) {
	console.log('inside handleAuthResult');
	console.log(authResult);
	console.log(authResult.error);

  var authButton = document.getElementById('authorize-button');
  authButton.style.display = 'none';

  if (authResult && !authResult.error) {
    // Access token has been successfully retrieved, requests can be sent to the API.
		console.log('all things are a go houston');
		console.log(authResult);
		loadClient();

	}	else {
    // No access token could be retrieved, show the button to start the authorization flow.
		console.log('houston, we have a problem');
    authButton.style.display = 'block';
    authButton.onclick = function() {
      gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
		}
	}
}

function loadClient() {
  console.log('inside loadClient function');

	var token = gapi.auth.getToken().access_token;
	urlLocation = "0ArD6i8OpqRMQdHNCRWxTMnR4WGN5YmE3TkZnQWFKbnc";
	var url = 'https://spreadsheets.google.com/feeds/list/' + urlLocation + '/od6/private/full?alt=json-in-script&access_token=' + token + '&callback=?';

	$.getJSON(url, function(data) {
	    console.log(data);
	});
}