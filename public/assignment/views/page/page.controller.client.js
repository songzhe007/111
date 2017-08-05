
(function () {
    angular
        .module("WebAppMaker")
        .controller('PageListController', PageListController)
        .controller('NewPageController', NewPageController)
        .controller('EditPageController', EditPageController);

    function PageListController($routeParams, PageService, loggedin) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        PageService.findPageByWebsiteId(vm.wid)
                   .then(function (pages) {
                       vm.pages = pages;
                   })
    }

    function NewPageController($routeParams, PageService, $location, loggedin) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.newPage = newPage;

        function newPage(name, description) {
            if (name === undefined || name === null || name === "") {
                vm.error = "Page name cannot be empty.";
                return;
            }
            var page = {
                name: name,
                description: description
            };
            PageService
                .createPage(vm.wid, page)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page");
                })
        }
    }


    function EditPageController($routeParams, PageService, $location, loggedin) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        PageService
            .findPageById(vm.pid)
            .then(function (page) {
                vm.page = page;
            });

        function updatePage(page) {
            if (page.name === undefined || page.name === null || page.name === "") {
                vm.error = "Page Name cannot be empty.";
                return;
            }
            PageService
                .updatePage(vm.pid, page)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page");
                })
        }

        function deletePage() {
            PageService
                .deletePage(vm.pid)
                .then(function () {
                    $location.url("/website/" + vm.wid + "/page");
                })
        }
    }
})();