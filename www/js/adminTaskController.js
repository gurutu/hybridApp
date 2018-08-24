/**
 * Created by evfandroid on 7/21/2018.
 */

var AppContoller = angular.module('adminTaskController', []);

AppContoller
  .controller(
  "adminTaskController", ['$scope', '$state', '$mdSidenav', 'adminservice', '$ionicPopup', '$http', '$rootScope', 'utils', 'store',
    function ($scope, $state, $mdSidenav, adminservice, $ionicPopup, $http, $rootScope, utils, store) {
      $scope.tasksData = "";
      $scope.imagePathS3 = "";
      $scope.subjectData = "";
      $scope.classData = "";
      $scope.voiceFileS3 = "";
      $scope.showVoicetag = false;




      $scope.goToBack = function () {
        $state.go('teacherDash', { "teacherId": store.get('userdata').id });
      }
      $scope.isOpenRightAddTask = function () {
        $mdSidenav('rightadminTask').toggle()
          .then(function () {
            $scope.widthvalue = document.getElementById("getwidth").offsetWidth;
            $scope.dateStyle = {
              "width": $scope.widthvalue - "11" + "px",
            }

          });
      };

      $scope.cancelAddTask = function () {
        $mdSidenav('rightadminTask').close()
          .then(function () {

          });
      };

      $scope.saveTaskInformation = function () {
        if ($scope.imagePathS3 != "") {
          var request = {
            "taskTitle": this.title,//"English HW",
            "taskDescription": this.discription,//"Fill in the blanks chapter 1",
            "schoolCode": "SC1",
            //"classCode": this.class,//"CC1",
            "subjectCode": this.subject,//"ENG",
            "sequence": "1",
            "date": this.startdays,//"2018-07-22 10:00:00",
            "duration": this.duration,//"2018-07-22 12:00:00"
            "linkUrl": $scope.imagePathS3[0],
            "voiceNoteUrl": $scope.voiceFileS3[0],
            "teacherId": store.get('userdata').id
          }
          adminservice.saveTaskInfo(request).then(function (result) {


            $scope.cancelAddTask();
            $scope.init();
            $scope.imagePathS3 = "";


          })
        } else {
          alert("Please Upload File Than Submit.");
        }

      }

      // A confirm dialog
      $scope.showConfirm = function (taskcode) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Confirmation',
          template: 'Are you sure you want to delete task?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            console.log('You are sure');
            $scope.deleteTask(taskcode);
          } else {
            console.log('You are not sure');
          }
        });
      };

      $scope.deleteTask = function (taskCode) {
        var request = {
          "taskCode": taskCode
        }
        adminservice.deleteTaskInfo(request).then(function (result) {
          $scope.init();
        })
      }

      $scope.uploadFile = function () {
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
            alert("File Successfully Uploaded.");
            $scope.imagePathS3 = d;
          })
          .error(function () {
          });
      }
      /* For Voice File Upload  */
      $scope.uploadVoiceFile = function () {
        var formData = new FormData();
        var f = document.getElementById('filevoice').files[0];
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
            alert("Voice File Uploaded Successfully .");
            $scope.voiceFileS3 = d;
          })
          .error(function () {
          });
      }




      $scope.init = function () {

        adminservice.showAllTasks().then(function (result) {
          $scope.tasksData = result.data;

          console.log("@@@@@@@@@@@@@ tasksData  @@@@@@@@@@@@@@");
          console.log($scope.tasksData);
        })
      }

      $scope.getSubjectAndClass = function () {
        adminservice.getSubjectAndClass().then(function (result) {
         // var dataAll = utils.getClassSubject(result.data);
         $scope.subjectData = result.data;
         // $scope.classData = dataAll[1];
        })
      }


      $scope.init();
      $scope.getSubjectAndClass();


    }]);
