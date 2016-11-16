/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('gmapFront')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('apiBasePath', 'http://localhost:9000/');
})();
