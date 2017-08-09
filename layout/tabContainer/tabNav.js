
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/evented"],
    
	function (Lang,
			  Dom,
			  Evented) {

		var TabNav = Lang.Declare("TabNav", [Evented], { 
			
			constructor : function(pNode, options) {
				this.options = options || {};
				
				this.root = Dom.Create("li", { "jCore-Name" : "li" });
				
				this.nodes = {
					a  : Dom.Create("a", { "jCore-Name" : "a", "data-toggle" : "tab" }, this.root),
					li : this.root
				}
				
				this.nodes.a.innerHTML = this.options.title;
				
				this.nodes.a.addEventListener("click", this.onAnchor_ClickHandler.bind(this));
				
				Dom.Place(this.root, pNode);
			},
			
			onAnchor_ClickHandler : function(ev) {
				this.emit("click", { sender:this });
			}
		})
		
		return TabNav;
	})