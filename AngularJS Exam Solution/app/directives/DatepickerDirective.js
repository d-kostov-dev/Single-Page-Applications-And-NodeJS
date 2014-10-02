appMain.directive('datePicker', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element.datetimepicker();
        }
    };
});