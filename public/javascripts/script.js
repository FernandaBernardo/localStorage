var APP = (function() {
	var module = {};
	module.task = document.querySelector("#task");
	module.add = document.querySelector(".add");
	module.list = document.querySelector(".list");

	module.validate = function(e) {
		e.preventDefault();
		if (module.task.value != "") {
			module.task.className = "";
			module.persist(module.task.value);
			module.task.value = "";
		} else {
			module.task.className = "error";
			module.task.focus();
		}
	};

	module.persist = function(data) {
		if (localStorage && localStorage.getItem("tasks")) {
			var list = JSON.parse(localStorage.getItem("tasks"));
			list.push(data);
			localStorage.setItem("tasks", JSON.stringify(list));
		} else {
			var list = [];
			list.push(data);
			localStorage.setItem("tasks", JSON.stringify(list));
		}
		module.updateList();
	};

	module.updateList = function() {
		if (localStorage && localStorage.tasks) {
			var list = JSON.parse(localStorage.getItem("tasks"));
			module.list.innerHTML = "";
			for (var i = 0; i < list.length; i++) {
				var li = document.createElement("li");
				li.textContent = list[i];
				module.list.appendChild(li);
			}
		}
	};

	module.init = function() {
		module.add.onclick = module.validate;
		module.updateList();
	};

	return {init: module.init};
})();

APP.init();