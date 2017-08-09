
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/components/templated",
		  "Api/components/evented",
		  "Api/plugins/html!Api/components/combox/combox"],
    
	function (Lang,
			  Dom,
			  Array,
			  Templated,
			  Evented,
			  Template) {

		var combox = Lang.Declare("Combox", [Evented, Templated], { 
			
			value : null,
		
			preCreate : function() {
				this.template = Template;
			},
			
			constructor : function(pNode, options) {				
				this.root.addEventListener("change", function(ev) { 
					this.emit("change", ev); 
				}.bind(this));
			},
			
			LoadDomain : function(domain) {
				Array.ForEach(domain.Options(), function(opt) {
					this.root.add(opt);
				}.bind(this));
			},
			
			AddPlaceholder : function(text) {
				var opt = Dom.Create("option", { "className":"placeholder", "text":text, "style":"color:#808080;font-style:italic" });
				
				opt.value = null;
				
				this.root.add(opt);
			},
			
			SelectPlaceholder : function() {
				if (!this.root.options || this.root.options.length == 0) return;
				
				this.root.options[0].selected = true;
				this.root.options[0].disabled = true;
			},
			
			Empty : function() {
				for (var i = this.root.options.length - 1 ; i >= 0 ; i--) this.root.remove(i);
			},
			
			Value : function() {
				return (this.root.value == "null" || this.root.value == "") ? null : this.root.value;
			},
			
			Enable : function(isEnabled) {
				this.root.disabled = !isEnabled;
			}
		})
		
		return combox;
	})