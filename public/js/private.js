(function() {
    
        /**
         * Initialize
         */
        function init() {
            //$('#comedy-btn').bind('click', function() {
                // alert('User clicked on "foo."');
             //  });
            // Register event listeners
            $('comedy-btn').addEventListener('click', loadComedies);
            $('disaster-btn').addEventListener('click', loadDisasters);
            $('crime-btn').addEventListener('click', loadCrimes);
            $('war-btn').addEventListener('click', loadWars);
            $('horror-btn').addEventListener('click', loadHorrors);
            $('science-fiction-btn').addEventListener('click', loadScienceFictions);
            $('romantic-btn').addEventListener('click', loadRomantics);
            $('action-btn').addEventListener('click', loadActions);

        }
    
        // -----------------------------------
        // Helper Functions
        // -----------------------------------
        
    
        document.getElementById("logout-btn").onclick = function () {
            location.href = "logout";
        };
    
    
        /**
         * A helper function that makes a navigation button active
         * 
         * @param btnId -
         *            The id of the navigation button
         */
        function activeBtn(btnId) {
            var btns = document.getElementsByClassName('main-nav-btn');
    
            // deactivate all navigation buttons
            for (var i = 0; i < btns.length; i++) {
                btns[i].className = btns[i].className.replace(/\bactive\b/, '');
            }
    
            // active the one that has id = btnId
            var btn = $(btnId);
            btn.className += ' active';
        }
    
        function showLoadingMessage(msg) {
            var itemList = $('item-list');
            itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> ' +
                msg + '</p>';
        }
    
        function showWarningMessage(msg) {
            var itemList = $('item-list');
            itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> ' +
                msg + '</p>';
        }
    
        function showErrorMessage(msg) {
            var itemList = $('item-list');
            itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> ' +
                msg + '</p>';
        }
    
        /**
         * A helper function that creates a DOM element <tag options...>
         * 
         * @param tag
         * @param options
         * @returns
         */
        function $(tag, options) {
            if (!options) {
                return document.getElementById(tag);
            }
    
            var element = document.createElement(tag);
    
            for (var option in options) {
                if (options.hasOwnProperty(option)) {
                    element[option] = options[option];
                }
            }
    
            return element;
        }
    
        function hideElement(element) {
            element.style.display = 'none';
        }
    
        function showElement(element, style) {
            var displayStyle = style ? style : 'block';
            element.style.display = displayStyle;
        }
    
    
        /**
         * AJAX helper
         * 
         * @param method -
         *            GET|POST|PUT|DELETE
         * @param url -
         *            API end point
         * @param callback -
         *            This the successful callback
         * @param errorHandler -
         *            This is the failed callback
         */
        function ajax(method, url, data, callback, errorHandler) {
            var xhr = new XMLHttpRequest();
    
            xhr.open(method, url, true);
    
            xhr.onload = function() {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    errorHandler();
                }
            };
    
            xhr.onerror = function() {
                console.error("The request couldn't be completed.");
                errorHandler();
            };
    
            if (data === null) {
                xhr.send();
            } else {
                xhr.setRequestHeader("Content-Type",
                    "application/json;charset=utf-8");
                xhr.send(data);
            }
        }
    
        // -------------------------------------
        // AJAX call server-side APIs
        // -------------------------------------
        
        function loadComedies() {
            activeBtn('comedy-btn');
    
            // The request parameters
            var url = './history';
            var params = 'user_id=' + user_id;
            var req = JSON.stringify({});
    
            // display loading message
            showLoadingMessage('Loading comedies...');
    
            // make AJAX call
            ajax('GET', url + '?' + params, req, (res) => {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No comedies.');
                } else {
                    listItems(items);
                }
            }, () => {
                showErrorMessage('Cannot load commedies.');
            });
        }
    
        function loadDisasters() {
            activeBtn('disaster-btn');
    
            // The request parameters
            var url = './history';
            var params = 'user_id=' + user_id;
            var req = JSON.stringify({});
    
            // display loading message
            showLoadingMessage('Loading disaster films...');
    
            // make AJAX call
            ajax('GET', url + '?' + params, req, (res) => {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No disaster films.');
                } else {
                    listItems(items);
                }
            }, () => {
                showErrorMessage('Cannot load disaster films.');
            });
        }
    
        function loadCrimes() {
            activeBtn('crime-btn');
    
            // The request parameters
            var url = './history';
            var params = 'user_id=' + user_id;
            var req = JSON.stringify({});
    
            // display loading message
            showLoadingMessage('Loading crimes...');
    
            // make AJAX call
            ajax('GET', url + '?' + params, req, (res) => {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No crimes.');
                } else {
                    listItems(items);
                }
            }, () => {
                showErrorMessage('Cannot load crimes.');
            });
        }
    
        function loadWars() {
            activeBtn('war-btn');
    
            // The request parameters
            var url = './history';
            var params = 'user_id=' + user_id;
            var req = JSON.stringify({});
    
            // display loading message
            showLoadingMessage('Loading wars...');
    
            // make AJAX call
            ajax('GET', url + '?' + params, req, (res) => {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No wars.');
                } else {
                    listItems(items);
                }
            }, () => {
                showErrorMessage('Cannot load wars.');
            });
        }
    
        function loadHorrors() {
            activeBtn('horror-btn');
    
            // The request parameters
            var url = './history';
            var params = 'user_id=' + user_id;
            var req = JSON.stringify({});
    
            // display loading message
            showLoadingMessage('Loading horrors...');
    
            // make AJAX call
            ajax('GET', url + '?' + params, req, (res) => {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No horrors.');
                } else {
                    listItems(items);
                }
            }, () => {
                showErrorMessage('Cannot load horrors.');
            });
        }
    
        function loadScienceFictions() {
            activeBtn('science-fiction-btn');
    
            // The request parameters
            var url = './history';
            var params = 'user_id=' + user_id;
            var req = JSON.stringify({});
    
            // display loading message
            showLoadingMessage('Loading science fictions...');
    
            // make AJAX call
            ajax('GET', url + '?' + params, req, (res) => {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No science fictions.');
                } else {
                    listItems(items);
                }
            }, () => {
                showErrorMessage('Cannot load science fictions.');
            });
        }
    
        function loadRomantics() {
            activeBtn('romantic-btn');
    
            // The request parameters
            var url = './history';
            var params = 'user_id=' + user_id;
            var req = JSON.stringify({});
    
            // display loading message
            showLoadingMessage('Loading romantics...');
    
            // make AJAX call
            ajax('GET', url + '?' + params, req, (res) => {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No romantics.');
                } else {
                    listItems(items);
                }
            }, () => {
                showErrorMessage('Cannot load romantics.');
            });
        }
    
        function loadActions() {
            activeBtn('action-btn');
    
            // The request parameters
            var url = './history';
            var params = 'user_id=' + user_id;
            var req = JSON.stringify({});
    
            // display loading message
            showLoadingMessage('Loading actions...');
    
            // make AJAX call
            ajax('GET', url + '?' + params, req, (res) => {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No actions.');
                } else {
                    listItems(items);
                }
            }, () => {
                showErrorMessage('Cannot load actions.');
            });
        }

    
        init();
    
    })();