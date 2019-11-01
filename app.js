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
            if (condition.main === "Rain") {
                spotifyCall("Rain");
                console.log("Its raining");
                break;
            } else if (condition.main === "Snow") {
                spotifyCall("Snow");
                console.log("Its Snowing");
                break;
            } else if (condition.main === "Clear") {
                spotifyCall("Sunshine");
                console.log("Its Sunny");
                break;
            }
        }
    });

    //open weather api call


    // logic

    // spotify playlist api call


}

//         // Use your own token (this is just an example)
//         // var token = 'BQARmlbkIX-kN4Jy0UfAeH551a-eTwSAbS7-uIrnmSu_LRzEig0LExHGFQzcFSah_Sf2nTOna1oy76mTThIY8rDV6ST-OJXVjv3LE0PYdMT4Q-sfW1NthqaryTcLIRyxbfTZvGdbKnPVJiK1b4nGYcNrOJjqBsW2wQOfjBYSRO51Zb9dEw'

//         // $.ajax({
//         //     url: 'https://api.spotify.com/v1/users/mfskibiel/playlists/',
//         //     headers: {
//         //         Authorization: 'Bearer ' + token,
//         //     }
//         // }).then(function (oData) {
//         //     const playlists = oData.items;
//         //     if (rain.hasOwnProperty("1h")) {
//         //         console.log("has rain");
//         //         for (playlist of playlists) {
//         //             if (playlist.name === "Rain") {
//         //                 console.log(playlist.external_urls.spotify);     //displays playlist with the name of Rain
//         //                 var playlistLink = playlist.external_urls.spotify;
//         //                 renderLink(playlistLink);
//         //                 break;
//         //             }
//         //         }
//         //     }
//         // });





//     });

// });

function renderLink(link) {
    var newdiv = $("<div>").html(`<a href=${link}>Your Rainy Day Playlist</a>`);
    $("body").append(newdiv);
};


$("#submit").on("click", function () {
    let location = $("#location").val();
    localStorage.setItem("city", location);
    console.log(localStorage.getItem("city"));
});

function spotifyCall(condition) {

    $.ajax({
        url: 'https://api.spotify.com/v1/users/mfskibiel/playlists/',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("hash"),
        }
    }).then(function (oData) {
        const playlists = oData.items;
        for (playlist of playlists) {
            if (playlist.name === condition) {
                console.log(playlist.external_urls.spotify);     //displays playlist with the name of Rain
                var playlistLink = playlist.external_urls.spotify;
                renderLink(playlistLink);
                break;
            }
        }
    });
}