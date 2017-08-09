
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/components/evented",
		  "Api/components/templated",
		  "Api/components/promise",
		  "Api/layout/tabContainer/tabPage",
		  "Api/layout/tabContainer/tabNav",
		  "Api/plugins/html!Api/layout/tabContainer/tabContainer"],
    
	function (Lang,
			  Dom,
			  Array,
			  Evented,
			  Templated,
			  Promise,
			  TabPage,
			  TabNav,
			  Template) {

		var TabContainer = Lang.Declare("TabContainer", [Templated, Evented], { 
			
			pages : null,
		
			preCreate : function() {
				this.template = Template;
			},
			
			constructor : function(pNode, options) {
				this.pages = [];
			},

			SetActivePage : function(aPage) {
				Array.ForEach(this.pages, function(page) {
					Dom.RemoveCss(page.nav.root, "active");
					Dom.RemoveCss(page.tab.root, "active");
				});
				
				Dom.AddCss(aPage.nav.root, "active");
				Dom.AddCss(aPage.tab.root, "active");
			},
			
			AddPage : function(title, content) {
				var nav = new TabNav(this.nodes.nav, { title:title });
				var tab = new TabPage(this.nodes.content, { className : "hidden" });
				
				if (content) tab.SetContent(content);
				
				var page = { tab:tab, nav:nav };
				
				nav.on("click", this.onNav_ClickHandler.bind(this, page));
				
				this.pages.push(page);
				
				return page;
			},
			
			onNav_ClickHandler : function(page) {
				this.SetActivePage(page);
			}
		})
		
		return TabContainer;
	})