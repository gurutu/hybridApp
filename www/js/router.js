angular.module('app.routes', ['ngMaterial',
  'ui.bootstrap',
  'ui.router',
  'LoginController',
  'adminController',
  'StudentDashController',
  'adminMamberController',
  'adminTaskController',
  'TeacherDashController',
  'StudentInformationController',
  'AssignTaskController',
  'PerformanceDashController',
  'NotificationDashController',
  'SubStudentDashController',
  'adminAddToClassSubjectController'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'template/login.html',
        controller: 'LoginController'
      });

    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'template/admin.html',
        controller: 'adminController'
      });
    $stateProvider
      .state('adminMember', {
        url: '/adminmember',
        templateUrl: 'template/adminMember.html',
        controller: 'adminMamberController'
      });
    $stateProvider
      .state('adminTask', {
        url: '/adminTask',
        templateUrl: 'template/adminTasks.html',
        controller: 'adminTaskController'
      });
    $stateProvider
      .state('addToClassSubject', {
        url: '/addToClassSubject',
        templateUrl: 'template/adminAddToClassSubjectController.html',
        controller: 'adminAddToClassSubjectController'
      });
    $stateProvider
      .state('studentDash', {
        url: '/studentDashboard/:studentId',
        templateUrl: 'template/studentDash.html',
        controller: 'StudentDashController'

      });
    $stateProvider
      .state('substudentdash', {
        url: '/substudentdash/:StudentId/:subject/:currentDate',
        templateUrl: 'template/subStudentTask.html',
        controller: 'SubStudentDashController'
      });
    $stateProvider
      .state('teacherDash', {
        url: '/teacherDashboard/:teacherId',
        templateUrl: 'template/teacher.html',
        controller: 'TeacherDashController'
      });
    $stateProvider
      .state('studentInfor', {
        url: '/studentInformationDashBoard',
        templateUrl: 'template/studentInformation.html',
        controller: 'StudentInformationController'
      });
    $stateProvider
      .state('assignTaskUrl', {
        url: '/assignTaskDashboard/:paramValue',
        templateUrl: 'template/assignTask.html',
        controller: 'AssignTaskController'
      });
    $stateProvider
      .state('performance', {
        url: '/performanceDashboard/:classSel',
        templateUrl: 'template/performance.html',
        controller: 'PerformanceDashController'
      });
    $stateProvider
      .state('notification', {
        url: '/notificationDashboard',
        templateUrl: 'template/notification.html',
        controller: 'NotificationDashController'
      });
    $urlRouterProvider.otherwise('/login');
    // $compileProvider.preAssignBindingsEnabled(true);
  });

