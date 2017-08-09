
r.define(["Api/components/domain"],

	function (domain) {
		
		var plugin = {
		
			load: function (name, req, onload, config) {
				var xhr = new XMLHttpRequest();
				
				xhr.open('GET', req.toUrl(name + ".json"));
				
				xhr.onload = function() {
					var pojo = JSON.parse(xhr.responseText);
					
					var dom = new domain();
						
					for (var id in pojo) {
						var item = { value:id, text:{}};
						
						for (var lang in pojo[id]) {
							item.text[lang] = pojo[id][lang];
						}
						
						dom.Add(item);
					}
					
					onload(dom);
				};
			
				xhr.send();
			}
		}
		
		return plugin;
	});