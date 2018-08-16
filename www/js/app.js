// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('starter', ['ionic','app.routes',
  'ngCordova',  'ionic-material',
  'ionicLazyLoad',
  'ui.bootstrap',
  'ngAnimate',
  'dateParser'

])

app.run(function($ionicPlatform,$rootScope,utils,$cordovaPushV5) {
  //............................../*Main Properties*/
 utils.getMainProperties().then(function (resp) {
   $rootScope.version = resp.data.VERSION_NAME;
   $rootScope.MAINURL = resp.data.MAINURL_NAME;

   //Cashfree release end
   });





  $ionicPlatform.ready(function() {
    

    var options = {
      android: {
        senderID: "831699383142"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      },
      windows: {}
    };
    
    // initialize
    $cordovaPushV5.initialize(options).then(function() {
      // start listening for new notifications
      $cordovaPushV5.onNotification();
      // start listening for errors
      $cordovaPushV5.onError();
      
      // register to get registrationId
      $cordovaPushV5.register().then(function(registrationId) {
        console.log("My devise Id :---   " + window.device.uuid);
        console.log("registrationId_GcmId  =  " + registrationId);
        $rootScope.GcmId = registrationId;
        var currentPlatform = ionic.Platform.platform();
        $rootScope.DeviseName;
        console.log("My DEVIse iS----" + currentPlatform);
        if (currentPlatform === 'ios') {
            $rootScope.DeviseName = "User_ios";
        } else if (currentPlatform === 'android') {
            $rootScope.DeviseName = "User_android";
        }

        $rootScope.deviceId = window.device.uuid;
       // $rootScope.saveFcmId();
      })
    });
    
    // triggered every time notification received
    $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData
    });
  
    // triggered every time error occurs
    $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
      // e.message
    });
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) { 
      StatusBar.styleDefault();
    }


  });
});
