
 (function () {
    angular
        .module("WebAppMaker")
        .controller('WebsiteListController', WebsiteListController)
        .controller('EditWebsiteController', EditWebsiteController)
        .controller('NewWebsiteController', NewWebsiteController);

     function WebsiteListController(WebsiteService, loggedin) {
         var vm = this;
         vm.uid = loggedin._id;
         WebsiteService
             .findAllWebsitesForUser(vm.uid)
             .then(function (websites) {
                 vm.websites = websites;
             });
     }

     function NewWebsiteController(WebsiteService, $location, loggedin) {
         var vm = this;
         vm.uid = loggedin._id;
         WebsiteService
             .findAllWebsitesForUser(vm.uid)
             .then(function (websites) {
                 vm.websites = websites;
             });

         vm.newWebsite = newWebsite;
         function newWebsite(name, description) {
             if (name === undefined || name === null || name === "") {
                 vm.error = "Website Name cannot be empty.";
                 return;
             }
             var website = {
                 name: name,
                 developId: "",
                 description: description
             };
             
             WebsiteService
                 .createWebsite(vm.uid, website)
                 .then(function () {
                     $location.url("/website");
                 })
         }
     }

     function EditWebsiteController($routeParams, WebsiteService, $location, loggedin) {
         var vm = this;
         vm.uid = loggedin._id;
         vm.wid = $routeParams.wid;
         WebsiteService
             .findAllWebsitesForUser(vm.uid)
             .then(function (websites) {
                 vm.websites = websites;
             });
         WebsiteService
             .findWebsiteById(vm.wid)
             .then(function (website) {
                 vm.website = website;
             });

         vm.updateWebsite = updateWebsite;
         vm.deleteWebsite = deleteWebsite;

         function updateWebsite(website) {
             if (website.name === undefined || website.name === null || website.name === "") {
                 vm.error = "Website name cannot be empty.";
                 return;
             }

             WebsiteService
                 .updateWebsite(vm.wid, website)
                 .then(function () {
                    $location.url("/website");
             });
         }

         function deleteWebsite(websiteId) {
             WebsiteService
                 .deleteWebsite(websiteId)
                 .then(function () {
                     $location.url("/website");
                 })
         }
     }
 })();