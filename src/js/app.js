
var app = angular.module('app', ['ngRoute','ngParallax']);

app.controller('ctrl', function($scope){

    $scope.hello = "Hello World!";
    $scope.marioBG = '/src/img/mario.jpg';

});

// app.directive('inputColor', function() {
//     return {
//         restrict: 'A', // A = Attribute; E = Element; C = Class; M = Comment
//         scope:{
//             color: '@inputColor'
//         },
//         link: function (scope, element, attr, ctrl) {
//             if(scope.color){
//                 element.css('color', scope.color);
//             }
//         }
//     };
// });

//app.factory('Servive', function() {});