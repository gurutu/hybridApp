/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('AssignTaskController', []);

AppContoller
  .controller(
  "AssignTaskController", ['$scope', '$mdSidenav', '$state', '$rootScope', 'stduentList', 'assignTaskToStudent', 'studentTask', '$stateParams', 'store', 'adminservice', 'utils',
    function ($scope, $mdSidenav, $state, $rootScope, stduentList, assignTaskToStudent, studentTask, $stateParams, store, adminservice, utils) {

      $scope.show = "";
      $scope.goToBack = function () {
        $state.go('teacherDash', { "teacherId": store.get('userdata').id });
      };
      $scope.widthvalue = document.getElementById("getwidth").offsetWidth;
      //document.getElementById("datestudent").style.width=screen.width-"24"+"px";
      $scope.dateStyle={
        "width": $scope.widthvalue-"9"+"px",
      }

      $rootScope.MAINURL = "http://13.232.113.147:80/app/";
      $scope.studentListClass = "";
      $scope.checkBoxValue = [];
      $scope.saveCheck = function (val) {
        var flag = true;
        var count = 0;
        angular.forEach($scope.checkBoxValue, function (checkBoxValue) {
          if (checkBoxValue.studentId == val) {
            flag = false;
            delete $scope.checkBoxValue[count];
            //  break;
          }
          count++;
        });
        var ref = { "studentId": val };
        if (flag == true) {
          $scope.checkBoxValue.push(ref);
        }
      }

      $scope.selectAll = function () {
        $scope.checkBoxValue = [];
        angular.forEach($scope.studentListClass, function (subValue) {
          document.getElementById(subValue.id).checked = true;
          var ref = { "studentId": subValue.id };
          $scope.checkBoxValue.push(ref);
        });
      }

      $scope.getAssiignTaskList = function () {
      if(this.subject !=undefined && this.datevalue !=undefined){
          var request = {
            "subject": this.subject,//"ENG",
            "date": this.datevalue,//"2018-07-22 10:00:00",
            "teacherId": store.get('userdata').id ,//"2",
          }
          studentTask.studentALLTaskList(request).then(function (results) {
            if (results.status == "200") {
              console.log("=============Selected Class Task List================");
              console.log(results.data);
              $scope.TaskstudentListALL = results.data;
            }
          });
          }else{
                 alert("Please Select Date and Subject")
           }

      }

      $scope.deselectCheckBox = function () {
        $scope.checkBoxValue = [];
        angular.forEach($scope.studentListClass, function (subValue) {
          document.getElementById(subValue.id).checked = false;
        });
      }



      $scope.sideNavAssignTask = function (taskCode) {
        $scope.taskCode = taskCode;
        $mdSidenav('sideAssignTask').toggle()
          .then(function () {
            if ($scope.taskCode != undefined) {
              var request = {
                "classCode": $stateParams.paramValue
              };
              stduentList.studentListBasedOnClass(request).then(function (results) {
                if (results.status == "200") {
                  $scope.studentListClass = results.data;
                  console.log($scope.studentListClass);
                }
              });
            }

          });
      };


      $scope.cancelNavAssignTask = function () {
        $mdSidenav('sideAssignTask').close()
          .then(function () {
          });
      };

      function closeAssign() {
        $mdSidenav('sideAssignTask').close()
          .then(function () {
          });
      }

      $scope.init = function () {

      }
       $scope.getSubjectAndClass = function () {
           $scope.dateStyle = {
                 "width": $scope.widthvalue - "11" + "px",
           }

          adminservice.getSubjectAndClass().then(function (result) {
            //var dataAll = utils.getClassSubject(result.data);
            $scope.subjectData =result.data;
            //$scope.classData = dataAll[1];
          })
       }

      $scope.init();
      $scope.getSubjectAndClass();


      $scope.saveAssignTask = function (taskCode) {
        $scope.tasksCode = taskCode;

        var request = {
          "taskCode": $scope.tasksCode,
          //"teacherId": store.get('userdata').id,
          //"teacherId": store.get('userdata').id,
          "status": "assigned",
          "students": $scope.checkBoxValue
        };

        assignTaskToStudent.assignTaskStudent(request).then(function (results) {
          if (results.status == "200") {
            console.log("=============Successfully Assign Task To Student================");
            console.log(results.data);
            console.log("Successfullly Assign Task To Student");
            alert("Successfullly Assign Task To Student.");
            closeAssign();
          }
        });
      };
    }]);
