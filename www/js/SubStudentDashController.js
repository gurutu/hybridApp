/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('SubStudentDashController', []);

AppContoller
  .controller(
  "SubStudentDashController", ['$scope', '$mdSidenav', '$stateParams', 'studentService', 'logoutUser', 'utils',
    'store', 'Util2', '$interval', '$ionicPopup','NativeTost','$state',
    function ($scope, $mdSidenav, $stateParams, studentService, logoutUser, utils, store, Util2, $interval, 
      $ionicPopup,NativeTost,$state) {

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
      $scope.hours="";
      $scope.seconds="";
      $scope.minutes=""
      $scope.simpleDate=new Date();
      var interval;
      $scope.teacherDetail="";
      $scope.subjectValue=$stateParams.subject;
      $scope.pauseButton=true;
      $scope.counDownMinutes="";
      $scope.coundownMain="";
      $scope.taskid="";

      $interval(function () {
        $scope.makeClock();
      },1000);

      $scope.stopVideoVoice=function(){
        try {
          myVideo.pause();
          voice.pause();
        } catch (error) {
        }
        
      }

     

      $scope.goToBack = function () {
        $state.go("studentDash",{studentId:$stateParams.StudentId});
      }

      $scope.logoutUser = function () {
        logoutUser.userLogout();
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
        })

        $scope.show = true;
      }
     /*  $scope.getAllTaskBasedOnSubject = function (val) {
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
      } */

      $scope.isOpenRightProblem = function () {
        $mdSidenav('rightTaskProblem').toggle()
          .then(function () { });
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
          "id": id,
          "taskStartTime": sDate,
          "taskEndTime": eDate
        }
        $scope.taskStartTime = sDate;
        studentService.saveTaskStatus(requestSta).then(function (result) {
          // $scope.singleTaskData=result.data[0];
          // $scope.getTask();
         // $scope.getAllTaskBasedOnSubject($scope.subjectCodeValue);
         $scope.init();
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
            var currDate= new Date();
            if(store.get($scope.taskid)){
              currDate.setMinutes(currDate.getMinutes() +  parseInt(store.get($scope.taskid)));
            }else{
              currDate.setMinutes(currDate.getMinutes() +  $scope.singleTaskData.duration);
            }
         // $scope.coundownMain=currDate;
          $scope.getTheInterval(currDate);
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
      //Timer Puse
      var timeImp=0;
      $scope.pauseTimeInterval=function(value){
           if(value=='pause'){
            $scope.pauseButton=false;
            /* timeImp=$scope.counDownMinutes;
          //  $interval.cencle(interval);
            $interval.cancel(interval); */
           }else{
            $scope.pauseButton=true;
           /*  var curr=new Date();
          var minutes=curr.getMinutes();
          var minutes1=minutes+parseInt(timeImp);
          $scope.getTheInterval(curr.setMinutes(minutes1)); */
           }
      }

      // Timer value Add By Pranav 
      $scope.getTheInterval = function (endDate) {
        $scope.flagFirst=" ";
        var future = new Date(endDate);
        var startDate=new Date().getTime();
        if(future.getTime()>startDate){
        interval = $interval(function () {
          if($scope.pauseButton){
            var diff = Math.floor(future.getTime() - startDate) / 1000;
            val = Util2.dhms(diff);
            $scope.checkTimer(val);
            $scope.coundownValue = val;
            startDate = new Date(startDate);
            startDate.setSeconds(startDate.getSeconds() + 1);
          }
        }, 1000);
      }else{
        //alert("This test is expired");
      }
      }
     //Make funtion 
     $scope.checkTimer=function(val){
       var har=0;
       var min=0;
       var sec=0;
       if(val.split(" ")[0]!="0h"){
        har=val.split(" ")[0].substring(0, val.split(" ")[0].length - 1)*60;
       }
       if(val.split(" ")[1]!="0m"){
        min=val.split(" ")[1].substring(0, val.split(" ")[1].length - 1);
      } 
      if($scope.pauseButton){
        if(har!=0&&min!=0){
          $scope.counDownMinutes=parseInt(har)+parseInt(min);
        }else if(har==0){
          $scope.counDownMinutes=min;
        }
      }
      

      if(val.split(" ")[0]=="0h"&&val.split(" ")[1]=="1m"){
        if($scope.flagFirst==" "){
          $scope.flagFirst=true;
          $scope.showPopup();
        }
       // return true;
      }else if(val.split(" ")[0]=="0h"&&val.split(" ")[1]=="0m"&&val.split(" ")[2]=="0s"){
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
      $scope.makeClock=function(){
        var d=new Date();
        $scope.simpleDate=d;
        $scope.hours=d.getHours();
        $scope.seconds=d.getSeconds();
        $scope.minutes=d.getMinutes();
      }
     $scope.simpleShowConfirm=function(task, status){
      $scope.taskid= task.id;
      $scope.isOpenRight();
      $scope.getTaskDetail(task.taskCode);
      $scope.saveTaskStatus(status, task.id, $scope.currentDateTime, $scope.currentDateTime);
     }

      // A confirm dialog
      $scope.showConfirm = function (task, status) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Task Confirmation',
          template: 'You want to Start task?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            $scope.taskid= task.id;
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
          title: 'Note',
          template: '<div style="text-align:center;">Try and complete task before timer runs out!</div>'
        });
        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      };
// Alert Box When Finished Test
$scope.showPopupFinish = function() {
  var alertPopup = $ionicPopup.alert({
    title: 'Task Finish ',
    template: '<div style="text-align:center;">Task has been Finished</div><audio controls autoplay style="display: none;"><source src="img/ring.mp3" type="audio/mpeg"></audio>'
  });
  alertPopup.then(function(res) {
    $scope.cancel();
    console.log('Thank you for not eating my delicious ice cream cone');
  });
};


      $scope.getTask = function () {
        studentService.getAllStudentTask(requestTask).then(function (result) {
          $scope.studentTaskData = result.data;
        })
      }

      $scope.getSubject = function () {
        var requestSub = {
          "classCode": $scope.studentData.classCode
        }
        studentService.getAllSubject(requestSub).then(function (result) {
          $scope.subjectData = result.data;
        })
      }

      $scope.init = function () {
        var requestSub = {
          "studentId":$stateParams.StudentId,
          "subject":$stateParams.subject,
          "date":$stateParams.currentDate
        }
        studentService.getTaskForStudent(requestSub).then(function (result) {
          $scope.studentSingleTaskData = result.data;
        })
      }
      $scope.getTeacherDetail=function(){
        var request={
          "subjectTitle":$stateParams.subject
        }
        studentService.getTeacherDetail(request).then(function(result){
          $scope.teacherDetail= result.data[0];
        })
      }
      $scope.saveTheDuration=function(){
        $scope.stopTimer();
        store.set($scope.taskid, $scope.counDownMinutes);
        /* var request={
          "studentDuration":$scope.counDownMinutes,
          "studentId":$stateParams.StudentId,
          "taskCode":$scope.singleTaskData.taskCode
        }
        studentService.saveTheDuration(request).then(function(result){
         // $scope.teacherDetail= result.data[0];
        }) */
      }
     
      $scope.init();
      $scope.getTeacherDetail();
      // $scope.getTask();
     // $scope.getAllTaskBasedOnSubject();

    }]);
