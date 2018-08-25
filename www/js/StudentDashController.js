/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('StudentDashController', []);

AppContoller
  .controller(
  "StudentDashController", ['$scope', '$mdSidenav', '$stateParams', 'studentService', 'logoutUser', 'utils',
    'store', 'Util2', '$interval', '$ionicPopup','NativeTost','$rootScope','$state','$filter','$http',
    function ($scope, $mdSidenav, $stateParams, studentService, logoutUser, utils, store, Util2, $interval,
      $ionicPopup,NativeTost,$rootScope,$state,$filter,$http) {

      $scope.show = "";
      $scope.studentData = "";
      $scope.studentTaskData = "";
      $scope.singleTaskData = "";
      $scope.subjectData = "";
      $scope.fileShow = "";
      $scope.datealert = "";
      $scope.studentSingleTaskData = "";
      $scope.saveDateValue = "";
      $scope.subjectCodeValue = "";
      $scope.taskStartTime = "";
      $scope.currentDateTime = new Date();
      $scope.coundownValue = "";
      var interval;
      var voice;
      var myVideo;
      $scope.imagePathS3="";


     
      $scope.widthvalue = document.getElementById("getwidth").offsetWidth;
      //document.getElementById("datestudent").style.width=screen.width-"24"+"px";
      $scope.dateStyle={
        "width": $scope.widthvalue-"9"+"px",
      }
      $scope.logoutUser = function () {
        logoutUser.userLogout();
      }

      $scope.stopVideoVoice=function(){
        try {
          myVideo.pause();
          voice.pause();
        } catch (error) {
        }
        
      }

      var request = {
        "id": $stateParams.studentId
      }

      var requestTask = {
        "studentId": $stateParams.studentId
      }

      $scope.showTask = function () {
        if (this.datevalue == undefined) {
          NativeTost.showTost('Please Select Date','long','top');
         // $scope.datealert = "Please Select Date";
          return true;
        } else {
          $scope.saveDateValue = this.datevalue;
          $scope.datealert = "";
        }

        var requestFilter = {
          "classCode": store.get('userdata').classCode,
          "studentId": $stateParams.studentId,
          "startDate": this.datevalue,
          "endDate": this.datevalue
        }
        studentService.getUniqueSubjects(requestFilter).then(function (result) {
          $scope.studentTaskData = result.data;
          if(result.data.length==undefined)
          NativeTost.showTost('Please Select Date','long','top');
        })

        $scope.show = true;
      }
      $scope.getAllTaskBasedOnSubject = function (val) {
        $scope.subjectCodeValue = val;
        var requestfilter = {
          "studentId": $stateParams.studentId,
          "subjectCode": val,
          "startDate": $scope.saveDateValue,
          "endDate": $scope.saveDateValue
        }
        studentService.getTaskDetailByDateAndTime(requestfilter).then(function (result) {
          $scope.studentSingleTaskData = [];
          $scope.studentSingleTaskData = result.data;
        })
      }

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
      $scope.isOpenRight = function () {
        $mdSidenav('rightMain').toggle()
          .then(function () { });
      };

      $scope.cancel = function () {
        $scope.stopVideoVoice();
        $mdSidenav('rightMain').close()
          .then(function () {
          });
      };

      $scope.saveTaskStatus = function (status, id, sDate, eDate) {
        if (status == 'completed') {
          eDate = new Date();
          $scope.stopVideoVoice();
        }
        var requestSta = {
          "status": status,
          "id": $rootScope.saveTaskId,
          "taskStartTime": sDate,
          "taskEndTime": eDate
        }
        $scope.taskStartTime = sDate;
        studentService.saveTaskStatus(requestSta).then(function (result) {
          // $scope.singleTaskData=result.data[0];
          // $scope.getTask();
          $scope.getAllTaskBasedOnSubject($scope.subjectCodeValue);
        })

      }


      $scope.getTaskDetail = function (taskcode) {
        var requeatTaskId = {
          "taskCode": taskcode,
          "studentId": $stateParams.studentId
        }
        $scope.fileShow = "";
        studentService.getTaskDetailById(requeatTaskId).then(function (result) {
          $scope.singleTaskData = result.data[0];
          $scope.getTheInterval($scope.singleTaskData.endDate);
          if($scope.singleTaskData.voiceNoteUrl!=null){
            voice=document.getElementsByTagName('audio')[1];
            voice.src=$scope.singleTaskData.voiceNoteUrl;
            voice.load();
          }
          if ($scope.singleTaskData.linkUrl != null) {
            $scope.fileShow = utils.findfileExtention($scope.singleTaskData.linkUrl);
             
            if ($scope.fileShow == 'video') {
              myVideo = document.getElementsByTagName('video')[0];
            } else if ($scope.fileShow == 'audio') {
              myVideo = document.getElementsByTagName('audio')[0];
            } else if ($scope.fileShow == 'pdf') {
              myVideo = document.getElementsByTagName('object')[0];
              var d1 = document.getElementById('PDFVIEW');
              d1.insertAdjacentHTML('beforeend', '<embed src="' + $scope.singleTaskData.linkUrl + '" style="width:100%;" height="500"  alt="pdf" pluginspage="http://www.adobe.com/products/acrobat/readstep2.html">');
            }
            if ($scope.fileShow != 'image' && $scope.fileShow != 'pdf') {
              myVideo.src = $scope.singleTaskData.linkUrl;
             
              myVideo.load();
             // myVideo.play();
            }

          }

        })
      }
      // Timer value Add By Pranav 
      $scope.getTheInterval = function (endDate) {
        $scope.flagFirst=" ";
        var future = new Date(endDate);
        if(future.getTime()>new Date().getTime()){
        interval = $interval(function () {
          var diff = Math.floor(future.getTime() - new Date().getTime()) / 1000;
          val = Util2.dhms(diff);
          $scope.checkTimer(val);
            $scope.coundownValue = val;
        }, 1000);
      }else{
        //alert("This test is expired");
      }
      }
     //Make funtion 
     $scope.checkTimer=function(param){
      if(val.split(" ")[0]=="0d"&&val.split(" ")[1]=="0h"&&val.split(" ")[2]=="1m"){
        if($scope.flagFirst==" "){
          $scope.flagFirst=true;
          $scope.showPopup();
        }
       // return true;
      }else if(val.split(" ")[0]=="0d"&&val.split(" ")[1]=="0h"&&val.split(" ")[2]=="0m"&&val.split(" ")[3]=="0s"){
        $scope.stopTimer();
       $scope.showPopupFinish();
       // return true;
      }
      //return false;
     }


      //Stop Timer
      $scope.stopTimer = function () {
        $interval.cancel(interval);
      }

      // A confirm dialog
      $scope.showConfirm = function (task, status) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Task Confirmation',
          template: 'You want to Start task?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            $rootScope.saveTaskId=task.id;
            $scope.isOpenRight();
            $scope.getTaskDetail(task.taskCode);
            $scope.saveTaskStatus(status, task.id, $scope.currentDateTime, $scope.currentDateTime);

          } else {
            console.log('You are not sure');
          }
        });
      };

     //Alert Box When Last 5 minits
      $scope.showPopup = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Harry Up',
          template: '<div style="text-align:center;">Only 10 Minits</div>'
        });
        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      };
// Alert Box When Finished Test
$scope.showPopupFinish = function() {
  var alertPopup = $ionicPopup.alert({
    title: 'Task Finish ',
    template: '<div style="text-align:center;">Task has been Finished</div>'
  });
  alertPopup.then(function(res) {
    $scope.cancel();
    $scope.saveTaskStatus('completed',$scope.singleTaskData.id,$scope.taskStartTime,$scope.currentDateTime);
    console.log('Thank you for not eating my delicious ice cream cone');
  });
};


      $scope.getTask = function () {
        studentService.getAllStudentTask(requestTask).then(function (result) {
          $scope.studentTaskData = result.data;
        })
      }

      $scope.getAllSubject = function () {
        /* var requestSub = {
          "classCode": $scope.studentData.classCode
        } */
        studentService.getAllSubjects().then(function (result) {
          $scope.subjectData =result.data;
        })
      }

      $scope.init = function () {
        studentService.getStudentById(request).then(function (result) {
          $scope.studentData = result.data[0];
         // $scope.getSubject();
        })
      }

      $scope.goToStudentTashPage=function(date,subjectCode){
        if (this.datevalue == undefined) {
          NativeTost.showTost('Please Select Date','long','top');
          return true;
        }
       var datevalu= $filter('date')(date,'yyyy-MM-dd');
        $state.go("substudentdash",{StudentId:$scope.studentData.id,subject:subjectCode,currentDate:datevalu});
      }

      $scope.fileUpload=function(){
        var request={
          "profileUrl":$scope.imagePathS3,
          "id":$stateParams.studentId
        }
        studentService.saveFileInDB(request).then(function(result){
          alert("File Successfully Uploaded");
          $scope.cancelProblem();
          $scope.init();
          $scope.getAllSubject();
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


       $scope.init();
       $scope.getAllSubject();

    }]);
