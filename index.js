(function() {
    const $advancedTrigger = $('#adnacedTrigger');
    const $advanced = $('.advanced');
    const $scanNetwork = $('.scan-network');
    const $showOnMap = $('.show-on-map');
    const $shutDownAll = $('.shut-down-all');
    const $hostToScan = $('#hostToScan');
    const randomizedScannedIpsArray = [];
    const ipsArr = [];
    const whiteSpacesRegExp = /\s/g
    let fakeJsonArray;
    let liveJsonArray = [];
    var useLiveScan = false;
    var advancedFeatureEnabled = false;

    const appendIpAddresses = (pair) => {
        let cssSelector = `#${pair.id_g} path`;
        $(cssSelector).attr('data-ip', `${pair.ip}`);
        ipsArr.push(pair.ip);
    }

    // TODO, this is just simple loop, and in theory can by error "index out of array"
    const fakeAppendOfIpAddresses = (ipsFromScanArray) => {
        $('[id*=krk-table--] path').each(function(index) {
            try {
                $(this).attr('data-ip', ipsFromScanArray[index]);
            } catch (e) {
                console.log(e);
            }
        })
    }

    // mounting ids with ips onload
    $.get({
        url: '/fake',
        success: xhrData => {
            if (typeof xhrData === 'string') { // use case of /fake NOT as endpoint but as file from /dist folder
                try {
                    fakeJsonArray = JSON.parse(xhrData);
                } catch (e) {
                    console.log(e)
                }
            } else {
                fakeJsonArray = xhrData;
            }

            fakeJsonArray.forEach(appendIpAddresses);
        }
    });

    $advancedTrigger.on('click', function(e) {
        advancedFeatureEnabled = !advancedFeatureEnabled;

        $advanced.toggleClass('hide');
        $hostToScan.val('');
    });

    const randomFakeScan = () => {
        setTimeout(() => {
            randomizedScannedIpsArray.length = 0;
            const numberOdTries = Math.floor(Math.random() * 60);
            const ipsArrLength = ipsArr.length;

            for (let i = 0; i < numberOdTries; i++) {
                randomizedScannedIpsArray.push(ipsArr[Math.floor(Math.random() * ipsArrLength)]);
            }

            let ipsStr = randomizedScannedIpsArray.join(', ')
            $('.text-container').text(ipsStr);
            $('#textarea1').trigger('autoresize');
            $scanNetwork.removeClass('loading');
            $shutDownAll.removeClass('disabled');
            $showOnMap.removeClass('disabled');
        }, 1200);
    }

    const successScanHandler = (xhrData) => {
        if (!xhrData.data) {
            $('.text-container').text("no hosts found");
        } else {
            liveJsonArray = xhrData.data.split(', ');
            fakeAppendOfIpAddresses(liveJsonArray);
            $('.text-container').text(xhrData.data);
            $('#textarea1').trigger('autoresize');

            $shutDownAll.removeClass('disabled');
            $showOnMap.removeClass('disabled');
        }

        $scanNetwork.removeClass('loading');
    }

    const completeScanHandler = () => {
        $scanNetwork.removeClass('loading');
    }

    $scanNetwork.on('click', function() {
        let fileUpload = false;
        let ipValue = $hostToScan.val()
            .replace(whiteSpacesRegExp, '')
            .replace('..', '.')
            .replace(',,', ',');

        $('.scan-network').addClass('loading');
        $('.text-container').text('');

        if (advancedFeatureEnabled) {
            useLiveScan = true;

            if (ipValue) {
                $.get({
                    url: '/scan/' + ipValue, // will scan network with custom, provided info (single or comma-separated)
                    success: successScanHandler,
                    complete: completeScanHandler
                });
            } else if (fileUpload) {
                // TODO
            } else { // just clicked checkbox
                $.get({
                    url: '/scan', // will scan network and return NMAP parsed output
                    success: successScanHandler,
                    complete: completeScanHandler
                });
                // TODO these conditions must be reworked in better way.
            }

        } else {
            randomFakeScan();
        }
    });

    const showOnMapClickHandler = () => {
        $('.host-up').removeClass('host-up');

        let arrayOfIpAddresses = useLiveScan ? liveJsonArray : randomizedScannedIpsArray;

        arrayOfIpAddresses.forEach(ip => {
            let cssSelector = `[data-ip="${ip}"]`;
            $(cssSelector).addClass('host-up');
        });
    }

    $showOnMap.on('click', showOnMapClickHandler);

    const shutDownAllClickHandler = () => {
        $('.shut-down-all').addClass('loading');
        $scanNetwork.addClass('disabled');
        $showOnMap.addClass('disabled');

        $('.host-up').removeClass('host-up').addClass('host-shutting-down');

        setTimeout(() => {
            $('.text-container').text('');
            $('.host-shutting-down').removeClass('host-shutting-down');
            $('.shut-down-all').removeClass('loading');
            $scanNetwork.removeClass('disabled');
            $shutDownAll.addClass('disabled');
            $('#textarea1').trigger('autoresize');
        }, 2000);
    }

    $shutDownAll.on('click', shutDownAllClickHandler);

    $('.intro').delay(1500).toggle('clip'); // 1,5 sec before intro fadeout
}());
