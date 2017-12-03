(function(){
  const $scanNetwork = $('.scan-network');
  const $showOnMap = $('.show-on-map');

  // TODO use networks.json to scan all available networks

  $scanNetwork.on('click', function(){
    $('.loading-indicator').removeClass('hidden');
    $.get({
      url: '/scan',
      success: function(xhrData){
        console.log(xhrData);
        $('.text-container').text(xhrData.data);
      },
      complete: function() {
        $('.loading-indicator').addClass('hidden');
      }
    });
  });

  $showOnMap.on('click', function() {
    $('#host-name1').css({backgroundColor: 'red'});
  });
}());
