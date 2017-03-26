angular.module('iComPAsS.controllers')

.controller('PainDetectResultDetailCtrl', function($scope, $stateParams, PainDetectService){
  $scope.showLoading();

  $scope.populatePainDetectResultDetail = function(){
    PainDetectService.get_pain_detect_results($stateParams.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.pain_detect_result = data;
      for (var i = 0; i < $scope.pain_detect_result.length; i++) {
        $scope.pain_detect_result[i].dateanswered = moment($scope.pain_detect_result[i].dateanswered).format("MMMM DD, YYYY");
      }
      for (var j = 0; j < $scope.pain_detect_result.length; j++) {
        $scope.pain_detect_result[j].pd_result = JSON.parse($scope.pain_detect_result[j].pd_result);
      }
      for (var k = 0; k < $scope.pain_detect_result.length; k++) {
        $scope.pain_detect_result[k].pd_diagrams = JSON.parse($scope.pain_detect_result[k].pd_diagrams);
      }
      $scope.pain_detect_result.reverse();

      $scope.result_index = $stateParams.result_index;
      console.log($scope.pain_detect_result[$scope.result_index]);

      //set diagram colors
      for (var anterior in $scope.pain_detect_result[$scope.result_index].pd_diagrams[0].anterior) {
        var num;
        switch ($scope.pain_detect_result[$scope.result_index].pd_diagrams[0].anterior[anterior]) {
          case 0:
            num = 0;
            break;
          case 1:
            num = 3;
            break;
          case 2:
            num = 1;
            break;
          default:
            num = 0;
        }
        $scope.setColor(anterior, num);
      }

      for (var posterior in $scope.pain_detect_result[$scope.result_index].pd_diagrams[1].posterior) {
        var num2;
        switch ($scope.pain_detect_result[$scope.result_index].pd_diagrams[1].posterior[posterior]) {
          case 0:
            num2 = 0;
            break;
          case 1:
            num2 = 3;
            break;
          case 2:
            num2 = 1;
            break;
          default:
            num2 = 0;
        }
        $scope.setColor(posterior, num2);
      }

      $scope.choices = [
        {
          text: 'Never',
          value: 0
        },
        {
          text: 'Hardly Noticed',
          value: 1
        },
        {
          text: 'Slightly',
          value: 2
        },
        {
          text: 'Moderately',
          value: 3
        },
        {
          text: 'Strongly',
          value: 4
        },
        {
          text: 'Very Strongly',
          value: 5
        }
      ];

      $scope.radios = [
        {
          text: 'Persistent pain with slight fluctuations',
          image: 'radio_1.png',
          value: 'a'
        },
        {
          text: 'Persistent pain with pain attacks',
          image: 'radio_2.png',
          value: 'b'
        },
        {
          text: 'Pain attacks without pain between them',
          image: 'radio_3.png',
          value: 'c'
        },
        {
          text: 'Pain attacks with pain between them',
          image: 'radio_4.png',
          value: 'd'
        }
      ];
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePainDetectResultDetail();
});
