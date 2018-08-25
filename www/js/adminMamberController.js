/**
 * Created by evfandroid on 7/21/2018.
 */
var AppContoller = angular.module('adminMamberController', []);

AppContoller
  .controller(
  "adminMamberController", ['$scope', '$state', '$mdSidenav', 'adminservice', '$ionicPopup', 'allClass',
    function ($scope, $state, $mdSidenav, adminservice, $ionicPopup, allClass) {
      $scope.adminData = "";
      $scope.teacherData = "";
      $scope.studentData = "";
      $scope.request = {
        "role": "admin"
      };
      $scope.admin = {
        "margin-top": "65px",
        "min-height": screen.height + "px",
        "max-height": screen.height + "px"
      }
      //document.getElementById("adminId").style.height=screen.height+"px";

      $scope.height = screen.height;
      $scope.empty = function () {
        $scope.name = "";
        $scope.emailId = "";
        $scope.phone = "";
        $scope.type = "";
      }



      $scope.footerName = "Add Admin";


      $scope.openAllPanal = function () {
        if ($scope.footerName == "Add Admin") {
          $scope.isOpenRightAdmin();
        } else if ($scope.footerName == "Add Student") {
          $scope.studentRequestData();
          $scope.isOpenRightStudent();
        } else if ($scope.footerName == "Add Teacher") {
          $scope.isOpenRightTeacher();
          $scope.teacherRequestData();
        }
      }

      $scope.changeFooterContant = function (param) {
        $scope.footerName = param;
        if (param == "Add Admin") {
          $scope.request.role = "admin";
          $scope.init();
        } else if (param == "Add Student") {
          $scope.studentRequestData();
        } else if (param == "Add Teacher") {
          $scope.teacherRequestData();
        }
      }


      $scope.isOpenRightAdmin = function () {
        $mdSidenav('rightAdmin').toggle()
          .then(function () {
          });
      };

      $scope.cancelAdmin = function () {
        $mdSidenav('rightAdmin').close()
          .then(function () {

          });
      };


      $scope.isOpenRightTeacher = function () {
        $mdSidenav('rightTeacher').toggle()
          .then(function () {

          });
      };

      $scope.cancelTeacher = function () {
        $mdSidenav('rightTeacher').close()
          .then(function () {

          });
      };

      $scope.isOpenRightStudent = function () {
        $mdSidenav('rightStudent').toggle()
          .then(function () {

          });
      };

      $scope.cancelStudent = function () {
        $mdSidenav('rightStudent').close()
          .then(function () {

          });
      };


      $scope.goToBack = function () {
        $state.go('admin');
      }

      $scope.saveData = function (role) {
        $scope.request = {
          "email": this.emailId,
          "password": "N/A",
          "role": role,
          "phone": this.phone,
          "name": this.name,
          "lastName": this.lastName
        }
        if (role == "student") {
          $scope.request = {
            "email": this.emailId,
            "password": "N/A",
            "role": role,
            "phone": this.phone,
            "name": this.name,
            "class": this.myClass,
            "lastName": this.lastName

          }
        }
        adminservice.saveUserInfo($scope.request).then(function (result) {
          if (role == "admin") {
            $scope.init();
            $scope.cancelAdmin();
          } else if (role == "teacher") {
            $scope.teacherRequestData();
            $scope.cancelTeacher();
          } else if (role == "student") {
            $scope.studentRequestData();
            $scope.cancelStudent();
          }
          console.log(result);
          $scope.empty();
          //  $scope.teacherData=result.data;//role
        });
      }


      $scope.showConfirm = function (Userid) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Confirmation',
          template: 'Are you sure you want to delete User?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            console.log('You are sure');
            $scope.deleteUser(Userid);
          } else {
            console.log('You are not sure');
          }
        });
      };

      $scope.deleteUser = function (userID) {
        var request = {
          "id": userID
        }
        adminservice.deleteUserInfo(request).then(function (result) {
          if ($scope.footerName == "Add Admin") {
            $scope.request.role = "admin";
            $scope.init();
          } else if ($scope.footerName == "Add Student") {
            $scope.studentRequestData();
          } else if ($scope.footerName == "Add Teacher") {
            $scope.teacherRequestData();
          }
        })
      }


      $scope.teacherRequestData = function () {
        $scope.request.role = "teacher";
        adminservice.searchByRole($scope.request).then(function (result) {
          $scope.teacherData = result.data;//role

          console.log("@@@@@@@@@@@@@ teacherData  @@@@@@@@@@@@@@");
          console.log($scope.teacherData);
        });
      }

      $scope.studentRequestData = function () {
        $scope.request.role = "student";
        adminservice.searchByRole($scope.request).then(function (result) {
          $scope.studentData = result.data;//role

          console.log("@@@@@@@@@@@@@ studentData  @@@@@@@@@@@@@@");
          console.log($scope.studentData);
        });
      }


      $scope.init = function () {
        $scope.request.role = "admin";
        adminservice.searchByRole($scope.request).then(function (result) {
          $scope.adminData = result.data;//role

          console.log("@@@@@@@@@@@@@ adminData  @@@@@@@@@@@@@@");
          console.log($scope.adminData);

        });

        var request = {
        };
        allClass.allClassList(request).then(function (results) {
          if (results.status == "200") {

            console.log("=============All Class================");
            console.log(results.data);

            $scope.classList = results.data;
          }
        });
      }

      $scope.init();




    }]);
