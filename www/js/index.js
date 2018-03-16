/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var myMedia = null;
        app.receivedEvent('deviceready');
        alert('ready');
//        alert(Media);
alert(navigator.getUserMedia);

document.getElementById("audioCapture").addEventListener("click", audioCapture);
document.getElementById("playAudio").addEventListener("click", playAudio);

        cordova.plugins.notification.local.schedule({
            title: 'My first notification',
            text: 'Thats pretty easy...',
            foreground: true
      });

      navigator.getUserMedia = navigator.getUserMedia ||
                               navigator.webkitGetUserMedia ||
                               navigator.mozGetUserMedia;

      if (navigator.getUserMedia) {
         navigator.getUserMedia({ audio: true, video: false },
            function(stream) {
               var video = document.querySelector('video');
               video.srcObject = stream;
               video.onloadedmetadata = function(e) {
                 video.play();
               };
            },
            function(err) {
               console.log("The following error occurred: " + err.name);
               alert(err);
            }
         );
      } else {
         console.log("getUserMedia not supported");
         alert("getUserMedia not supported");
      }


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }


};


function playAudio() {
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
