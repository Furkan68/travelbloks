var tbapp = angular.module('tb-app', ['mgo-angular-wizard']);

tbapp.controller('TbCtrl', function ($scope) {
    $scope.yes = 'true';
    $scope.no = 'true';

    $scope.getValue=function(item){
        var value = angular.element(item).data('value');
        console.log(value);
    }

    $scope.enableStep=function (name) {
        if(name == 'yes'){
            $scope.yes = 'false';
        }
        if(name == 'no'){
            $scope.no ='false';
        }
    }
});