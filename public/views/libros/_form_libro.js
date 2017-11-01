var HomeView = Backbone.Marionette.View.extend({
	el: '#body-app',
	template: function(){
		var template = null;
		var html_target = this.$el;
		$.ajax({
		   url: STATICS_URL + 'templates/libros/index.html', 
		   type: "GET", 
		   async: false, 
		   success: function(source) {
		   	template = source;
		   }
		});
		return template;
	}
});