angular.module('BlurAdmin.services', [])
.factory('JsAdapter', function ($rootScope, $http, $location, toastr) {
    var listDeferred = [];
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
        $rootScope.lang = data.language;
    });

    var host = "http://" + $location.host() + ":65501/";

    $rootScope.loadScript = function (url, type, charset) {
		console.log("TSET");
        if (type === undefined) type = 'text/javascript';
        if (url) {
            var script = document.querySelector("script[src*='" + url + "']");
            if (!script) {
                var heads = document.getElementsByTagName("head");
                if (heads && heads.length) {
                    var head = heads[0];
                    if (head) {
                        script = document.createElement('script');
                        script.setAttribute('src', url);
                        script.setAttribute('type', type);
                        if (charset) script.setAttribute('charset', charset);
                        head.appendChild(script);
                    }
                }
            }
            return script;
        }
    };
    $rootScope.loadScript(host + 'signalr/hubs', 'text/javascript', 'utf-8');


    function startSignalR() {
        try {
            $.connection.hub.url = host + "signalr";
            var ulangConsole = $.connection.signalRUlang;
            ulangConsole.client.onConsoleMessage = function (topic, message) {
                message = JSON.parse(message);
                if (topic == "Indicators")
                    $rootScope.$broadcast("onConsoleMessageIndicators", { topic: topic, message: message });
                if (topic == "Tablets")
                    $rootScope.$broadcast("onConsoleMessageTablets", { topic: topic, message: message });
                if (topic == "Dissertations")
                    $rootScope.$broadcast("onConsoleMessageDissertations", { topic: topic, message: message });
            };
            $.connection.hub.start();
            $.connection.hub.disconnected(function () {
                setTimeout(function () {
                    $.connection.hub.start();
                    $rootScope.$broadcast("onConsoleDisconnected", { topic: "ConsoleDisconnected", message: "Disconnected from the console, reconnecting" });
                }, 5000); // Restart connection after 5 seconds.
            });
        } catch (e) {
            connector.ShowToast("Error connecting to the server, please reload page","error");
            setTimeout(function () {
                startSignalR();
            }, 25000);
        }
    }

    var connector = {
        GetTabletInformation: function () {
            var dfd = createDfd();
            $http.get(host + 'api/Dashboard/GetTabletInformation').then(function (response) {
                dfd.resolve(response.data);
            }, function (err) {
                dfd.reject(err);
            });
            return dfd.promise();
        },
        GetTabletActions: function (action, idCabin, tabletNumber) {
            /* 
            public enum TabletsAction
            {
                ChangeStatePlayback = 0,
                ChangeStateRecord,
                ChangeStateMute,
                ChangeStateAudioTest,
                SwitchLanguages,
                ChangeGainValuePlus,
                ChangeGainValueMinus,
                ListenAudioTablet,
                LiveTablet
            }
            */
            var dfd = createDfd();
            $http.get(host + 'api/Dashboard/TabletActions?action={0}&idCabin={1}&tabletNumber={2}'.f(action, idCabin, tabletNumber)).then(function (response) {
                dfd.resolve(response.data);
            }, function (err) {
                dfd.reject(err);
            });
            return dfd.promise();
        },
        GetDissertationsInformation: function() {
            var dfd = createDfd();
            $http.get(host + 'api/Dashboard/GetDissertationsInformation').then(function (response) {
                dfd.resolve(response.data);
            }, function (err) {
                dfd.reject(err);
            });
            return dfd.promise();
        },
        ChangeToDissertation: function (id) {
            var dfd = createDfd();
            $http.get(host + 'api/Dashboard/ChangeToDissertation?id={0}'.f(id)).then(function (response) {
                dfd.resolve(response.data);
            }, function (err) {
                dfd.reject(err);
            });
            return dfd.promise();
        },
        ShowToast: function(message, type, title) {
            //types = ['success', 'error', 'info', 'warning']
            if (type == undefined)
                type = 'success';
            if (title == undefined)
                title = type;
            toastr[type](message, type, {
                "type": type,
                "autoDismiss": true,
                "positionClass": "toast-bottom-right",
                "timeOut": "4000",
                "extendedTimeOut": "2000",
                "allowHtml": true,
                "closeButton": true,
                "tapToDismiss": true,
                "progressBar": true,
                "newestOnTop": true,
                "maxOpened": "4",
                "preventDuplicates": false,
                "preventOpenDuplicates": true
            })
        }

    }
    //#endregion
    setTimeout(function () {
        startSignalR();
    }, 1000);
    return connector;
});
