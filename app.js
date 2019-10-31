$("#submit").on('click', function () {

    const location = $("#location").val();
    // console.log(location);

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&apikey=78c2217a0f8204684461043d3c5ef215`;
    $.ajax({
        url: url,
        method: "GET"
    }).done(function (response) {
        const rain1h = $(response)[0].rain['1h'];

        // Use your own token (this is just an example)
        var token = 'BQA6K9PdygF5EipwKMKk1sANSe-JMO-eqKkLPdW3e5vb4DKfMTgWvlPxqSBzOV6YM4t-wX71VgO2-411xXF4GgNacwgAFMNt5PV6eXT9r-J2sy97SboSX42hOt3paKsjMV9qNKRidafEG2bFxo83PXm0-5vCABXeG4XqUh718Wj_Ymk4FQ'

        $.ajax({
            url: 'https://api.spotify.com/v1/users/mfskibiel/playlists/',
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(function (oData) {
            const playlists = oData.items;
            for (playlist of playlists){
                console.log(playlist.name);
            }
        })


    });

});