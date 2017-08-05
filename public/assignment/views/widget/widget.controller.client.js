(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController(loggedin,$routeParams, WidgetService, $sce, $location) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        WidgetService
            .findWidgetsByPageId(vm.pid)
            .then(function (widgets) {
                vm.widgets = widgets;
            });


        vm.trust = trust;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        vm.sortWidgets = sortWidgets;

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function sortWidgets(start, end) {
            WidgetService
                .reorderWidgets(vm.pid, start, end)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });

        }
    }

    function NewWidgetController(loggedin, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        WidgetService
            .findWidgetsByPageId(vm.pid)
            .then(function (widgets) {
                vm.widgets = widgets;
            });
    }

    function CreateWidgetController(loggedin,$routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgetType = $routeParams.wtype;
        vm.createWidget = createWidget;
        vm.createError = null;

        var widget = {
            type: vm.widgetType,
            size: 3
        };
        vm.widget = widget;

        function createWidget(widget) {
            if (vm.widgetType === 'IMAGE' || vm.widgetType === 'YOUTUBE') {
                if (vm.widget.url === null || vm.widget.url === undefined) {
                    vm.createError = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (vm.widgetType === 'HEADING') {
                if (vm.widget.text === null || vm.widget.text === undefined) {
                    vm.createError = "Text is required for Header";
                    return;
                }
            }

            if (widget === null || widget === undefined) {
                vm.createError = "no new widget";
                return;
            }

            WidgetService
                .createWidget(vm.pid, widget)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }
    }

    function EditWidgetController(loggedin,$routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        WidgetService
            .findWidgetById(vm.wgid)
            .then(function (widget) {
                vm.widget = widget;
                vm.widgetType = vm.widget.type;
            });

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget(widget) {
            if(vm.widgetType === 'HTML' || vm.widgetType === 'YOUTUBE' || vm.widgetType === 'IMAGE' || vm.widgetType === 'TEXTINPUT') {
                widget.size = 1;
            }
            if(vm.widgetType === 'HEADING' || vm.widgetType === 'HTML' || vm.widgetType === 'YOUTUBE' || vm.widgetType === 'IMAGE') {
                widget.rows = 0;
            }
            WidgetService
                .updateWidget(vm.wgid, widget)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(function () {
                    $location.url( "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

    }
})();