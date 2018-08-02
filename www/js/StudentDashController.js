/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('StudentDashController', []);

AppContoller
  .controller(
  "StudentDashController",['$scope','$mdSidenav','$stateParams','studentService','logoutUser','utils',
   function($scope,$mdSidenav,$stateParams,studentService,logoutUser,utils) {

    $scope.show="";
    $scope.studentData="";
    $scope.studentTaskData="";
    $scope.singleTaskData="";
    $scope.subjectData="";
    $scope.fileShow="";

      $scope.logoutUser=function(){
            logoutUser.userLogout();
       }


    var request={
    	"id":$stateParams.studentId
    }

    var requestTask={
    "studentId":$stateParams.studentId
    }

    $scope.showTask=function(){
         var requestfilter={
                 "studentId":$stateParams.studentId,
                	"subjectCode":this.subject,
                	"startDate":this.datevalue,
               	"endDate":this.datevalue
             }
               studentService.getTaskDetailByDateAndTime(requestfilter).then(function(result){
                             $scope.studentTaskData=result.data;
               })
      $scope.show=true;
    }

    $scope.isOpenRight = function(){
      $mdSidenav('right').toggle()
        .then(function () { });
    };

    $scope.cancel = function(){
      $mdSidenav('right').close()
        .then(function () {

        });
    };

    $scope.saveTaskStatus=function(status,id){
        var requestSta={
            "status":status,
            "id":id
        }
        studentService.saveTaskStatus(requestSta).then(function(result){
                        //  $scope.singleTaskData=result.data[0];
                        $scope.getTask();
         })

    }


      $scope.getTaskDetail=function(taskcode){
                var requeatTaskId={
                "taskCode":taskcode,
                "studentId":$stateParams.studentId
                }
                $scope.fileShow="";
             studentService.getTaskDetailById(requeatTaskId).then(function(result){
                  $scope.singleTaskData=result.data[0];
                  if($scope.singleTaskData.linkUrl!=null)
                 $scope.fileShow= utils.findfileExtention($scope.singleTaskData.linkUrl);
              })
      }



       $scope.getTask=function(){
             studentService.getAllStudentTask(requestTask).then(function(result){
                  $scope.studentTaskData=result.data;
           })
       }

     $scope.getSubject=function(){
     var requestSub={
                 "classCode":$scope.studentData.classCode
            }
         studentService.getAllSubject(requestSub).then(function(result){
                $scope.subjectData=result.data;
         })
     }

    $scope.init=function(){
         studentService.getStudentById(request).then(function(result){
            $scope.studentData=result.data[0];
            $scope.getSubject();
         })
    }

    $scope.init();
    $scope.getTask();

  }]);
