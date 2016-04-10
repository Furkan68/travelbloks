var app = angular.module('TravelBloks', ['ngSanitize']);

app.filter('parseYT', function($sce) {
    return function (video){
        var link = document.createElement('a');
        link.setAttribute('href', video);
        var protocol = link.protocol;
        if(protocol == 'https:'){
            //https
            video = video.replace(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="420" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
            link = null;
            return $sce.trustAsHtml(video);
        }else{
            //http
            video = video.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="420" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
            link = null;
            return $sce.trustAsHtml(video);
        }
    }
});

app.filter('getById', function() {
    return function(input, id) {
        var i=0, len=input.length;
        for (; i<len; i++) {
            if (+input[i].id == +id) {
                return input[i];
            }
        }
        return null;
    }
});

app.controller('MainController', function($scope, $http){

    $scope.tags = null;
    $scope.personalTags = [];

    $scope.likes = [];

    $scope.checkValue1 = function() {
        return $scope.obj.value1 === 'someothervalue';
    };
    
    $scope.init = function(){
        $scope.getData();
    };
    
    $scope.getData = function(){
        $http.get('/json/data.json').success(function(response){
            $scope.data = response.data;
            var log = [];
            angular.forEach($scope.data.items, function(value, key) {
                angular.forEach(value.tags, function(value, key){
                    if(log.indexOf(value) == -1){
                        this.push(value);
                    }
                }, log);
            });
            $scope.tags = log;
            $scope.bTags = log;
        });
    };

    $scope.isPersonal = function(tag){
        if($scope.personalTags.indexOf(tag) == -1){
            console.log(1);
            return 1;
        }else{
            console.log(0);
            return 0;
        }
    };
    
    $scope.addTag = function(tag){
        if($scope.personalTags.indexOf(tag) == -1){
            $scope.personalTags.push(tag);
        }
        console.log($scope.personalTags);
        $scope.$apply();
    };

    $scope.like = function(item){
        console.log('Liked item with ID: ' + item.id);
        if($scope.likes.indexOf(item) == -1){
            $scope.likes.push(item);
        }
    };

    $scope.random = function(){
        return 0.5 - Math.random();
    };

    $scope.init();
});