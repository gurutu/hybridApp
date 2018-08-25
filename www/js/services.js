/**
 * Created by evfandroid on 7/21/2018.
 */

var AppServices = angular.module('starter');

AppServices.value('version', '0.1');

AppServices.service('login', ['$http', '$rootScope', function ($http, $rootScope) {
  function loginRequest(request) {
    return $http.post($rootScope.MAINURL + 'user.auth', JSON.stringify(request));
  }
  return {
    loginRequest: loginRequest
  }
}]);

AppServices.service('studentService', ['$http', '$rootScope', function ($http, $rootScope) {
  function getStudentById(request) {
    return $http.post($rootScope.MAINURL + 'user/selectbyid', JSON.stringify(request));
  }
  function getAllStudentTask(request) {
    return $http.post($rootScope.MAINURL + 'performance/student/gettask', JSON.stringify(request));
  }
  function getTaskDetailById(request) {
    return $http.post($rootScope.MAINURL + 'task/select/taskcode', JSON.stringify(request));
  }
  function getTaskDetailByDateAndTime(request) {
    return $http.post($rootScope.MAINURL + 'performance/student/gettaskontime', JSON.stringify(request));
  }
  function getAllSubject(request) {
    return $http.post($rootScope.MAINURL + 'class/subject/select', JSON.stringify(request));
  }
  function saveTaskStatus(request) {
    return $http.post($rootScope.MAINURL + 'performance/student/updatetask', JSON.stringify(request));
  }
  function getUniqueSubjects(request) {
    return $http.post($rootScope.MAINURL + 'tasks/student/getuniquesubjects', JSON.stringify(request));
  }
  function getAllSubjects() {
    return $http.get($rootScope.MAINURL + 'subjects/get/all');
  }
  function getTaskForStudent(request) {
    return $http.post($rootScope.MAINURL + 'task/select/tasksforstudent', JSON.stringify(request));
  }
  function getTeacherDetail(request) {
    return $http.post($rootScope.MAINURL + 'subjects/get/teacher', JSON.stringify(request));
  }
  function saveTheDuration(request) {
    return $http.post($rootScope.MAINURL + 'task/student/updateduration', JSON.stringify(request));
  }
  function saveFileInDB(request) {
    return $http.post($rootScope.MAINURL + 'user/updatephoto', JSON.stringify(request));
  }
  return {
    getStudentById: getStudentById,
    getAllStudentTask: getAllStudentTask,
    getTaskDetailById: getTaskDetailById,
    getTaskDetailByDateAndTime: getTaskDetailByDateAndTime,
    getAllSubject: getAllSubject,
    saveTaskStatus: saveTaskStatus,
    getUniqueSubjects: getUniqueSubjects,
    getAllSubjects:getAllSubjects,
    getTaskForStudent:getTaskForStudent,
    getTeacherDetail:getTeacherDetail,
    saveTheDuration:saveTheDuration,
    saveFileInDB:saveFileInDB
  }

}]);
AppServices.service('adminservice', ['$http', '$rootScope', function ($http, $rootScope) {
  function searchByRole(request) {
    return $http.post($rootScope.MAINURL + 'user/selectbyrole', JSON.stringify(request));
  }

  function saveUserInfo(request) {
    return $http.post($rootScope.MAINURL + 'user.reg', JSON.stringify(request));
  }

  function deleteUserInfo(request) {
    return $http.post($rootScope.MAINURL + 'user/delete', JSON.stringify(request));
  }

  function saveTaskInfo(request) {
    return $http.post($rootScope.MAINURL + 'task/create', JSON.stringify(request));
  }

  function showAllTasks(request) {
    return $http.get($rootScope.MAINURL + 'task/selectall');
  }

  function deleteTaskInfo(request) {
    return $http.post($rootScope.MAINURL + 'task/delete', JSON.stringify(request));
  }

  function uploadFileToS3(request) {
    /* $httpProvider.defaults.headers.post['Content-Type'] = 'multipart/form-data; charset=utf-8';*/
    return $http.post($rootScope.MAINURL + 'upload/file', JSON.stringify(request));
  }
  function getSubjectAndClass(request) {
    return $http.get($rootScope.MAINURL + 'subjects/get/all');
  }

  return {
    searchByRole: searchByRole,
    saveUserInfo: saveUserInfo,
    deleteUserInfo: deleteUserInfo,
    saveTaskInfo: saveTaskInfo,
    showAllTasks: showAllTasks,
    deleteTaskInfo: deleteTaskInfo,
    uploadFileToS3: uploadFileToS3,
    getSubjectAndClass: getSubjectAndClass
  }
}]);


AppServices.service('student', ['$http', '$rootScope', function ($http, $rootScope) {
  function studentList(request) {
    return $http.post($rootScope.MAINURL + 'user/selectbyrole', JSON.stringify(request));
  }
  return {
    studentList: studentList
  }
}]);

AppServices.service('pushNOtification', ['$http', '$rootScope','store', function ($http, $rootScope,store) {
  function saveTokenForPushNotification(token) {
    var request={
      "id":store.get('userdata').id,
      "onesignalDeviceId":token
    }
    if(store.get('userdata')){
      return $http.post($rootScope.MAINURL + 'user.update/saveonesignalid', JSON.stringify(request));
    }else{
      return true;
    }

  }
  return {
    saveTokenForPushNotification: saveTokenForPushNotification
  }
}]);



AppServices.service('allClass', ['$http', '$rootScope', function ($http, $rootScope) {
  function allClassList(request) {
    return $http.post($rootScope.MAINURL + 'class/select', JSON.stringify(request));
  }
  return {
    allClassList: allClassList,

  }
}]);
AppServices.service('studentTask', ['$http', '$rootScope', function ($http, $rootScope) {
  function studentALLTaskList(request) {
    return $http.post($rootScope.MAINURL + 'task/select/taskspersubjectcode', JSON.stringify(request));
  }
  function studentListTaskBasedOnId(request) {
    return $http.post($rootScope.MAINURL + 'task/select/taskspersubject', JSON.stringify(request));
  }
  return {
    studentALLTaskList: studentALLTaskList,
    studentListTaskBasedOnId: studentListTaskBasedOnId
  }
}]);
AppServices.service('stduentList', ['$http', '$rootScope', function ($http, $rootScope) {
  function studentListBasedOnClass(request) {
    return $http.post($rootScope.MAINURL + 'class/students/select', JSON.stringify(request));
  }
  return {
    studentListBasedOnClass: studentListBasedOnClass
  }
}]);
AppServices.service('assignTaskToStudent', ['$http', '$rootScope', function ($http, $rootScope) {
  function assignTaskStudent(request) {
    return $http.post($rootScope.MAINURL + 'task/assign', JSON.stringify(request));
  }
  return {
    assignTaskStudent: assignTaskStudent
  }
}]);

AppServices.service('performnanceList', ['$http', '$rootScope', function ($http, $rootScope) {
  function performnanceListStudent(request) {
    return $http.post($rootScope.MAINURL + 'performance/student/getstatus', JSON.stringify(request));
  }
  return {
    performnanceListStudent: performnanceListStudent
  }
}]);
AppServices.service('addClassAndSubject', ['$http', '$rootScope', function ($http, $rootScope) {
    function adminAddClassAndSubject(request) {
      return $http.post($rootScope.MAINURL + 'classAndSubject/create', JSON.stringify(request));
    }
  return {
    adminAddClassAndSubject: adminAddClassAndSubject
  }
}]);

// Saving and Fetching Data From / To Local Storage
AppServices.service('store', ['$window', function ($window) {

  return {

    check: function (key) {
      if ($window.localStorage[key]) {
        return true;
      }
      return false;
    },

    get: function (key) {
      if ($window.localStorage[key]) {
        var element = angular.fromJson($window.localStorage[key]);
        return JSON.parse(element);
      }
      return false;
    },

    set: function (key, val) {

      if (val === undefined) {
        $window.localStorage.removeItem(key);
      } else {
        $window.localStorage[key] = angular.toJson(JSON.stringify(val));
      }
      return $window.localStorage[key];
    }
  }
}]);

AppServices.service('logoutUser', ['$state', 'store', function ($state, store) {
  function userLogout() {
    store.set("userdata");
    $state.go('login');
    return true;
  }
  return {
    userLogout: userLogout
  }
}]);



AppServices.service('utils', ['$filter', '$dateParser', '$http', function ($filter, $dateParser, $http) {

  var dayMap = {
    "1": "Mon",
    "2": "Tue",
    "3": "Wed",
    "4": "Thu",
    "5": "Fri",
    "6": "Sat",
    "7": "Sun"
  }

  function getDay(day, value) {
    if (day.indexOf(8) >= 0 || day.indexOf(value) >= 0) {
      return true
    } else {
      return false
    }
  };

  function getAvailableDays(availability) {
    var availableDays = [];
    if (availability != undefined)
      for (var i = 0; i < availability.length; i++) {
        availableDays.push(availability[i].day);
      }
    return availableDays;
  };

  function getAllDays(availability) {
    var days = [];
    var allDays = [1, 2, 3, 4, 5, 6, 7];
    if (isNotNullAndEmpty(availability) && availability.length > 0) {
      for (var i = 0; i < availability.length; i++) {
        if (days.indexOf(availability[i].day) < 0)
          days.push(availability[i].day);
      }
    }
    if (days.indexOf(8) > -1) {
      return allDays;
    } else {
      return days;
    }
  }

  function getWeekDay(day) {
    switch (day) {
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      case 7:
        return "Sun";
      case 8:
        return "All Days";
    }
  }

  function getEachDayTiming(availability, day) {
    var dayAvailability = [];
    var error = ['Not Available'];
    try {
      angular.forEach(availability, function (available) {
        if (available.day === parseInt(day) || available.day === 8) {
          dayAvailability.push(available);
        }
      });
      return getFormatedTimings(dayAvailability);
    } catch (e) {
      return error;
    }
  }

  function getDayValue(day) {
    switch (day) {
      case "Sunday":
        day = "7";
        break;
      case "Monday":
        day = "1";
        break;
      case "Tuesday":
        day = "2";
        break;
      case "Wednesday":
        day = "3";
        break;
      case "Thursday":
        day = "4";
        break;
      case "Friday":
        day = "5";
        break;
      case "Saturday":
        day = "6";
    }
    return day;
  }


  var element = [];

  var servicesArray = ['homedelivery', 'drinks', 'aircondition', 'catering', 'takeaway', 'kidsallowed', 'restaurantid'];

  var servicesAndHighlightsMap = {

    "homedelivery": "Home Delivery",
    "drinks": "Liquor Available",
    "aircondition": "Air Conditioned",
    "catering": "Catering",
    "takeaway": "Take Away",
    "kidsallowed": "Kids Allowed",
    "candlelightdinner": "Candlelight Dinner",
    "hookah": "Hookah",
    "rooftop": "Roof Top",
    "livemusic": "Live Music",
    "poolsidedining": "Poolside Dining",
    "gardenrestaurant": "Garden Restaurant",
    "sportsbar": "Sports Bar",
    "latenightopen": "LateNight Open",
    "themerestaurant": "Theme Restaurant",
    "bigscreen": "Big Screen",
    "halalfriendly": "Halal Friendly",
    "jainfood": "Jain Food",
    "romantic": "Romantic",
    "infivestar": "In 5-Star",
    "dancefloor": "Dance Floor",
    "privatedining": "Private Dining",
    "seafacing": "Sea Facing",
    "alfresco": "Alfresco",
    "microbrewery": "Micro Brewery",
    "restrobar": "Restro Bar",
    "pubsandlounges": "Pubs & Lounges",
    "liftavailable": "Lift Available",
    "beeravail": "Beer Available",
    "craftbeer": "Craft Beer",
    "wifi": "Wifi Available",
    "petfriendly": "Pet Friendly",
    "wineavail": "Wine Available",
    "smoking": "Smoking",
    "babychairavailable": "High Chair",
    "wheelchairavailable": "Disable Friendly",
    "24_7open": "24/7 Open",
    "breakfast": "Breakfast",
    "barbeque": "Barbeque",
    "biryani": "Biryani",
    "biztalk": "BIZ Talk",
    "cigarfriendly": "Cigar Friendly",
    "dancing": "Dancing",
    "dimsum": "Dimsum",
    "ghazals": "Ghazals",
    "italian": "Italian",
    "kebabs": "Kebabs",
    "meals_thali": "Meals/Thali",
    "momos": "Momos",
    "outsidecatering": "Outside Catering",
    "pizza": "Pizza",
    "sushi": "Sushi",
    "sizzlers": "Sizzlers",
    "spaghetti": "Spaghetti",
    "trendy": "Trendy",
    "tequila": "Tequila",
    "tea_coffee": "Tea/Coffee",
    "wholedaydining": "Whole Day Dining",
    "cocktails": "Cocktails"
  }

  var bookingStatusMap = {
    "Booked CH": "Booked",
    "Booked CH T": "Booked",
    "Booked DC CH": "Booked",
    "Booked DC NC": "Booked",
    "Booked NC": "Booked",
    "Booked Others": "Booked",
    "Booked CH Rest": "Booked",
    "Booked CHW": "Booked",
    "Canceled": "Cancelled",
    "Cancelled": "Cancelled",
    "Cancelled Cust": "Cancelled",
    "Cancelled NR Cust": "Cancelled",
    "Cancelled NA": "Cancelled",
    "Cancelled ND": "Cancelled",
    "Cancelled NR": "Cancelled",
    "Cancelled W": "Cancelled",
    "Cancelled Rest": "Cancelled",
    "Closed": "Booked",
    "Closed Others": "Cancelled",
    "Customer Followup": "New",
    "Customer Revertback ": "New",
    "Duplicate": "Cancelled",
    "Error": "Cancelled",
    "Faked": "Cancelled",
    "Hanging": "New",
    "Hanging T": "New",
    "Hanging Guest": "Cancelled",
    "In progress": "New",
    "New": "New",
    "Postponed": "Cancelled",
    "Restaurant Followup": "New",
    "Stage Dead": "Cancelled",
    "Guest List Confirmed": "Guest Confirmed",
    "Guest List Rest Canc": "Guest Cancelled",
    "Guest List Cust Canc": "Guest Cancelled",
    "Rest-Confirmed": "Booked",
    "Rest-Cancelled": "Cancelled",
    "WalkIn CheckIn": "WalkIn CheckIn",
    "Booked WalkIn": "Booked",
    "Payment Attempted": "New",
    "Paid": "New",
    "Enquiry": "New"
  }

  function getTodaysDay() {
    var date = new Date();
    var day = date.getDay();
    if (day === 0) {
      day = 7;
    }
    return day;
  }

  function getDayMap() {
    return dayMap;
  }

  function getFormatedBookingStatus(status) {
    return bookingStatusMap[status];
  }

  function isHighlightNotService(highlight) {
    try {
      if (isNullAndEmpty(servicesAndHighlightsMap[highlight.toLowerCase()]))
        return false;
      else {
        if (servicesArray.indexOf(highlight.toLowerCase()) === -1)
          return true;
        else
          return false;
      }
    } catch (e) {
      return false;
    }
  }

  function checkDateInBetween(startDate, endDate, selectedDate) {
    if (!isNullAndEmpty(startDate)) {
      var startDateFormatted;
      if (typeof (startDate) === "number")
        startDateFormatted = new Date(startDate);
      else
        startDateFormatted = $dateParser(startDate, 'yyyy-MM-dd');

      if (!isNullAndEmpty(endDate)) {

        var endDateFormatted;
        if (typeof (endDate) === "number")
          endDateFormatted = new Date(endDate);
        else
          endDateFormatted = $dateParser(endDate, 'yyyy-MM-dd');
        if (selectedDate.getTime() >= startDateFormatted.getTime() && selectedDate.getTime() <= endDateFormatted.getTime())
          return true;
        else
          return false;
      } else {
        if (selectedDate.getTime() >= startDateFormatted.getTime())
          return true;
        else
          return false;
      }
    } else {
      return true;
    }
  }

  function getHighlightDetails(highlight) {
    return servicesAndHighlightsMap[highlight];
  }

  function getShowingValueForHighlights(value) {
    return servicesAndHighlightsMap[value.toLowerCase];
  }

  function getTypeOfBooking(bookingRefNo) {
    if (bookingRefNo.startsWith("EF") && bookingRefNo.endsWith("R")) {
      return 'table';
    } else if (bookingRefNo.startsWith("EF") && bookingRefNo.endsWith("PT")) {
      return 'event';
    } else if (bookingRefNo.startsWith("RESP") && bookingRefNo.endsWith("T")) {
      return 'resort';
    }
  }

  function convertTimeForJSONStringify(datetime) {
    datetime.setHours(datetime.getHours() + 5);
    datetime.setMinutes(datetime.getMinutes() + 30);
    return datetime;
  }

  function isNullAndEmpty(element) {
    if (element === undefined || element === null || element === '' || element === "null") {
      return true;
    } else {
      return false;
    }
  }

  function isNotNullAndEmpty(element) {
    return !isNullAndEmpty(element);
  }

  function getFormatedTimings(availability) {
    var time = "";
    var timings = [];
    for (var i = 0; i < availability.length; i++) {
      time = $filter('date')($dateParser(availability[i].startTime, 'HH:mm:ss'), "hh:mm a")
        + " To " + $filter('date')($dateParser(availability[i].endTime, 'HH:mm:ss'), "hh:mm a");
      if (timings.indexOf(time) === -1) {
        timings.push(time);
      }
    }
    return timings;
  }

  function getElements() {
    return element;
  };

  function setElements(val) {
    element = val;
  };
  var index;

  function getIndex() {
    return index;
  };

  function setIndex(val) {
    index = val;
  };

  function convertUnixTimeInDate(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    return date;
  }

  function getAvaragePrice(element) {
    if (element != undefined) {
      if (element.includes("-")) {
        var prices = element.split("-");
        var x = parseInt(prices[0].replace(/\D/g, ''));
        var y = parseInt(prices[1].replace(/\D/g, ''));
        var z = x + y;
        return (z / 2) / 600;
      } else {
        var price = (parseInt(element.replace(/\D/g, '')) / 2) / 600;
        return price;
      }
    } else {
      return 0;
    }
  }

  function isCheckListAvailable(element, value) {
    if (element != undefined && element[value] != undefined) {
      return true
    } else {
      return false
    }
  }

  function getProperty() {
    return $http.get('lib/mainProperties.properties');
  }
  function getDateBackOneMonth(valueParameter) {
    var convertInDate = new Date(valueParameter);
    if (convertInDate.getMonth() == 0) {
      convertInDate.setMonth(11);
      convertInDate.setFullYear(convertInDate.getFullYear() - 1);
    } else {
      convertInDate.setMonth(convertInDate.getMonth() - 1);
    }
    return convertInDate;
  }
  function LastDayOfMonth(Year, Month) {
    return new Date((new Date(Year, Month + 1, 1)) - 1);
  }
  function getMainProperties() {
    return $http.get('lib/mainProperties.properties');
  }

  function getClassSubject(data) {
    var subTem = [];
    var calTem = [];
    var sub = [];
    var cal = [];
    var add = []
    for (var i = 0; i < data.length; i++) {
      if (!calTem.includes(data[i].classCode)) {
        var res = {
          "classCode": data[i].classCode,
          "classTitle": data[i].classTitle
        }
        cal.push(res);
        calTem.push(data[i].classCode);
      }
      if (!subTem.includes(data[i].subjectCode)) {
        var res = {
          "subjectCode": data[i].subjectCode,
          "subjectTitle": data[i].subjectTitle
        }
        sub.push(res);
        subTem.push(data[i].subjectCode);
      }

    }
    add.push(sub);
    add.push(cal);
    return add;
  }

  function findfileExtention(url) {
    var video = ['.mpg', '.mpeg', '.avi', '.wmv', '.mov', '.rm', '.ram', '.swf', '.flv', '.ogg', '.webm', '.mp4'];
    var audio = ['.mid', '.midi', '.wma', '.aac', '.wav', '.ogg', '.mp3'];
    var img = ['.jpg', '.jpeg', '.jpe', '.jfif', '.bmp', '.dip', '.gif', '.tif', '.tiff', '.png', '.svg'];
    var pdf = ['.ppt', '.pptx', '.pptm', '.pdf', '.txt', '.doc'];
    var flag = true;
    var value = "";
    for (var i = 0; i < video.length; i++) {
      if (url.includes(video[i])) {
        value = "video";
        break;
      }
      if (audio[i] != undefined && url.includes(audio[i])) {
        value = "audio";
        break;
      }
      if (img[i] != undefined && url.includes(img[i])) {
        value = "image";
        break;
      }
      if (pdf[i] != undefined && url.includes(pdf[i])) {
        value = "pdf";
        break;
      }
    }
    return value;
  }



  return {
    getElements: getElements,
    setElements: setElements,
    getFormatedTimings: getFormatedTimings,
    convertUnixTimeInDate: convertUnixTimeInDate,
    isNullAndEmpty: isNullAndEmpty,
    convertTimeForJSONStringify: convertTimeForJSONStringify,
    getTypeOfBooking: getTypeOfBooking,
    getAvaragePrice: getAvaragePrice,
    isCheckListAvailable: isCheckListAvailable,
    getShowingValueForHighlights: getShowingValueForHighlights,
    isHighlightNotService: isHighlightNotService,
    getHighlightDetails: getHighlightDetails,
    getTodaysDay: getTodaysDay,
    getDayMap: getDayMap,
    getDayValue: getDayValue,
    getEachDayTiming: getEachDayTiming,
    getAvailableDays: getAvailableDays,
    getDay: getDay,
    checkDateInBetween: checkDateInBetween,
    isNotNullAndEmpty: isNotNullAndEmpty,
    getAllDays: getAllDays,
    getWeekDay: getWeekDay,
    setIndex: setIndex,
    getIndex: getIndex,
    getProperty: getProperty,
    getFormatedBookingStatus: getFormatedBookingStatus,
    getDateBackOneMonth: getDateBackOneMonth,
    LastDayOfMonth: LastDayOfMonth,
    getMainProperties: getMainProperties,
    getClassSubject: getClassSubject,
    findfileExtention: findfileExtention
  }
}]);


AppServices.service('NativeTost', ['$http', '$rootScope','$cordovaToast', function ($http, $rootScope,$cordovaToast) {
  function showTost(message,duration,position) {
    /*
    duration: 'short', 'long'
    position: 'top', 'center', 'bottom'
    */
    try {
      $cordovaToast
      .show(message,duration, position)
      .then(function(success) {
        // success
      }, function (error) {
        // error
      });
    } catch (error) {
    }
    return true;
  }
  return {
    showTost: showTost
  }
}]);



AppServices.directive('countDown', ['Util2', '$interval', function (Util2, $interval) {
  return {
    restrict: 'E',
    transclude: 'true',
    template: '<span ></span>',
    scope :{dateVal:'@' },
    link: function (scope, element, attr) {
      scope.$watch("dateVal",function(newValue,oldValue) {
        console.log("Hi Pranav");
         });
      var future = new Date(attr.dateval);
      var val = "";
      var stop= $interval(function () {
        var diff = Math.floor(future.getTime() - new Date().getTime()) / 1000;
        val = Util2.dhms(diff);
        attr.dateVal = val;
        document.getElementById("counDown").textContent = attr.dateVal;
        element.text = "<strong>" + attr.dateVal + "</strong>";
      }, 1000);

    }
  };
}]);

AppServices.factory('Util2', [function () {
  return {
    dhms: function (t) {
      days = Math.floor(t / 86400);
      t -= days * 86400;
      hours = Math.floor(t / 3600) % 24;
      t -= hours * 3600;
      minutes = Math.floor(t / 60) % 60;
      t -= minutes * 60;
      seconds = Math.floor(t % 60);
      return [ hours + 'h', minutes + 'm', seconds + 's'].join(' ');//days + 'd',
    }
  }

}
]);


