var app = angular.module('TravelBloks', []);

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

    $scope.init = function(){
        $scope.getData();
    };
    
    $scope.getData = function(){
        $http.get('/json/data.json').success(function(response){
           console.log(response);
            $scope.data = response;
        });
    };

    $scope.init();
});