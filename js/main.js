  var response;
  var dataObj;
  var init;
  var user;
  var userKey;
  var requestType;
  var intervalID = null;

(function ($) {$(document).ready(function() {

  console.log(document.location.hash);

  if (document.location.hash) {
    userKey = window.location.hash.substring(1);
    makeRequest(false, userKey);
  }


  $(document).on('submit', '#user-lookup-form', function(){
    // Prevent the form from submitting naturally.
    event.preventDefault();

    userKey = $('#user-lookup').val();

    makeRequest(true, userKey);


  });

  $(document).on('click', '#changeUser', function(){
    $('#user-lookup').val('');
    $('.song-info-container').hide();
    $('.user-lookup-container').show();
    clearInterval(intervalID);

  });

});})(jQuery);

function makeRequest(init, userKey) {

  if (init === false) {
    requestType = 'get';
    if (intervalID !== null) {
      clearInterval(intervalID);
    }
  } else {
    requestType = 'findUser';
  }

  dataObj = {
    user: userKey,
    type: requestType
  };

  $.support.cors = true;
  $.ajax({
      data: dataObj,
      dataType: 'json',
      type: 'POST',
      url: 'get-user.php',
      success: function (response) {
        console.log(response);
        if (response['status'] == '0' || response['status'] == '2') {
          printError('1', response);
        } else if (response['status'] == '1') {
          printSong(response);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        printError('2', dataObj);
      }
  });

}

function printSong(data) {
  $('.user-lookup-container').hide();
  $('.song-info-container').show();
  document.location.hash = data['userKey'];
  var permalink = document.location.href;
  // data['albumArt'] = data['albumArt'].replace('square-400.jpg', 'square-600.jpg');

  var nextCheck = data['nextCheck'];
  var paused = data['paused'];

  if (paused == 'true') {
    $('.alert-paused').show();
  } else {
    $('.alert-paused').hide();
  }

  $('.userInfo').html(data['displayName']);
  $('.nextCheck').html(nextCheck);
  $('.albumArt').html('<img src="' + data['albumArt'] + '">');
  $('.trackName').html(data['trackName']);
  $('.artistName').html(data['artistName']);
  $('.albumName').html(data['albumName']);

  console.log('Checking again in ' + nextCheck + ' seconds.');

  var nextCheckMs = nextCheck*1000;

  intervalID = setInterval(function() { makeRequest(false, data['userKey']); }, nextCheckMs);
}

function printError(code, data) {
  var message = 'There seems to have been an error, but we\'re not sure what went wrong. Try reloading the page';
  if (code == '1') {
    message = data['message'];
  } else if (code == '2') {
    message = 'There seems to be a network issue. Please try again later and cross your fingers.';
  }
  $('.alert-oops').html(message);
  $('.alert-oops').show();
  console.log(data);
}
