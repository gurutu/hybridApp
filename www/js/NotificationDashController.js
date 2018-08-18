/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('NotificationDashController', []);

AppContoller
  .controller(
  "NotificationDashController", ['$scope', '$mdSidenav', 'store', '$state',
    function ($scope, $mdSidenav, store, $state) {

      $scope.show = "";

      $scope.goToBack = function () {
        $state.go('teacherDash', { "teacherId": store.get('userdata').id });
      };
      $scope.cancel = function () {
        $mdSidenav('right').close()
          .then(function () {

          });
      };
    }]);
