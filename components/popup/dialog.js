
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/modal",
		  "Api/components/promise",
		  "Api/plugins/html!Api/components/popup/dialog"],
    
	function (Lang,
			  Dom,
			  ModalPopup,
			  Promise,
			  Template) {

		var dialogPopup = Lang.Declare("DialogPopup", [ModalPopup], { 
		
			p : null,
			domNode : null,
		
			preCreate : function() {
				this.template = Template;
			},
			
			constructor : function(domNode, options) {
				
			},
				
			postCreate : function() {
				Dom.AddCss(this.root, "Modal");
				
				this.nodes.BtnOk.addEventListener("click", this.onBtnOk_Click.bind(this));
			
				this.nodes.BtnOk.innerHTML = (Lang.locale == "en" ) ? "Yes" : "Oui" ;
				this.nodes.BtnClose2.innerHTML = (Lang.locale == "en" ) ? "No" : "Non" ;
			},
			
			onBtnClose_Click : function(ev) {
				this.FadeOut();
				
				if (this.p) this.p.Reject();
			},
			
			onBtnOk_Click : function(ev) {
				this.FadeOut();
				
				if (this.p) this.p.Resolve();
			},
			
			ShowDialog : function() {
				this.p = new Promise();
				
				this.FadeIn();
				
				return this.p;
			}
		})
		
		return dialogPopup;
	})