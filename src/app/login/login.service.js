/**
 * Created by rootroot on 10/13/16.
 */
(function() {
  'use strict';

  angular
    .module('gmapFront')
    .factory('Auth', Auth);

  /** @ngInject */
  function Auth($http, $cookies,$q, apiBasePath) {
    var deferred = $q.defer();
    return {
      login: function(user, callback) {
          var cb = callback || angular.noop;
          $http.post(apiBasePath + 'auth/local/', {
            email: user.email,
            password: user.password
          })
          .success(function(data) {
            deferred.resolve(data);
            $cookies.put('access_token', data.token);
            $cookies.put('userRec', angular.toJson(data.userRec));

            return cb(data);
          })
          .error(function(err) {
            this.logout();
            deferred.reject(err);

            return cb(err);
          }.bind(this));
          return deferred.promise;
      },
      logout: function(callback) {
        $cookies.remove('access_token');
        $cookies.remove('userRec');
        return deferred.promise;
      },

      isAuthenticated: function() {
        return (typeof $cookies.get('access_token') !== 'undefined' && $cookies.get('access_token') !== null);
      },

      defaultState: function() {
        return 'home';
      }
    };
  }
})();
