(function() {
    const $advancedTrigger = $('#adnacedTrigger');
    const $advanced = $('.advanced');
    const $scanNetwork = $('.scan-network');
    const $showOnMap = $('.show-on-map');
    const $shutDownAll = $('.shut-down-all');
    let fakeJsonArray;
		const randomizedScannedIpsArray = [];
    const ipsArr = [];
    let ipsStr;

    $advancedTrigger.on('click', function(e){
      $advanced.toggleClass('hide');  
    });

		// mounting ids with ips onload
		$.get({
				url: '/fake',
				success: xhrData => {
            if (typeof xhrData === 'string'){ // use case of /fake NOT as endpoint but as file from /dist folder
              try {
                fakeJsonArray = JSON.parse(xhrData);
              }catch(e){
                console.log(e)
              }
            } else {
              fakeJsonArray = xhrData;
            }

						fakeJsonArray.forEach(pair => {
							let cssSelector = `#${pair.id_g} path`;
	            $(cssSelector).attr('data-ip', `${pair.ip}`);
							ipsArr.push(pair.ip);
						});
				}
		});

    const randomFakeScan = () => {
        $('.scan-network').addClass('loading');

				setTimeout(() => {
					randomizedScannedIpsArray.length = 0;
					const numberOdTries = Math.floor(Math.random()*60);
					const ipsArrLength = ipsArr.length;

					for (let i = 0; i < numberOdTries; i++) {
						randomizedScannedIpsArray.push(ipsArr[Math.floor(Math.random()*ipsArrLength)]);
					}

					ipsStr = randomizedScannedIpsArray.join(', ')
					$('.text-container').text(ipsStr);
          $('#textarea1').trigger('autoresize');
          $scanNetwork.removeClass('loading');
          $shutDownAll.removeClass('disabled');
					$showOnMap.removeClass('disabled');
        }, 1200);
    }

    $scanNetwork.on('click', randomFakeScan);

    const showOnMapClickHandler = () => {
        $('.host-up').removeClass('host-up');

				randomizedScannedIpsArray.forEach(ip => {
					let cssSelector = `[data-ip="${ip}"]`;
					$(cssSelector).addClass('host-up');
				});
    }

    $showOnMap.on('click', showOnMapClickHandler);

    const shutDownAllClickHandler = () => {
        $('.shut-down-all').addClass('loading');
        $scanNetwork.addClass('disabled');
        $showOnMap.addClass('disabled');

        setTimeout(() => {
          $('.text-container').text('');
          $('.host-up').removeClass('host-up');
					$('.shut-down-all').removeClass('loading');
          $scanNetwork.removeClass('disabled');
          $shutDownAll.addClass('disabled');
          $('#textarea1').trigger('autoresize');
        }, 2000);
    }

    $shutDownAll.on('click', shutDownAllClickHandler);

    $('.intro').delay(1500).toggle('clip'); // 1,5 sec before intro fadeout
}());
