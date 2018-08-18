'use strict';

/**
 * AreaController
 *
 * @constructor
 */

var AppContoller = angular.module('LoginController', []);

AppContoller
  .controller(
  "LoginController", ['$scope', '$state', 'login', 'store', 'pushNOtification', '$rootScope','NativeTost',
    function ($scope, $state, login, store, pushNOtification, $rootScope,NativeTost) {
      $scope.error = "";

      $scope.goto = function (data) {
        if (data.role == "admin") {
          $state.go('admin', {}, { reload: true });
        } else if (data.role == "student") {
          $state.go('studentDash', { "studentId": data.id }, {}, { reload: true });
        } else if (data.role == "teacher") {
          $state.go('teacherDash',{ "teacherId": data.id }, {}, { reload: true });
        } else {

        }
      }
      var data = store.get("userdata");
      if (data != null) {
        $scope.goto(data);
      }
      $scope.submit = function () {
        var request = {
          "email": $scope.emailId,
          "password": $scope.password
        };

        login.loginRequest(request).then(function (results) {

          var data = "";
          if (results.data.status != "error" && results.status == "200") {
            data = JSON.parse(results.data.user_data);
            store.set("userdata", data);
            pushNOtification.saveTokenForPushNotification($rootScope.OneSignalToken);
          } else {
           // $scope.error = results.data.error;
            NativeTost.showTost(results.data.error,'long','top');
          }

          if (results.status != "200") {
           // $scope.error = "EmailID and Password did not match";
            NativeTost.showTost('EmailID and Password did not match','long','top');
          } else if (data.role == "admin" || data.role == "superadmin") {

            $state.go('admin');
          } else if (data.role == "student") {
            $state.go('studentDash', { "studentId": data.id });
          } else if (data.role == "teacher") {
            $state.go('teacherDash', { "teacherId": data.id });
          } else {
           // $scope.error = "EmailID and Password did not match";
            NativeTost.showTost('EmailID and Password did not match','long','top');
          }
        });



      }
    }]);

