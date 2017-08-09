
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array"],
    
	function (Lang,
			  Dom,
			  Array) {

		var domain = Lang.Declare("Domain", null, { 
		
			items : null,
			
		
			constructor : function() {
				this.items = [];
			},
		
			Add : function(item) {
				this.items.push(item);
			},
			
			Sort : function(locale) {
				var dom = new domain();
				
				if (!locale) locale = Lang.locale;
				
				dom.items = Array.Sort(this.items, function(item) { return item.text[locale]; });
				
				return dom;
			},
			
			Filter : function(delegate) {
				var dom = new domain();
				
				dom.items = Array.Filter(this.items, delegate);
				
				return dom;
			},
			
			List : function(locale) {
				if (!locale) locale = Lang.locale;
				
				return Array.Map(this.items, function(item) {
					return {
						value : item.value,
						text  : item.text[locale]
					}
				});
			},
			
			Options : function(locale) {
				if (!locale) locale = Lang.locale;
				
				return Array.Map(this.items, function(item) {
					return Dom.Create("option", { "text":item.text[locale], "value":item.value })
				});
			}
		});
		
		return domain;
	});