//函数主题用来更新电影的内容在UI上面
function updateMovie(imgPath, name, level, category, year, region, language, director, actor, introduction) {
        var img = document.getElementById('MovieImg');
		var nameComponent = document.getElementById('movie_name');
		var levelComponent = document.getElementById('over');
		var yearComponent = document.getElementById('movie_year');
		var regionComponent = document.getElementById('movie_region');
		var languageComponent = document.getElementById('movie_language');
		var directorComponent = document.getElementById('movie_director');
		var actorComponent = document.getElementById('movie_actor');
		var introComponent = document.getElementById('movie_info');
	    console.log(level * 12);
	    img.src = imgPath;
		nameComponent.innerHTML = name;
		levelComponent.style.width = level * 12 + 'px';
		yearComponent.innerHTML = year;
		regionComponent.innerHTML = region;
		languageComponent.innerHTML = language;
		directorComponent.innerHTML = director;
		actorComponent.innerHTML = actor;
		introComponent.innerHTML = introduction;
  }
  
//用法，第3个是电影的评分，1-5之间
updateMovie("https://i.ytimg.com/vi/dWsIGLsybYQ/maxresdefault.jpg", "123", 3.5, "123123", "asdasd", "1ada", "123123", "asdasd", "1ada", "asdasdasdsa");