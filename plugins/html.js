
r.define(["Api/util/dom",
		  "Api/util/array",
		  "Api/util/lang"],

	function (dom,
			  array,
			  lang) {
		
		var plugin = {
		
			load: function (name, req, onload, config) {
				var xhr = new XMLHttpRequest();
				
				xhr.open('GET', req.toUrl(name + ".html"));
				
				xhr.onload = function() {
					onload(xhr.responseText);
				}.bind(this);
				
				xhr.send();
			}
		}

		return plugin;
	});