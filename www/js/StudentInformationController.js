/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('StudentInformationController', []);

AppContoller
  .controller(
  "StudentInformationController",['$scope','$mdSidenav', '$state', '$rootScope', 'studentTask','student','store',
  function($scope,$mdSidenav,$state, $rootScope,studentTask,student,store) {

    $scope.filterValue="";

    $scope.show="";
     $scope.goToBack = function(){
        $state.go('teacherDash',{"teacherId": store.get('userdata').id});
      };

      $scope.filter=function(val){
        $scope.filterValue=val;
      }  
      
    $scope.sideNavStudentTaskInformation = function(id,name){
         $mdSidenav('sideStudentInformation').toggle()
           .then(function () {
               if($scope.studentListInformation!=undefined ){
                 $scope.name=name;
                 $scope.studentId=id;
                 $scope.teacherId=store.get('userdata').id;
                /* var request = {
                 "studentId":id,
                 "teacherId":store.get('userdata').id
                 };*/
               }

           });
       };

      $scope.cancelStudentInformation = function(){
          $mdSidenav('sideStudentInformation').close()
            .then(function () {

            });
        };
        $scope.getStudentTaskList = function(){
        if(this.datevalue!=undefined || this.datevalue !=null ){
         var request = {
           "date": this.datevalue,//"2018-07-22 10:00:00",
           "teacherId": store.get('userdata').id,
           "studentId":$scope.studentId
         }
           studentTask.studentListTaskBasedOnId(request).then(function(results) {
            if(results.status=="200") {
               console.log("=============student All Task List================");
               console.log(results.data);
               $scope.taskList = results.data;
               console.log(  $scope.taskList);
               }
            });
         }else{
               alert("Please Select Date ")
         }
        };

    $scope.init=function(){
    $scope.dateStyle={
            "width": $scope.widthvalue-"1"+"px",
    }
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
    $scope.widthvalue = document.getElementById("getwidth").offsetWidth;
    //document.getElementById("datestudent").style.width=screen.width-"24"+"px";
    $scope.dateStyle={
      "width":$scope.widthvalue -"9"+"px"
    }
  }]);
