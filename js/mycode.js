(function (){

		var hash  = window.location.hash;
		var param = decodeURIComponent(window.location.search);


		// test if the hash is not found
		if (hash == '')
		{
			var roomname = prompt('Please enter a room name:');

			if (roomname == null)
			{
				$('.allDivs').html('');
				alert('Room not found, or you shoud create once');
			}
			else
			{
				hash = '#'+roomname;
			}
		}
		

		if (hash != '' && hash != '#'){
			$('.allDivs').show();
			$('.videoChat').attr('href','?video=true'+hash);
			$('.audioChat').attr('href','?'+hash);

			//alert(param);
			if (param == '?video=true')
			{
				param = {video: true, audio: true};
			}
			else
			{
				param = {video: false, audio: true};
			}


			var webrtc = new SimpleWebRTC({
		    // the id/element dom element that will hold "our" video
		    localVideoEl: 'video',
		    // the id/element dom element that will hold remote videos
		    remoteVideosEl: 'remoteVideos',
		    // immediately ask for camera access
		    autoRequestMedia: true,
			media: param,
            log: true,
            debug: false,
            //detectSpeakingEvents: true,
            //autoAdjustMic: false,

			//receiveMedia: {offerToReceiveAudio: 0,  offerToReceiveVideo: 1},

			});



			webrtc.on('connectionReady', function (sessionId) {

				//webrtc.on('readyToCall', function () {

					$('.sessionId').html(hash);
					// join without waiting for media
					
					if (hash != '')
					{
						sessionId = hash;					

						// a peer video has been added
						webrtc.on('videoAdded', function (video, peer) {
						    console.log('video added', peer);
						    
						    var userStatus = '<span class="label label-success">Online<span>';
							$('#userStatus').html(userStatus);
						   	
						    var remotes = document.getElementById('remoteVideos');

						    if (remotes) {
						        var container = document.createElement('div');
						        container.className = 'videoContainer';
						        container.setAttribute('data-user', userType);
						        // $div.attr('data-user', streamUser.userType);
						        container.setAttribute('class', 'col-md-6 each-video'); 
						        container.id = 'container_' + webrtc.getDomId(peer);
						        container.appendChild(video);

						        remotes.appendChild(container);


						    }
						});

						// a peer video was removed
						webrtc.on('videoRemoved', function (video, peer) {
						   console.log('video removed ', peer);

						   var userStatus = '<span class="label label-default">Offline<span>';
							$('#userStatus').html(userStatus);
						   
						   var remotes = document.getElementById('remoteVideos');
						   var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
						   if (remotes && el) {
						       remotes.removeChild(el);
						   }
						});


						// when it's ready and we have a room from url, join the call
						webrtc.on('readyToCall', function(){
						    webrtc.joinRoom(hash);
						    var status = '<span class="label label-success">Online<span>';
							$('.status').html(status);
						});


						/*
						if(hash){
						    webrtc.createRoom(hash, function(err, name){
						            if(err){
						                console.log(err);
						            }
						        });
						}
						*/

						//var status = '<span class="label label-success">Online<span>';
						//var status = '';
						//$('.status').html(status);
					    

							/*
							var peer = webrtc.getPeers();
						    // show the ice connection state
						    if (peer) {

						        peer.pc.on('iceConnectionStateChange', function (event) {
						            switch (peer.pc.iceConnectionState) {
						            case 'checking':
						                status = 'Connecting to peer...';
						                break;
						            case 'connected':
						            case 'completed': // on caller side
						                status = 'Online';
						                break;
						            case 'disconnected':
						                status = 'Disconnected.';
						                break;
						            case 'failed':
						                break;
						            case 'closed':
						                status = 'Connection closed.';
						                break;
						            }
						        });
						    }
						    */
						    	
						/*
						webrtc.on('createdPeer', function (peer) {
						    console.log('createdPeer', peer);

						});
						*/
					}
					else
					{
						alert('Room not found, you shoud create once');
						$('.allDivs').html('');
					}

			
					/*
					// called when a peer is created
					webrtc.on('createdPeer', function (peer) {
					    console.log('createdPeer', peer);
					});
					*/


				//}); // end of onReadyToCall
			});

		} // end else
		
		// end call

		$('.endCall').click(function (){
			webrtc.stopLocalVideo();
			webrtc.mute();
			webrtc.leaveRoom();
			webrtc.connection.disconnect();
			$('.status').html('<span class="label label-default">Offline<span>');

		});
	


})();