angular.module('iComPAsS.controllers')

.controller('ChangePasswordWithKeyCtrl', function($scope, $state, PasswordService){
  $scope.password = {};

  $scope.doChangePassword = function() {
    $scope.showLoading();

    if($scope.password.new === $scope.password.confirm_new){
      PasswordService.change_password_with_key($scope.password).then(function(data) {
        $scope.hideLoading();

        $scope.alertPopup('Success!', 'You have changed your password.');

        $scope.disableBackStateGo('login');
      }, function(err) {
        $scope.hideLoading();

        $scope.alertPopup('Something went wrong!', 'Please check your secret key.');
      });
    }else{
      $scope.hideLoading();
      $scope.alertPopup('Something went wrong!', 'New passwords did not match.');
    }
  };

});
