(function() {

    /**
     * Initialize
     */
    function init() {
        //$('#comedy-btn').bind('click', function() {
            // alert('User clicked on "foo."');
         //  });
        // Register event listeners
        $('all-type-btn').addEventListener('click', loadAllMovies);
        $('search-btn').addEventListener('click', onSearchMovies);
        $('comedy-btn').addEventListener('click', loadComedies);
        $('disaster-btn').addEventListener('click', loadDisasters);
        $('crime-btn').addEventListener('click', loadCrimes);
        $('war-btn').addEventListener('click', loadWars);
        $('horror-btn').addEventListener('click', loadHorrors);
        $('science-fiction-btn').addEventListener('click', loadScienceFictions);
        $('romantic-btn').addEventListener('click', loadRomantics);
        $('action-btn').addEventListener('click', loadActions);
        // initialization
        console.log("init main page");
        loadAllMovies();

        // var welcomeMsg = $('welcome-msg');
        // welcomeMsg.innerHTML = 'Welcome, ' + user_fullname;
    };

    // -----------------------------------
    // Helper Functions
    // -----------------------------------
    
    // Get the modal
    var modal = document.getElementById('login-modal');
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // $(document).ready(function(){
    //     $("form").submit(function(e) {
    //         var ref = $(this).find("[required=required]");
    //         alert('ref');
    //         $(ref).each(function(){
    //             if ( $(this).val() == '' ) {
    //                 alert("Required field should not be blank.");
    //                 $(this).focus();
    //                 e.preventDefault();
    //                 return false;
    //             }
    //         });  
    //         return true;
    //     });
    // });

    document.getElementById("login").onclick = function () {
        location.href = "login";
    };

    document.getElementById("signup").onclick = function () {
        location.href = "signup";
    };

    /**
     * A helper function that makes a navigation button active
     * 
     * @param btnId -
     *            The id of the navigation button
     */
    function getCurChosenMovieType()
    {
        var btns = document.getElementsByClassName('main-nav-btn');

        // deactivate all navigation buttons
        for (var i = 0; i < btns.length; i++) {
            if (btns[i].className.indexOf('active') >= 0)
            {
                return btns[i].getAttribute('tag');
            }
        }

        return "all-type";
    } 

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
    function onSearchMovies()
    {
        // The request parameters
        var url = './search_movies_by_genre';
        var keyWord = $('key_word').value;
        var params = 'genre=' + getCurChosenMovieType() + '&key_word=' + keyWord;
        var req = JSON.stringify({});

        // display loading message
        showLoadingMessage('Searching the movies');
        console.log("search movies");
        // make AJAX call
        ajax('GET', url + '?' + params, req, (res) => {

            var items = JSON.parse(res);

            if (!items || items.length === 0) {
                showWarningMessage('No movies.');
            } else {
                listItems(items);
            }
        }, () => {
            showErrorMessage('Cannot load movies.');
        });
    }

    function loadAllMovies(){
        activeBtn('all-type-btn');

        // The request parameters
        var url = './get_movies_by_genre';
        var params = 'genre=all-type';
        var req = JSON.stringify({});

        // display loading message
        showLoadingMessage('Loading All Type...');

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


    function loadComedies() {
        activeBtn('comedy-btn');

        // The request parameters
        var url = './get_movies_by_genre';
        var params = 'genre=comedy';
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
        var url = './get_movies_by_genre';
        var params = 'genre=disaster';
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
        var url = './get_movies_by_genre';
        var params = 'genre=crime';
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
        var url = './get_movies_by_genre';
        var params = 'genre=war';
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
        var url = './get_movies_by_genre';
        var params = 'genre=horror';
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
        var url = './get_movies_by_genre';
        var params = 'genre=science-fiction';
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
        var url = './get_movies_by_genre';
        var params = 'genre=romantics';
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
        var url = './get_movies_by_genre';
        var params = 'genre=action';
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

   

    /**
     * API #4 Toggle favorite (or visited) items
     * 
     * @param item_id -
     *            The item business id
     * 
     * API end point: [POST]/[DELETE] /Dashi/history request json data: {
     * user_id: 1111, visited: [a_list_of_business_ids] }
     */
    function changeFavoriteItem(item_id) {
        // Check whether this item has been visited or not
        var li = $('item-' + item_id);
        var favIcon = $('fav-icon-' + item_id);
        var favorite = li.dataset.favorite !== 'true';

        // The request parameters
        var url = './favorite';
        var req = JSON.stringify({
            user_id: user_id,
            favorite: item_id
        });
        var method = favorite ? 'POST' : 'DELETE';

        ajax(method, url, req,
            // successful callback
            function(res) {
                var result = JSON.parse(res);

                if (result.result === 'SUCCESS') {
                    li.dataset.favorite = favorite;
                    favIcon.className = favorite ? 'fa fa-heart' : 'fa fa-heart-o';
                }
            });
    }

    function onShowMovies(movie_id)
    {
        // The request parameters
        var url = 'show_movies_by_genre';
        var params = 'id=' + movie_id;
        var req = JSON.stringify({});
        location.href = url + '?' + params;

        // window.open(prev + url + '?' + params);
    }

    // -------------------------------------
    // Create item list
    // -------------------------------------

    /**
     * List items
     * 
     * @param items -
     *            An array of item JSON objects
     */
    function listItems(items) {
        // Clear the current results
        var itemList = $('item-list');
        itemList.innerHTML = '';

        for (var i = 0; i < items.length; i++) {
            addItem(itemList, items[i]);
        }
    }

    /**
     * Add item to the list
     * 
     * @param itemList -
     *            The
     *            <ul id="item-list">
     *            tag
     * @param item -
     *            The item data (JSON object)
     */
    function addItem(itemList, item) {
        var item_id = item._id;

        // create the <li> tag and specify the id and class attributes
        var li = $('li', {
            id: 'item-' + item_id,
            className: 'item'
        });

        // set the data attribute
        li.dataset.item_id = item_id;
        li.dataset.favorite = item.favorite;

        // item image
        if (item.galleries) {
            li.appendChild($('img', {
                src: item.galleries[0]
            }));
        } else {
            li.appendChild($(
                'img', {
                    src: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
                }))
        }
        // section
        var section = $('div', {});

        // title
        var title = $('a', {
            href: item.url,
            target: '_blank',
            className: 'item-name'
        });
        title.innerHTML = item.title;
        title.onclick = function() {
            onShowMovies(item_id);
            return false;
        };

        section.appendChild(title);

        // category
        var category = $('p', {
            className: 'item-category'
        });
        category.innerHTML = 'Category: ' + item.genres.join(', ');
        section.appendChild(category);

        // TODO(vincent). here we might have a problem showing 3.5 as 3.
        // stars
        var stars = $('div', {
            className: 'stars'
        });


        for (var i = 0; i < item.avg_score; i++) {
            var star = $('i', {
                className: 'fa fa-star'
            });
            stars.appendChild(star);
        }

        if (('' + item.avg_score).match(/\.5$/)) {
            stars.appendChild($('i', {
                className: 'fa fa-star-half-o'
            }));
        }

        section.appendChild(stars);

        li.appendChild(section);

        // address
        var date = $('p', {
            className: 'item-address'
        });

        date.innerHTML = item.released_date;
        li.appendChild(date);

        itemList.appendChild(li);
    }

    init();

})();