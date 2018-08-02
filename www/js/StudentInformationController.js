/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('StudentInformationController', []);

AppContoller
  .controller(
  "StudentInformationController",['$scope','$mdSidenav', '$state', '$rootScope', 'studentTask','student','store',
  function($scope,$mdSidenav,$state, $rootScope,studentTask,student,store) {

    $scope.show="";
     $scope.goToBack = function(){
        $state.go('teacherDash',{"teacherId": store.get('userdata').id});
      };

    $scope.sideNavStudentTaskInformation = function(id,name){
         $mdSidenav('sideStudentInformation').toggle()
           .then(function () {
               if($scope.studentListInformation!=undefined ){
                 $scope.name=name
                 var request = {
                 "studentId":id
                 };
               studentTask.studentListTaskBasedOnId(request).then(function(results) {
               if(results.status=="200") {
                  console.log("=============student All Task List================");
                  console.log(results.data);
                  $scope.taskList = results.data;
                  console.log(  $scope.taskList);
                  }
               });
               }

           });
       };

      $scope.cancelStudentInformation = function(){
          $mdSidenav('sideStudentInformation').close()
            .then(function () {

            });
        };

    $scope.init=function(){
     var request = {
              "role":"student"
            };
     student.studentList(request).then(function(results) {
        if(results.status=="200") {
        console.log("=============Selected Class Student List================");
        console.log(results.data);
        $scope.studentListInformation = results.data;

        }
     });
    }
    $scope.init();
  }]);
