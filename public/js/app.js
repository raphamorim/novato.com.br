'use strict';

// Declare app level module which depends on filters, and services
var despicable = angular.module('despicable', [
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives'
    // ,'ngRoute'
]);

despicable.run(['$window',
    function($window) {

        $window.fbAsyncInit = function() {
            FB.init({
                appId: 'XXXXXXXXXXXXX',
                status: true,
                cookie: true
            });
        };

        (function(d) {
            var js, id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) return;
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));

    }
]);
