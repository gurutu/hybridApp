var AppContoller = angular.module('adminController', []);

AppContoller
  .controller(
  "adminController", ['$scope', '$state', 'logoutUser',
    function ($scope, $state, logoutUser) {



      $scope.logoutUser = function () {
        logoutUser.userLogout();
      }
      $scope.sendToMember = function () {
        $state.go('adminMember');
      }

      $scope.sendToTasks = function () {
        $state.go('adminTask');
      }
      $scope.addToClassSubject = function () {
        $state.go('addToClassSubject');
      }


    }]);
