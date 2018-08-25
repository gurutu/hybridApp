/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('TeacherDashController', []);

AppContoller
  .controller(
  "TeacherDashController",['$scope','$mdSidenav', '$state', 'student', '$rootScope', 
  'allClass', 'studentTask','logoutUser','studentService','$stateParams','studentService','$http','$mdSidenav',
  function($scope,$mdSidenav, $state, student, $rootScope, allClass,studentTask,
    logoutUser,studentService,$stateParams,studentService,$http,$mdSidenav) {

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

    $scope.isOpenRightProblem = function () {
      //$state.go("substudentdash",{StudentId:"4",ClassCode:"Hello"});
       $mdSidenav('rightTaskProblem').toggle()
        .then(function () {
         
         }); 
    };
    $scope.cancelProblem = function () {
      $mdSidenav('rightTaskProblem').close()
        .then(function () {
        });
    };

    $scope.fileUpload=function(){
      var request={
        "profileUrl":$scope.imagePathS3,
        "id":$stateParams.teacherId
      }
      studentService.saveFileInDB(request).then(function(result){
        alert("File Successfully Uploaded.It will take time to update");
        $scope.cancelProblem();
        $scope.init();
       
      })
    }

    $scope.uploadPhotoFile = function () {
      var formData = new FormData();
      var f = document.getElementById('file').files[0];
      formData.append("document", f);
      var request = {
        method: 'POST',
        url: $rootScope.MAINURL + 'upload/file',
        data: formData,
        headers: {
          'Content-Type': undefined
        }
      };
      // SEND THE FILES.
      $http(request)
        .success(function (d) {
         
          $scope.imagePathS3 = d[0];
          $scope.fileUpload();
        })
        .error(function () {
        });
    }


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
