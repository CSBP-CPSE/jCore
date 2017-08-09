
r.define([],

    function () {

		return {
			Find : function(array, delegate) {
				if (!array) return null;
				
				for (var i=0; i < array.length; i++) {
					if (delegate(array[i])) return array[i];
				}
				
				return null;
			},
			
			Filter : function(array, delegate) {
				if (!array) return null;
				
				var filtered = [];
				
				for (var i=0; i < array.length; i++) {
					if (delegate(array[i])) filtered.push(array[i]);
				}
				
				return filtered;
			},
			
			FindIndex : function(array, delegate) {
				if (!array) return null;
				
				for (var i=0; i < array.length; i++) {
					if (delegate(array[i])) return i;
				}
				
				return null;
			},
			
			Contains : function(array, value) {
				if (!array) return false;
				
				for (var i=0; i < array.length; i++) { 
					if (array[i] === value) return true;
				}
				
				return false;
			},
			
			ForEach : function(array, delegate) {
				for (var i in array) {
					delegate(array[i], i);
				}
			},
			
			Map : function(array, delegate) {
				var arr = [];
				
				for (var i in array) {
					arr.push(delegate(array[i], i));
				}
				
				return arr;
			},
			
			Join : function(array, separator, delegate) {
				var s = [];
				
				this.ForEach(array, function(item) {
					s.push(delegate(item));
				});
				
				return s.join(separator);
			},
			
			Sort : function(array, delegate, desc) {
				
				return array.sort((!!desc) ? descending : ascending);
				
				function ascending(a, b) {
					if (delegate(a) == null && delegate(b) == null) return 0;
					if (delegate(a) == null) return 1;
					if (delegate(b) == null) return -1;
			
					if (delegate(a) < delegate(b)) return -1;
					if (delegate(a) > delegate(b)) return 1;
					return 0; 
				}
				
				function descending(a, b) {
					if (delegate(a) == null && delegate(b) == null) return 0;
					if (delegate(a) == null) return 1;
					if (delegate(b) == null) return -1;
					
					if (delegate(a) > delegate(b)) return -1;
					if (delegate(a) < delegate(b)) return 1;
					return 0; 
				}
			},
			
			Convert : function(array, delegate) {
				for (var i in array) {
					array[i] = delegate(array[i], i);
				}
			},
			
			Index : function(array, delegate) {
				var index = {};
				
				for (var i in array) { 
					var key = delegate(array[i]);
					
					index[key] = array[i];
				}
				
				return index;
			}
		}
	});