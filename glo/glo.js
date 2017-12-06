// https://pkit.globallogic.com/services/view/internal/57c41aa515701200095b3470
// HOW TO AUTH:﻿
// JSON-POST https://portal.globallogic.com/account/login with body {'username': 'username', 'password': 'password'}﻿﻿
// Store session information {'session_id': 'ENCRYPTED KEY'}﻿
// All request must have in HEADER csrftoken, and sessionid, csrftoken this is required for all POST, PUT, DELETE actions.

(function() {

    var clickHandler = function(e) {
        var url = "https://portal.globallogic.com/account/login";
        var bodyData = {
            username: "Andrii.Lundiak",
            password: "..."
        };

        $.ajax({
            method: 'post',
            url: url,
            data: bodyData,
            crossDomain: true,
            // jsonp: false,
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
            // username: "Andrii.Lundiak",
            // password: "...",
            // xhrFields: {
            //     withCredentials: true
            // }
        }).then(function(a, b, c) {
            console.log(a, b, c);
        })

        // var options = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: bodyData
        // };

        // fetch(url, options)
        //     .then(response => {
        //         if (response.ok) {
        //             return response.json();
        //         } else {
        //             return 'ERROR';
        //         }
        //     })
        //     .then(data => {
        //         console.log(data);
        //         if (data.error) {

        //         } else {

        //         }
        //         return data;
        //     });
    }

    $('.get-places').on('click', clickHandler)

}())
