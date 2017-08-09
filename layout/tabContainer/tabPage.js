
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/evented"],
    
	function (Lang,
			  Dom,
			  Evented) {

		var TabPage = Lang.Declare("TabPage", [Evented], { 
			
			content : null,
			
			constructor : function(pNode, options) {
				this.options = options || {};
				
				this.root = Dom.Create("div", { "className" : "tab-pane", "jCore-Name" : "div" });
				
				this.nodes = {
					div : this.root
				}
				
				Dom.Place(this.root, pNode);
			},
			
			SetContent : function(content) {
				this.content = content; 
				
				Dom.Place(content, this.nodes.div);
			}
		})
		
		return TabPage;
	})