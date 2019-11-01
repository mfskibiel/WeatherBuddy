// if hash exists
if (window.location.hash !== "") {

    const params = new URLSearchParams(window.location.hash.slice(1));

    const accessToken = params.get('access_token');

    // store hash in local storage

    localStorage.setItem("hash", accessToken);

    // get weather condition
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem("city")}&apikey=78c2217a0f8204684461043d3c5ef215`;

    $.ajax({
        url: url,
        method: "GET"
    }).done(function (response) {
        const weatherCondition = response.weather;
        for (condition of weatherCondition) {
            console.log(condition.main);
            if (condition.main === "Rain") {
                spotifyCall("Rain").then(function (link) {
                    console.log("It's Raining");
                    console.log(link);
                    renderLink(link, "Here's your rainy day playlist!");
                });
                break;
            } else if (condition.main === "Snow") {
                spotifyCall("Snow").then(function (link) {
                    console.log("It's snowing");
                    renderLink(link, "Brrrrrrrr, here's a playlist!");
                });
                break;
            } else if (condition.main === "Clear") {
                spotifyCall("Sunshine").then(function (link) {
                    console.log("Its Sunny");
                    renderLink(link, "It's a beautiful day! Enjoy this playlist!");
                });
                break;
            }
        }
    });

    function renderLink(link, linkname) {
        console.log("test");
        var newdiv = $("<div>").html(`<a href=${link}>${linkname}</a>`);
        $("body").append(newdiv);
    };


    $("#submit").on("click", function () {
        let location = $("#location").val();
        localStorage.setItem("city", location);
        console.log(localStorage.getItem("city"));
    });

    function spotifyCall(weatherName) {
        return $.ajax({
            url: 'https://api.spotify.com/v1/users/mfskibiel/playlists/',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("hash"),
            }
        }).then(function (oData) {
            const playlists = oData.items;
            for (playlist of playlists) {
                if (playlist.name === weatherName) {
                    //console.log(playlist.external_urls.spotify);     //displays playlist with the name of Rain
                    var playlistLink = playlist.external_urls.spotify;
                    console.log(playlistLink);
                    return playlistLink;
                }
            }
        });
    };
}