
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "Api/components/evented",
		  "Api/components/templated",
		  "Api/plugins/html!Api/components/popup/popup"],
    
	function (Lang,
			  Dom,
			  Animate,
			  Evented,
			  Templated,
			  Template) {

		var popup = Lang.Declare("Popup", [Evented, Templated], { 

			fadedIn : false,
		
			preCreate : function() {
				this.template = Template;
			},
			
			constructor : function(domNode, options) {			
				if (this.options.width) {
					this.nodes.Container.style.width = this.options.width + "px";
					this.nodes.Container.style.marginLeft = (-1 * this.options.width / 2) + "px";
				}
				
				if (this.options.height) {
					this.nodes.Container.style.height = this.options.height + "px";
					this.nodes.Container.style.marginTop = (-1 * this.options.height / 2)  + "px";
				}
				
				this.nodes.Title.innerHTML = this.options.title;
				
				this.nodes.BtnClose1.addEventListener("click", this.onBtnClose_Click.bind(this));
				this.nodes.BtnClose2.addEventListener("click", this.onBtnClose_Click.bind(this));
			},
			
			postCreate : function() {
				this.nodes.BtnClose2.innerHTML = (Lang.locale == "en" ) ? "Close" : "Fermer" ;
			},
			
			FadeOut : function(instant) {
				if (!!instant) Animate.Remove(this.root, 'Fade');
				
				else Animate.Fade(this.root, false);
				
				this.emit("viewFadedOut");
				
				this.fadedIn = false;
			},
			
			FadeIn : function(instant) {
				if (!!instant) Animate.Remove(this.root, 'Fade');
				
				else Animate.Fade(this.root, true);
				
				this.emit("viewFadedIn");
				
				this.fadedIn = true;
			},
			
			IsFadedOut : function() {
				return !this.fadedIn;
			},
			
			IsFadedIn : function() {
				return this.fadedIn;
			},
			
			onBtnClose_Click : function(ev) {
				this.FadeOut();
			}
		})
		
		return popup;
	})