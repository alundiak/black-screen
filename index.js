(function(){
	var $button = $('.scan-network');

	// TODO use networks.json to scan all available networks
	
	$button.on('click', function(){
		$.get({
			url: '/scan',
			success: function(xhrData){
				console.log(xhrData);
				$('.text-container').text(xhrData.data);
			}
		})
	});
}())