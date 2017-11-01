/*
Archivos que usa :
	+ models/usuario.js
*/
var FormLoginView = Backbone.View.extend({
	el: '#login-form',
	initialize: function(){

	},
	events: {
	    "click #btnIngresar": "ingresar"
	},
	render: function() {
		var data = { };
		var source = $('#login-template').html();
		var template = Handlebars.compile(source);
		var template_compiled = template(data);
		this.$el.html(template_compiled);
		return this;
	},
	validarUsuarioLleno: function(event) {
		if(this.model.get("usuario_valido") != false){
			if($("#txtLoginFormUsuario").val() == ""){
				$("#lblValidacionLoginFormUsuario").addClass("has-error");
	      	$("#lblValidacionLoginFormUsuario").html("Debe ingresar un usuario");
	      	this.model.set({usuario_lleno : false});
			}else{
				$("#lblValidacionLoginFormUsuario").removeClass("has-error");
	      	$("#lblValidacionLoginFormUsuario").html("");
	      	this.model.set({usuario_lleno : true});
			}
		}
	},
	validarContraseniaLleno: function(event) {
		if($("#txtLoginFormContrasenia").val() == ""){
			$("#lblValidacionLoginFormContrasenia").addClass("has-error");
     		$("#lblValidacionLoginFormContrasenia").html("Tiene que ingresar su contraseña");
     		this.model.set({contrasenia_valido : false});
		}else{
			$("#lblValidacionLoginFormContrasenia").removeClass("has-error");
     		$("#lblValidacionLoginFormContrasenia").html("");
     		this.model.set({contrasenia_valido : true});
		}
	}, 
	ingresar: function(event){
		//this.validarContraseniaIgual();
		this.validarUsuarioLleno();
		this.validarContraseniaLleno();
		this.model.validar();
		if(this.model.get("valido") == true){
			console.log(this.model.toJSON());
			/*
			$.ajax({
      		type: "POST",
      		url: BASE_URL + "registro/guardar_usuario",
      		data: "correo=" + $("#txtCorreo").val(),
      		async: false,
      		success: function(data){
      			if(data >= 1){
      				$("#txtCorreo").parent().addClass("has-error");
      				$("#txtCorreo").parent().find("span").html("El correo ya se encuentra asociado a un usuario registrado");
      				correo_valido_valor = false;
      			}else{
      				$("#txtCorreo").parent().removeClass("has-error");
      				$("#txtCorreo").parent().find("span").html("");
      				correo_valido_valor = true;
      			}
      		},
      		error: function(data){
      			//FALTA MANEJAR EL ERROR DEL AJAX
      		}
      	});
			*/
		}else{
			
		}
	}
});
