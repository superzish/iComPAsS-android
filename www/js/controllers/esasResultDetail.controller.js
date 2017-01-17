angular.module('iComPAsS.controllers')

.controller('EsasResultDetailCtrl', function($scope, $stateParams, PatientDetailService, TakeEsasService){
  $scope.showLoading();

  $scope.populateEsasResultDetail = function(){
    $scope.pain_types = TakeEsasService.get_pain_types();

    PatientDetailService.get_esas_results($stateParams.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.esas_result = data;

      for (var i = 0; i < $scope.esas_result.length; i++) {
        $scope.esas_result[i].diagram = JSON.parse($scope.esas_result[i].diagram);
        $scope.esas_result[i].pain_result = JSON.parse($scope.esas_result[i].pain_result);
        $scope.esas_result[i].pain_type = JSON.parse($scope.esas_result[i].pain_type);
      }

      $scope.esas_result.reverse();
      $scope.result_index = $stateParams.result_index;

      //set diagramc olors
      for (var j = 0; j < $scope.esas_result[$scope.result_index].diagram.front.length; j++) {
        $scope.setColor($scope.esas_result[$scope.result_index].diagram.front[j].key, $scope.esas_result[$scope.result_index].diagram.front[j].value);
      }

      for (var k = 0; k < $scope.esas_result[$scope.result_index].diagram.back.length; k++) {
        $scope.setColor($scope.esas_result[$scope.result_index].diagram.front[k].key, $scope.esas_result[$scope.result_index].diagram.front[k].value);
      }
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populateEsasResultDetail();
});