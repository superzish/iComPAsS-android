angular.module('iComPAsS.controllers')

.controller('PatientDetailCtrl', function($scope, $stateParams, UsersService, EsasService){
  $scope.showLoading();

  $scope.populatePatientDetail = function(){
    $scope.patient_detail = {};

    UsersService.get_patient_detail($stateParams.patientId).then(function(data) {
      // $scope.hideLoading();

      $scope.patient_detail = {
        'image': data.meta.profile_pic,
        'fullname': data.profile.fname + ' ' + data.profile.mname + ' ' + data.profile.lname,
        'basic_info': [
          {
            'label': 'Username',
            'data': data.profile.username
          },
          {
            'label': 'Contact No.',
            'data': data.profile.contactnumber
          },
          {
            'label': 'E-mail',
            'data': data.profile.email
          },
          {
            'label': 'Birthday',
            'data': data.profile.bday
          },
          {
            'label': 'Age',
            'data': data.profile.age
          },
          {
            'label': 'Sex',
            'data': data.profile.gender === 'm'? 'Male' : 'Female'
          },
          {
            'label': 'Diagnosis',
            'data': data.profile.diagnosis
          },
          {
            'label': 'Allergies',
            'data': data.profile.allergies
          },
          {
            'label': 'Initial Height',
            'data': data.profile.height + ' cm'
          },
        ]
      };

      $scope.prescription = data.profile.prescript;
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });

    EsasService.get_esas_results($stateParams.patientId).then(function(data) {
      $scope.hideLoading();

      $scope.chart = {
        labels: [],
        series: EsasService.get_pain_results(),
        data: [[],[],[],[],[],[],[],[],[]],
        options: {
          animation: false,
          legend: {
            display: true,
            position: 'bottom'
          },
          elements: {
            line: {
              tension: 0,
              fill: false
            }
          },
          scales: {
            lineArc: false,
            xAxes: [{
              ticks:{
                minRotation: 90
              },
              type: 'time',
              time: {
                displayFormats: {
                  'millisecond': 'MMM YYYY',
                  'second': 'MMM YYYY',
                  'minute': 'MMM YYYY',
                  'hour': 'MMM YYYY',
                  'day': 'MMM YYYY',
                  'week': 'MMM YYYY',
                  'month': 'MMM YYYY',
                  'quarter': 'MMM YYYY',
                  'year': 'MMM YYYY',
                }
              }
            }]
          }
        }
      };

      for (var i = 0; i < data.length; i++) {
        var date = moment(data[i].Date, "YYYY-MM-DD");
        $scope.chart.labels.push(date.format("YYYY-MM-DD"));
        $scope.chart.data[0].push(JSON.parse(data[i].pain_result).pain);
        $scope.chart.data[1].push(JSON.parse(data[i].pain_result).tiredness);
        $scope.chart.data[2].push(JSON.parse(data[i].pain_result).nausea);
        $scope.chart.data[3].push(JSON.parse(data[i].pain_result).anxiety);
        $scope.chart.data[4].push(JSON.parse(data[i].pain_result).depression);
        $scope.chart.data[5].push(JSON.parse(data[i].pain_result).drowsiness);
        $scope.chart.data[6].push(JSON.parse(data[i].pain_result).lack_of_appetite);
        $scope.chart.data[7].push(JSON.parse(data[i].pain_result).wellbeing);
        $scope.chart.data[8].push(JSON.parse(data[i].pain_result).shortness_of_breath);
      }

      $scope.esas_results = data;
      for (var j = 0; j < $scope.esas_results.length; j++) {
        $scope.esas_results[j].dateanswered = moment($scope.esas_results[j].dateanswered).format("MMMM DD, YYYY");
      }
      $scope.esas_results_reversed = $scope.esas_results.slice(0);
      $scope.esas_results_reversed.reverse();
    })
    .finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.populatePatientDetail();
});
