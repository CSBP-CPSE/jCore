
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/popup",
		  "Api/plugins/html!Api/components/popup/popup"],
    
	function (Lang,
			  Dom,
			  Popup,
			  Template) {

		var modalPopup = Lang.Declare("ModalPopup", [Popup], { 
		
			domNode : null,
		
			preCreate : function() {
				this.template = Template;
			},
			
			constructor : function(domNode, options) {
				
			},
			
			postCreate : function() {
				this.nodes.BtnClose2.innerHTML = (Lang.locale == "en" ) ? "Close" : "Fermer" ;
				
				Dom.AddCss(this.root, "Modal");
			}
		})
		
		return modalPopup;
	})