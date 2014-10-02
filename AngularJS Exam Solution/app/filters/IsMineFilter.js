appMain.filter('isMineImage', function() {
    return function(input) {
        return input ? "../content/img/yes.png" : "../content/img/no.png";
    };
});