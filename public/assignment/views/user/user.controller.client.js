
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService
                // .findUserByCredentials(username, password)
                .login(username, password)
                .then(
                    function (user) {
                        if (user === null) {
                            vm.error = "Password is not correct.";
                        } else {
                            $location.url("/profile");
                        }
                    },
                    function (error) {
                        vm.error = "Username does not exist.";
                    });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword, driver) {
            if (username === undefined || username === null || username === ""
                || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }
            UserService
                .findUserByUsername(username)
                .then(function (user) {
                    if (user) {
                        vm.error = "Username already exists.";
                    }
                    else {
                        var NewUser = {
                            username: username,
                            password: password,
                            firstName: "",
                            lastName: "",
                            email: "",
                            driver: driver
                        };

                        UserService
                            .register(NewUser)
                            .then(function (newuser) {
                                if (newuser) {
                                    $location.url("/profile");
                                }
                            });
                    }
                });
        }

        function registerCustomer(username, password, vpassword) {
            register(username, password, vpassword, false);
        }

        function registerDriver(username, password, vpassword) {
            register(username, password, vpassword, true);
        }
    }

    function ProfileController(loggedin, $timeout, UserService, $location) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;

        function init() {
            renderUser(vm.user);
        }

        init();

        function renderUser (user) {
            vm.user = user;
        }

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function updateUser(user) {
            UserService
                .updateUser(vm.user._id, user)
                .then(
                    function (newUser) {
                        if (newUser) {
                            vm.updated = "Profile changes saved!";
                        }
                    });

            $timeout(function () {
                vm.updated = null;
            }, 3000);
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url("/login");
                });

        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }

})();