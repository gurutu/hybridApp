/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('AssignTaskController', []);

AppContoller
  .controller(
  "AssignTaskController",['$scope','$mdSidenav', '$state','$rootScope','stduentList','assignTaskToStudent','studentTask','$stateParams','store',
  function($scope,$mdSidenav,$state,$rootScope,stduentList,assignTaskToStudent,studentTask,$stateParams,store) {

      $scope.show="";
      $scope.goToBack = function(){
          $state.go('teacherDash',{"teacherId": store.get('userdata').id});
      };
      $rootScope.MAINURL="http://13.232.113.147:80/app/";
      $scope.studentListClass="";
      $scope.checkBoxValue=[];
      $scope.saveCheck=function(val){
      var flag=true;
      var count=0;
           angular.forEach($scope.checkBoxValue, function(checkBoxValue){
           if(checkBoxValue.studentId==val){
                 flag=false;
                 delete $scope.checkBoxValue[count];
               //  break;
           }
           count++;
        });
         var ref={"studentId":val};
            if(flag==true){
              $scope.checkBoxValue.push(ref);
            }
      }

      $scope.selectAll=function(){
       $scope.checkBoxValue=[];
          angular.forEach(  $scope.studentListClass, function(subValue){
          document.getElementById(subValue.id).checked = true;
           var ref={"studentId":subValue.id};
          $scope.checkBoxValue.push(ref);
          });
      }

          $scope.deselectCheckBox=function(){
                $scope.checkBoxValue=[];
                      angular.forEach(  $scope.studentListClass, function(subValue){
                         document.getElementById(subValue.id).checked = false;
                   });
          }



      $scope.sideNavAssignTask = function(taskCode){
        $scope.taskCode=taskCode;
        $mdSidenav('sideAssignTask').toggle()
        .then(function () {
          if($scope.taskCode!=undefined ){
            var request = {
              "classCode":$stateParams.paramValue
            };
            stduentList.studentListBasedOnClass(request).then(function(results) {
              if(results.status=="200") {
                $scope.studentListClass = results.data;
                console.log($scope.studentListClass);
              }
            });
          }

        });
      };


      $scope.cancelNavAssignTask = function(){
        $mdSidenav('sideAssignTask').close()
        .then(function () {
        });
      };

      $scope.init=function(){
      var request = {
          "classCode":$stateParams.paramValue
           };
      studentTask.studentALLTaskList(request).then(function(results) {
        if(results.status=="200") {
          console.log("=============Selected Class Task List================");
          console.log(results.data);
         $scope.TaskstudentListALL = results.data;
        }
     });
      }

      $scope.init();


      $scope.saveAssignTask = function(taskCode) {
          $scope.tasksCode=taskCode;

         var request = {
               "taskCode":$scope.tasksCode,
               	"teacherId":store.get('userdata').id,
               	"status":"assigned",
               	"students":$scope.checkBoxValue
            };

            assignTaskToStudent.assignTaskStudent(request).then(function(results) {
              if(results.status=="200") {
                console.log("=============Successfully Assign Task To Student================");
                console.log(results.data);
                console.log("Successfullly Add To student");
              }
            });
      };
  }]);
