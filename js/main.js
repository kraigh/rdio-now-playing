(function ($) {$(document).ready(function() {
  $(document).on('click', '.user-lookup-submit', function(){

    // $.ajax({
    //   type: "POST",
    //   url: url,
    //   data: data,
    //   success: success,
    //   dataType: dataType
    // });

    var response;

    var data = {
      extras: "lastSongPlayed",
      keys: "s14973872",
      method: "get"
    };
    $.support.cors = true;
    $.ajax({
        data: data,
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        url: "get-user.php",
        success: function (response) {
          console.log(response);
        },
        error: function () {
          console.log(response);
          alert("Error!");
        }
    });

  });

});})(jQuery);
