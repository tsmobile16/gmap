(function() {
  'use strict';

  angular
    .module('gmapFront')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, Auth) {
    var authRedirect = $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate && !Auth.isAuthenticated()) {
        $state.go('login');
        event.preventDefault();
        return false;
      }
    });

    $rootScope.$on('$destroy', authRedirect);
  }

})();
