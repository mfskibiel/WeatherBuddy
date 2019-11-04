
const imageArr = ["images/clouds.jpg", "images/rainybackground.jpg", "images/sunnybackground.jpg", "images/snowybackground.jpeg", "images/storms.jpg"]

let i = 1;

setInterval(function () {
    $('body')
        // .fadeOut(1000)
        .css('background-image', `url('${imageArr[i]}')`)
    // .fadeIn(1000)
    // .end();

    i++
    if (i >= imageArr.length) {
        i = 0;
    }
}, 3000);

// if hash exists
if (window.location.hash !== "") {

    const params = new URLSearchParams(window.location.hash.slice(1));

    const accessToken = params.get('access_token');

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

                    renderLink(link, "Here's your rainy day playlist!");
                });
                break;
            } else if (condition.main === "Snow") {
                spotifyCall("Snow").then(function (link) {
                    renderLink(link, "Brrrrrrrr, here's a playlist!");
                });
                break;
            } else if (condition.main === "Clear") {
                spotifyCall("Sunshine").then(function (link) {
                    renderLink(link, "It's a beautiful day! Enjoy this playlist!");
                });
                break;
            } else if (condition.main === "Clouds") {
                spotifyCall("Clouds").then(function (link) {
                    renderLink(link, "It's a cloudy day!");
                });
                break;
            } else {
                spotifyCall("Default").then(function (link) {
                    renderLink(link, "Enjoy the Playlist!");
                });
                break;
            }
        };

    });

    function renderLink(link, linkname) {
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
                    var playlistLink = playlist.external_urls.spotify;
                    return playlistLink;
                }
            }
        });
    };
}