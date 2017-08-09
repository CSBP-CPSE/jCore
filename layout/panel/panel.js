
r.define(["Api/util/lang",
		  "Api/components/evented",
		  "Api/components/templated",
		  "Api/plugins/html!Api/layout/panel/panel"],
    
	function (Lang,
			  Evented,
			  Templated,
			  Template) {

		var Panel = Lang.Declare("Panel", [Templated, Evented], { 
		
			preCreate : function() {
				this.template = Template;
			},
			
			constructor : function(pNode, options) {

			},
			
			postCreate : function() {
				if (this.options.title) this.nodes.Title.innerHTML = this.options.title;
			},
			
			SetTitle : function(title) {
				this.nodes.Title.innerHTML = title;
			}
		})
		
		return Panel;
	})