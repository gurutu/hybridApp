/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('TeacherDashController', []);

AppContoller
  .controller(
  "TeacherDashController",['$scope','$mdSidenav', '$state', 'student', '$rootScope', 'allClass', 'studentTask','logoutUser','studentService','$stateParams',
  function($scope,$mdSidenav, $state, student, $rootScope, allClass,studentTask,logoutUser,studentService,$stateParams) {

   $scope.show=true;
    $scope.teacherData="";

    $scope.studentInformation = function(){
         $state.go('studentInfor');
    };

      $scope.logoutUser=function(){
        logoutUser.userLogout();
      }


   $scope.showAllClass = function(){
         $scope.classSel= this.myClass;
         if($scope.classSel != undefined){
           var checkClass=$scope.classSel
           if(checkClass.includes("CL"))
           $scope.show=true;
         }
    };

    $scope.assignTask = function(){
       $state.go('assignTaskUrl',{"paramValue":$scope.classSel});
    };


    $scope.performance = function(){
       $state.go('performance',{"classSel":$scope.classSel});
    };

    $scope.notification = function(){
       $state.go('notification');
    };
     $scope.sendToTasks = function () {
        $state.go('adminTask');
     }

     $scope.cancel = function(){
      $mdSidenav('right').close()
        .then(function () {

        });
    };

    $scope.init=function(){
      var request = {
            };
             allClass.allClassList(request).then(function(results) {
                if(results.status=="200") {
                console.log("=============All Class================");
                console.log(results.data);
                $scope.classList = results.data;
                }
             });
             var requestVal={
             "id":$stateParams.teacherId
             };
             studentService.getStudentById(requestVal).then(function(result){
               $scope.teacherData=result.data[0];
             });

    }
    $scope.init();
  }]);
