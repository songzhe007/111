(function () {
    angular
        .module('DirectiveLecture', [])
        .directive('sortable', sortable);


    function sortable() {

        function linkFunction(scope, element) {
            var initialIndex = -1;
            var finalIndex = -1;

            $(element).sortable({
                start: function (event, ui) {
                    initialIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    finalIndex = $(ui.item).index();
                    scope.model.sortWidgets(initialIndex, finalIndex);
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();
