import * as clientHelpers from './al/client-helpers.js'

(function() {
    const $scanNetwork = $('.scan-network');
    const $showOnMap = $('.show-on-map');

    var fakeJsonArray = [];

    var fakeScanClickHandler = function() {
        $('.loading-indicator').show();
        $.get({
            url: '/fake',
            success: function(xhrData) {
                fakeJsonArray = xhrData;

                let ipsArr = xhrData.map(function(element) {
                    return element.ip
                });

                let ipsStr = ipsArr.join(', ');
                $('.text-container').text(ipsStr);

                $showOnMap.removeClass('disabled');
            },
            complete: function() {
                $('.loading-indicator').hide();
            }
        });
    };

    $scanNetwork.on('click', fakeScanClickHandler);

    var clickHandler = function() {
        // Variant 1 - Faking on Client side
        // fakeJsonArray = clientHelpers.createFakeJson()
        // variant 2 - Faking on Server side => fakeScanClickHandler()

        let randomNumbers = clientHelpers.createRandomNumbers();

        // temp hack
        $('.host-up').removeClass('host-up');
        $('.host-down').removeClass('host-down');
        // temp hack

        for (var i = 0; i < fakeJsonArray.length; i++) {
            let id1 = fakeJsonArray[i].id_1_parent_g;
            let id2 = fakeJsonArray[i].id_2_child_path_table;

            let cssSelector = `#${id1} #${id2}`;

            if (randomNumbers.indexOf(i) > -1){
              $(cssSelector).addClass('host-up');  
            } else {
              $(cssSelector).addClass('host-down');  
            }
        }
    };

    $showOnMap.on('click', clickHandler);
}());
