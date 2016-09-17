// Ionic ComPAssIon App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ComPAssIon' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ComPAssIon.controllers' is found in controllers.js
// 'ComPAssIon.sevices' is found in services.js
angular.module('ComPAssIon', ['ionic', 'ComPAssIon.controllers', 'ComPAssIon.services', 'pascalprecht.translate'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {
  // Routes
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    onEnter: function($state, AuthService){
      if(AuthService.isAuthenticated()){
        $state.go('menu.profile');
      }
    }
  })

  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('menu.prescriptions', {
    url: '/prescriptions',
    views: {
      'menuContent': {
        templateUrl: 'templates/prescriptions.html',
        controller: 'PrescriptionsCtrl'
      }
    }
  })

  .state('menu.take-esas', {
    url: '/take-esas',
    views: {
      'menuContent': {
        templateUrl: 'templates/take-esas.html'
      }
    }
  })

  .state('menu.esas-results', {
    url: '/esas-results',
    views: {
      'menuContent': {
        templateUrl: 'templates/esas-results.html'
      }
    }
  })

  .state('menu.list-of-doctors', {
    url: '/list-of-doctors',
    views: {
      'menuContent': {
        templateUrl: 'templates/list-of-doctors.html',
        controller: 'ListOfDoctorCtrl'
      }
    }
  })

  .state('menu.list-of-patients', {
    url: '/list-of-patients',
    views: {
      'menuContent': {
        templateUrl: 'templates/list-of-patients.html'
      }
    }
  })

  .state('menu.doctor-profile', {
    url: '/doctor-profile/:doctorId',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'DoctorProfileCtrl'
      }
    }
  })

  .state('menu.instructions', {
    url: '/instructions',
    views: {
      'menuContent': {
        templateUrl: 'templates/instructions.html'
      }
    }
  })

  .state('menu.inbox', {
    url: '/inbox',
    views: {
      'menuContent': {
        templateUrl: 'templates/inbox.html'
      }
    }
  })

  .state('menu.message', {
    url: '/message',
    views: {
      'menuContent': {
        templateUrl: 'templates/message.html'
      }
    }
  })

  .state('menu.change-password', {
    url: '/change-password',
    views: {
      'menuContent': {
        templateUrl: 'templates/change-password.html'
      }
    }
  })

  .state('menu.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');
})

.config(function($translateProvider){
  // Translate
  $translateProvider
  .useStaticFilesLoader({
    prefix: 'js/locales/',
    suffix: '.json'
  })
  .registerAvailableLanguageKeys(['en', 'tl'], {
    'en' : 'en',
    'tl' : 'tl'
  })
  .preferredLanguage('en')
  .fallbackLanguage('en')
  .determinePreferredLanguage()
  .useSanitizeValueStrategy('escapeParameters');
})

.constant('USER_ROLES', {
  admin: 'admin_role',
  patient: 'patient_role',
  doctor: 'doctor_role'
})

.constant('SOURCES', {
  api_src: 'http://urag.co/bci_api/api/',
  profile_pic_src: 'http://urag.co/bci_api/images/profile-images/'
});
