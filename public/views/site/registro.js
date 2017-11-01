/*
Archivos que usa :
	+ views/_form_registro.js
	+ models/usuario.js
*/
var RegistroView = Backbone.View.extend({
	el: '#body-app',
	initialize: function(){
		//this.render();
		//console.log("RegistroView");
	},
	render: function(){
		this.$el.html(this.getTemplate());
		var usuario = new Usuario();
		var formRegistro = new FormRegistroView({model:usuario});
		formRegistro.render();
	}, 
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/registro.html', 
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