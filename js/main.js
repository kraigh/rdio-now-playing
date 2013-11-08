(function ($) {$(document).ready(function() {
  $(document).on('click', '.user-lookup-submit', function(){

    // $.ajax({
    //   type: "POST",
    //   url: url,
    //   data: data,
    //   success: success,
    //   dataType: dataType
    // });

    var key = "hveprm4bra5m4f36c7z5umkn";
    var oauth_signature = "7ZPxkvfSNm";
    var timestamp = (new Date()).getTime();
    var nonce = Math.random();
    var auth_header = 'OAuth oauth_nonce="' + nonce + '"' +
    ', oauth_signature_method="HMAC-SHA1"' +
    ', oauth_timestamp="' + timestamp + '"' +
    ', oauth_consumer_key="' + key + '"' +
    ', oauth_signature="' + oauth_signature + '"' +
    ', oauth_version="1.0"';

    var data = {
      extras: "lastSongPlayed",
      keys: "s14973872",
      method: "get"
    };
    $.support.cors = true;
    $.ajax({
        data: data,
        type: "POST",
        crossDomain:true,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "http://api.rdio.com/1/",
        beforeSend : function(xhr, settings) {
                  $.extend(settings, { headers : { "Authorization": auth_header } });
      },
        success: function (response) {
           console.log(response);
        },
        error: function () {
            alert("Network error");
        }
    });

  });

});})(jQuery);
