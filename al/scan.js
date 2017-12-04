(function() {
    const $scanNetwork = $('.scan-network');
    const $hostToScan = $('.host-to-scan');

    $scanNetwork.on('click', function() {
        $('.text-container').text('');
        $('.loading-indicator').show();
        
        var urlStrs = '', urlParams= '';

        if ($hostToScan.val()){
          urlStr =  '/scan/' + $hostToScan.val();
          // urlParams = '?customHostname='+ $hostToScan.val();
          // urlStr = '/scan' + urlParams;
        } else {
          urlStr = '/scan';
        }

        $.get({
            url: urlStr,
            success: function(xhrData) {
                console.log(xhrData);
                $('.text-container').text(xhrData.data);
            },
            complete: function() {
                $('.loading-indicator').hide();
            }
        });
    });

}());
