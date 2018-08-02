/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('PerformanceDashController', []);

AppContoller
  .controller(
  "PerformanceDashController",['$scope','$mdSidenav', '$state',
'$rootScope','$stateParams','studentTask','performnanceList','store',
   function($scope,$mdSidenav,$state,$rootScope,$stateParams,studentTask,performnanceList,store)
{

    $scope.show="";

   console.log($stateParams);
     $scope.goToBack = function(){
        $state.go('teacherDash',{"teacherId": store.get('userdata').id});
     };
      $scope.sideNavAssignTask = function(taskCode){
           $mdSidenav('sideAssignTask').toggle()
             .then(function () {
                var request = {
                      "taskCode":taskCode,
                       "teacherId":store.get('userdata').id
                       };

performnanceList.performnanceListStudent(request).then(function(results)
{
                    if(results.status=="200") {
                      console.log("=============Selected Class TaskList================");
                      console.log(results.data);
                     $scope.studentListOfPer = results.data;
                    }
                 });
             });
         };


       $scope.cancelNavAssignTask = function(){
         $mdSidenav('sideAssignTask').close()
           .then(function () {

           });
       };
       $scope.filterByStatus = function(tasklist){
         $mdSidenav('filterByStatus').toggle()
           .then(function () {
           var uniqueNames = [];
            $.each(tasklist, function(i, el){
                if($.inArray(el.status, uniqueNames) === -1)
uniqueNames.push(el.status);
            });
              console.log("=============Unique status================");
              console.log(uniqueNames);
              $scope.uniqueStatus=uniqueNames;
           });
       };

        $scope.init=function(){
            var request = {
                "classCode":$stateParams.classSel
                 };
            studentTask.studentALLTaskList(request).then(function(results) {
              if(results.status=="200") {
                console.log("=============Selected Class TaskList================");
                console.log(results.data);
               $scope.performanceTaskList = results.data;
              }
           });
         }
         $scope.init();
  }]);
