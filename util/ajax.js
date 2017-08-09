 r.define(["Api/components/promise"],

    function (Promise) {

		return {
		
			Send : function(url, method, async, data, headers) {
				var p = new Promise();
				var query = [];
				var xhttp = new XMLHttpRequest();
				
				xhttp.onreadystatechange = function() {
					if (this.readyState != 4) return;
				
					if (this.status == 200) p.Resolve(this.responseText);
					
					else p.Reject({ status:this.status, message:this.responseText });
				};
				
				var _async = (async === undefined) ? false : true;
				
				xhttp.open(method || "GET", url, _async);
				
				if (headers) {
					for (var id in headers) xhttp.setRequestHeader(id, headers[id]);
				}
				
				if (method == "POST") {

					for (var id in data) {
						query.push(id + "=" + data[id]);
					}
					
					var payload = (data) ? JSON.stringify(data) : null ;
					
					xhttp.send(payload);
				}
				
				else xhttp.send();
				
				return p;
			},
			
			Post : function(url, data) {
				var headers = { "Content-type": "application/x-www-form-urlencoded" };
				
				return this.Send(url, "POST", true, data);
			},
			
			Get : function(url) {				
				return this.Send(url, "GET", true, null);
			},
			
			Put : function(url) {				
				return this.Send(url, "PUT", true, null);
			}
		}
	});