angular.module('iComPAsS.services')

.factory('APIService', function($http, AuthService, API){
  return {
    get_user_profile: function() {
      return $http.get(API.src + 'users/profile/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_patient_profile: function() {
      return $http.get(API.src + 'patients/profile/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_doctor_profile: function() {
      return $http.get(API.src + 'doctors/profile/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_patient_prescriptions: function() {
      return $http.get(API.src + 'patients/prescriptions/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_assigned_doctors: function() {
      return $http.get(API.src + 'patients/assigned_doctors/' + AuthService.userID())
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_doctor_detail: function(doctorId) {
      return $http.get(API.src + 'doctors/profile/' + doctorId)
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_received_messages: function() {
      return $http.get(API.src + 'messages/received/?page_limit=99999')
      .then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    },
    get_message: function(messageId) {
      return $http.get(API.src + 'messages/message/' + messageId)
      .then(function successCallback(response) {
        return response.data[0];
      }, function errorCallback(response) {
        console.log(response.statusText);
      });
    }
  };
});