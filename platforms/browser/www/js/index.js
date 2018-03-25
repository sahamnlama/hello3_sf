function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

  // device APIs are available
  //
  function onDeviceReady() {
      document.getElementById("audioCapture").addEventListener("click", audioCapture);
      document.getElementById("playAudio").addEventListener("click", playAudio);

      cordova.plugins.notification.local.schedule({
          title: 'My first notification',
          text: 'Thats pretty easy...',
          foreground: true
      });

      $('#streamingBtn').click(function(){
          cordova.InAppBrowser.open('http://streaming360owl.herokuapp.com/streamint_req.html', '_self', 'location=no');
      });

      $('#voiceMsgBtn').click(function(){
        //window.location.replace('voice_msg.html');
        //window.location.href="https://signellingsvr360owl.herokuapp.com/voice_msg";
          cordova.InAppBrowser.open('https://signellingsvr360owl.herokuapp.com/voice_msg', '_self', 'location=no');
      });
  }


  function playAudio() {
      var myMedia = null;
      var src = "https://signellingsvr360owl.herokuapp.com/doorbell.mp3";

      if(myMedia === null) {
        myMedia = new Media(src, onSuccess, onError);

        function onSuccess() {
           console.log("playAudio Success");
        }

        function onError(error) {
           console.log("playAudio Error: " + error.code);
        }
     }
     myMedia.play();
  }


  function audioCapture() {
    var options = {
        limit: 1,
        duration: 10
    };
   navigator.device.capture.captureAudio(onSuccess, onError, options);

   function onSuccess(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
         path = mediaFiles[i].fullPath;
         console.log(mediaFiles);
      }
   }


   function onError(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
   }
}
