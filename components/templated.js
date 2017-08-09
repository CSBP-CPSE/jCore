
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/components/promise"],
    
	function (Lang,
			  Dom,
			  Array,
			  Promise) {

		var Evented = Lang.Declare("Templated", null, { 
						
			constructor : function(pNode, options) {
				this.nodes = {};
				this.options = options || {};
				
				// if (!pNode) throw new Error("When instantiating a templated object, a parent node must be provided (pNode).")
				
				this._pNode = pNode;
				
				this.preCreate();
				
				if (this.template) this.LoadTemplate(this.template);
			},
			
			preCreate : function() {
				// To be implemented by inherited widget
			},
			
			postCreate : function() {
				// To be implemented by inherited widget
			},
			
			LoadTemplate : function(templateString) {
				this.root = this.ReadRoot(templateString);
				this.nodes = this.ReadNamedNodes(this.root);
				
				var def = this.ReadWidgets(this.root);
				
				def.then(widgetsReady.bind(this), widgetsFailure.bind(this));
				
				function widgetsReady(ev) {
					if (this.options.className) Dom.AddCss(this.root, this.options.className)
					
					if (this._pNode) Dom.Place(this.root, this._pNode);

					Lang.Mixin(this.nodes, ev.widgets);
					
					this.postCreate(ev);
				}
				
				function widgetsFailure(ev) {
					debugger;
				}
			},
			
			ReadRoot : function(templateString) {
				var div = document.createElement('div');
				
				div.innerHTML = templateString;
				
				if (div.childNodes.length > 1) throw new Error("A template can only have one root element.")

				return div.childNodes[0];
			},
			
			ReadWidgets : function(root) {
				var def = new Promise();
				
				var wNodes = root.querySelectorAll("[jCore-Widget]");
				var nodes = {};
				var reqs = [];
				
				if (wNodes.length === 0) {
					def.Resolve({ widgets:{} });
					
					return def;
				};
				
				for (var i = 0; i < wNodes.length; i++) {
					var cReq = wNodes[i].attributes.getNamedItem("jcore-widget").value;
					
					if (Array.Find(reqs, function(req) { return req === cReq; })) continue;
					
					reqs.push(cReq);
				}
				
				
				r.require(reqs, function() {
					var classes = {};
					
					for (var i = 0; i < reqs.length; i++) {
						classes[reqs[i]] = arguments[i];
					}
					
					var widgets = this.LoadWidgets(wNodes, classes);
					
					def.Resolve({ widgets:widgets });
				}.bind(this))
				
				return def;
			},
			
			LoadWidgets : function(nodes, classes) {
				var widgets = {};
				
				for (var i = 0; i < nodes.length; i++) {
					var id = nodes[i].attributes.getNamedItem("jcore-widget").value;
					var clss = classes[id];
					var widget = new clss();
					
					this.ConvertToWidget(nodes[i], widget);
					
					var name = widget.root.attributes.getNamedItem("jcore-name");
					
					if (name) widgets[name.value] = widget;
				};
				
				return widgets;
			},
			
			ConvertToWidget : function(node, widget) {
				for (var i = 0; i < node.attributes.length; i++) {
					var attr = node.attributes[i];
					
					widget.root.setAttribute(attr.name, attr.value);
				}
				
				widget.Replace(node);
			},
			
			ReadNamedNodes : function(root) {
				var nNodes = root.querySelectorAll("[jCore-Name]");
				var nodes = {};
				
				for (var i = 0; i < nNodes.length; i++) {
					var id = nNodes[i].attributes.getNamedItem("jcore-name").value
					
					nodes[id] = nNodes[i];
				}
				
				return nodes;
			},
			
			Place : function(pNode) {
				this._pNode = pNode;
				
				Dom.Place(this.root, pNode);
			},
			
			Replace : function(node) {
				this._pNode = node.parentNode;
				
				Dom.Replace(node, this.root);
			}
		})
		
		return Evented;
	})