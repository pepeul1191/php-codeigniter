/*
Archivos que usa :
	+ views/_form_login.js
	+ views/_form_contrasenia.js
	+ models/usuario.js
*/
var LoginView = Backbone.View.extend({
	el: '#modal-container',
	initialize: function(){
		//this.render();
		console.log("initialize");
	},
	render: function(){
		$("#btnModal").click(); 
		this.$el.html(this.getTemplate());
		var usuario = new Usuario();
		var formLogin = new FormLoginView({model:usuario});
		var formContrasenia = new FormContraseniaView({model:usuario});
		formLogin.render(); 
		formContrasenia.render();
	}, 
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/login.html', 
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