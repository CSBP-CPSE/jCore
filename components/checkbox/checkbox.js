
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/components/templated",
		  "Api/components/evented",
		  "Api/plugins/html!Api/components/checkbox/checkbox"],
    
	function (Lang,
			  Dom,
			  Array,
			  Templated,
			  Evented,
			  Template) {

		// Note : A checkbox nested in a label breaks the events chain. The checkbox will not fire click or change and its 
		// checked value will always be the same. One solution is to not nest the checkbox in the label but this requires 
		// that the checkbox have a unique id that can be associated through the htmlfor attribute. The following counter 
		// variable is used to generate this UID.
		var _nChk = 0;
		
		var checkbox = Lang.Declare("Checkbox", [Evented, Templated], { 
			
			_checked : false,
		
			preCreate : function() {
				this.template = Template;
			},
			
			constructor : function(pNode, options) {

			},
			
			postCreate : function() {				
				if (this.options.label != undefined) this.Label(this.options.label);
				
				if (this.options.value != undefined) this.nodes.checkbox.value = this.options.value;
				
				if (this.options.id != undefined) {
					this.nodes.checkbox.id = this.options.id;
					this.nodes.label.htmlFor = this.options.id;
				}
				
				this.nodes.checkbox.addEventListener("change", function(ev) { 
					this.emit("change", ev); 
				}.bind(this));
				
				this.nodes.checkbox.addEventListener("click", function(ev) { 
					this.emit("click", ev); 
				}.bind(this));
			},
			
			Id : function(value) {
				if (value != undefined) {
					this.nodes.checkbox.id = value;
					this.nodes.label.htmlFor = value;
				}
				
				else return this.nodes.checkbox.id;
			},
			
			Label : function(value) {
				if (value != undefined) this.nodes.label.innerHTML = value;
				
				else return this.nodes.label.innerHTML;
			},
			
			Checked : function(value) {
				if (value != undefined) this.nodes.checkbox.checked = value;
				
				else return this.nodes.checkbox.checked;
			},
			
			Value : function(value) {
				if (value != undefined) this.nodes.checkbox.value = value;
				
				else return this.nodes.checkbox.value;
			},
			
			Disable : function() {
				Dom.AddCss(this.root, "disabled");
				
				this.nodes.checkbox.disabled = true;
			},
			
			Enable : function() {
				Dom.RemoveCss(this.root, "disabled");
				
				this.nodes.checkbox.disabled = false;
			},
			
			IsDisabled : function() {
				return this.nodes.checkbox.disabled;
			}
		})
		
		return checkbox;
	})