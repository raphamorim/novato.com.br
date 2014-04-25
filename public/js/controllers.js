'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

.controller('newbieSignup', function($scope) {
    $scope.connectFB = function() {
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', function(response) {
                    $scope.fbId = response.id;
                    $scope.name = response.name;
                    $scope.city = response.location.name;
                    $scope.imageSource = 'http://graph.facebook.com/' +
                                            response.id + '/picture?type=large';
                    $scope.newbie = '../partial/forms/newbie';
                });
            } else {
                // The person cancelled the login dialog
            }
        });
    };
    $scope.logout = function() {
        FB.logout();
    };
})

.controller('enterpriseSignup', function($scope) {
    $scope.connectFB = function() {
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', function(response) {
                    $scope.fbId = response.id;
                    $scope.name = response.name;
                    $scope.city = response.location.name;
                    $scope.imageSource = 'http://graph.facebook.com/' +
                                            response.id + '/picture?type=large';
                    $scope.enterprise = '../partial/forms/enterprise';
                });
            } else {
                // The person cancelled the login dialog
            }
        });
    };
    $scope.logout = function() {
        FB.logout();
    };
})
