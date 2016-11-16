(function() {
  'use strict';

  angular
    .module('gmapFront')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, Auth) {
    var vm = this;
    if ($state.current.name == 'logout') {
      Auth.logout().then(function(){
        $state.go(Auth.defaultState());
      });
    }
    if (Auth.isAuthenticated()) {
      $state.go(Auth.defaultState());
      return;
    }
    vm.login = function(user) {
      Auth.login(user).then(function() {
        $state.go(Auth.defaultState());
      });
    }
  }
})();
