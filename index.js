(function() {
    const $scanNetwork = $('.scan-network');
    const $showOnMap = $('.show-on-map');
    const $shutDownAll = $('.shut-down-all');
    let fakeJsonArray;

    const fakeScanClickHandler = () => {
        $('.loading-indicator').show();
        $.get({
            url: '/fake',
            success: xhrData => {
                fakeJsonArray = xhrData;

                let ipsArr = xhrData.map(element => element.ip);
                let ipsStr = ipsArr.join(', ');

                $('.text-container').text(ipsStr);

                if (fakeJsonArray && fakeJsonArray.length) {
                  $showOnMap.removeClass('disabled');
                  $shutDownAll.removeClass('disabled');
                }
            },
            complete: () => {
                $('.loading-indicator').hide();
            }
        });
    }

    $scanNetwork.on('click', fakeScanClickHandler);

    const showOnMapClickHandler = () => {
        $('.host-up').removeClass('host-up');

        for (let i = 0; i < fakeJsonArray.length; i++) {
            let id1 = fakeJsonArray[i].id_1_parent_g_real;
            let cssSelector = `#${id1} path`;
            $(cssSelector).addClass('host-up');
        }
    }

    $showOnMap.on('click', showOnMapClickHandler);

    const shutDownAllClickHandler = () => {
        $('.loading-indicator.shut-down').show();
        $scanNetwork.addClass('disabled');
        $showOnMap.addClass('disabled');

        setTimeout(() => {
          $('.text-container').text('');
          $('.host-up').removeClass('host-up');
          $('.loading-indicator.shut-down').hide();
          $scanNetwork.removeClass('disabled');
          $shutDownAll.addClass('disabled');
        }, 2000);
    }

    $shutDownAll.on('click', shutDownAllClickHandler);


    $( ".intro" ).delay(1500).toggle( "clip" ); // 1,5 sec before intro fadeout


}());
