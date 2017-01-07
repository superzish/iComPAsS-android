angular.module('iComPAsS.controllers')

.controller('SendMessageCtrl', function($scope, $state, $stateParams, SendMessageService, DoctorDetailService, PatientDetailService){
  $scope.showLoading();

  if($scope.isDoctor()){
    PatientDetailService.get_patient_detail($stateParams.recipientId).then(function(data) {
      $scope.hideLoading();

      $scope.setRecipient(data);
    });
  }else if($scope.isPatient()) {
    PatientDetailService.get_patient_detail($stateParams.recipientId).then(function(data) {
      $scope.hideLoading();

      $scope.setRecipient(data);
    });
  }

  $scope.setRecipient = function(data) {
    $scope.recipient = {
      'image': data.meta.profile_pic,
      'fullname': data.profile.fname + ' ' + data.profile.mname + ' ' + data.profile.lname
    };
  };

  $scope.messageData = {};

  $scope.sendMessage = function(){
    $scope.showLoading();

    SendMessageService.send_message($stateParams.recipientId, $scope.messageData.message).then(function(){
      $scope.hideLoading();

      $scope.alertPopup('Success!', 'Sent!');

      $state.go('menu.select-recipient');
    }, function(err){
      $scope.hideLoading();

      $scope.alertPopup('Something Went Wrong!', 'Message not sent.');
    });
  };


});