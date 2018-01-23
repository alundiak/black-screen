(function() {
    const $scanNetwork = $('.scan-network');
    const $hostToScan = $('.host-to-scan');

    $scanNetwork.on('click', function(e) {
        e.preventDefault(); // to avoid form submit
        $scanNetwork.addClass('loading'); //SemanticUI
        
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
                $('.text-container').text(xhrData.data);
            },
            complete: function() {
                $scanNetwork.removeClass('loading');
            }
        });

        // TODO rework/add a POST request /post which receives payload from ["1.2.34.5"] or ["1.2.34.5", "1.2.34.6"] etc.
    });

}());
