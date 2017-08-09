
r.define(["Api/util/dom",
		  "Api/util/array",
		  "Api/util/lang",
		  "Api/components/promise"],

	function (dom,
			  array,
			  lang,
			  promise) {
		
		var plugin = {
		
			load: function (name, req, onload, config) {
				var xhr = new XMLHttpRequest();
				
				xhr.open('GET', req.toUrl(name + ".json"));
				
				xhr.onload = function() {				
					var data = JSON.parse(xhr.responseText);
					var files = [];
					var ids = [];
					var aggregate = {};
					
					for (var id in data) {
						ids.push(id);
						files.push("Api/plugins/json!" + data[id]);
					}
					
					r.require(files, function() {
						for (var i = 0; i < arguments.length; i++) {
							aggregate[ids[i]] = arguments[i];
						}
						
						onload(aggregate);
					});
					
				}.bind(this);
				
				xhr.send();
			},
			
			onFilesRetrieved : function(aggregate) {
				debugger;
				
				onload(results);
			}
		}

		return plugin;
	});