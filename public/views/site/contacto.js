var ContactoView = Backbone.View.extend({
	el: '#body-app',
	initialize: function(){
		//this.render();
		//console.log("initialize");
	},
	render: function() {
		this.$el.html(this.getTemplate());
		return this;
	},
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/contacto.html', 
		   type: "GET", 
		   async: false, 
		   success: function(source) {
		   	var template = Handlebars.compile(source);
		   	template_compiled = template(data);
		   }
		});
		return template_compiled;
	}
});


/*

	render: function() {
		var data = { };
		var source = $('#ConcatoTemplate').html();
		var template = Handlebars.compile(source);
		var template_compiled = template(data);
		console.log("RENDER???? 2");
		this.$el.html(template_compiled);
		console.log("RENDER???? 1");
		 return this;
	}
*/