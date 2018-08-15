/**
 * Created by evfandroid on 7/21/2018.
 */

var AppContoller = angular.module('adminAddToClassSubjectController', []);

AppContoller.controller(
  "adminAddToClassSubjectController", ['$scope', '$state', '$mdSidenav', 'addClassAndSubject', '$ionicPopup', '$http', '$rootScope', 'utils',
    function ($scope, $state, $mdSidenav, addClassAndSubject, $ionicPopup, $http, $rootScope, utils) {


      $scope.goToBack = function () {
        $state.go('admin');
      }


          $scope.addClassAndSubject = function () {

                var request = {
                  "class": this.class,            //"1 std",
                  "subject": this.subject,        //"English",
              }
              if(request.class != undefined &&  request.subject != undefined && request.class != "" &&  request.subject != "")  {
                  addClassAndSubject.adminAddClassAndSubject(request).then(function (result) {
                     if(results.status=="200") {
                       alert("Successfully Updated  Class and Subject");
                     }
                });
              }
              else {
                alert("Please Enter Class & Subject.");
              }
            }

      $scope.init = function () {
      }
      $scope.init();

    }]);
