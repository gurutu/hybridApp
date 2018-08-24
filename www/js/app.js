// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'app.routes',
  'ngCordova', 'ionic-material',
  'ionicLazyLoad',
  'ui.bootstrap',
  'ngAnimate',
  'dateParser',
   'timer'
])

app.run(function ($ionicPlatform, $rootScope, utils, $cordovaPushV5, $http, pushNOtification) {
  //............................../*Main Properties*/
  utils.getMainProperties().then(function (resp) {
    $rootScope.version = resp.data.VERSION_NAME;
    $rootScope.MAINURL = resp.data.MAINURL_NAME;

    //Cashfree release end
  });





  $ionicPlatform.ready(function () {


    var notificationOpenedCallback = function (jsonData) { console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData)); };
    window.plugins.OneSignal
      .startInit("be2368d2-5845-40a7-b8c4-d626465ce258")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

    window.plugins.OneSignal.getIds(function (ids) {
      //alert(ids.userId);
      $rootScope.OneSignalToken = ids.userId;
      pushNOtification.saveTokenForPushNotification(ids.userId);
      /* alert(JSON.stringify(ids));
         alert(JSON.parse(ids)); */
      /*  $resolve(); $parameters.yourOutputParameter = ids.userId; */
    });


    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }


  });
});
