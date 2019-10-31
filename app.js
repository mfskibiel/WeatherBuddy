$("#submit").on('click', function () {

    const location = $("#location").val();
    // console.log(location);

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&apikey=78c2217a0f8204684461043d3c5ef215`;
    $.ajax({
        url: url,
    }).done(function(response) {
        console.log( $(response) );
      });

});