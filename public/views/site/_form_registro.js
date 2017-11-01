/*
Archivos que usa :
	+ models/usuario.js
*/
var FormRegistroView = Backbone.View.extend({
	el: '#div-registro',
	initialize: function(){

	},
	events: {
	    "keyup #txtUsuario": "validarUsuarioRepetido", 
	    "focusout #txtUsuario": "validarUsuarioLleno", 
	    "keyup #txtCorreo": "validarCorreoRepetido", 
	    "focusout #txtCorreo": "validarCorreoFormato", 
	    "focusout #txtCorreoRepetir": "validarCorreoIgual", 
	    "focusout #txtContrasenia": "validarContraseniaIgual", 
	    "focusout #txtContraseniaRepetir": "validarContraseniaIgual", 
	    "click #btnGuardarPaso1": "GuardarPaso1"
	},
	render: function() {
		var data = { };
		var source = $('#registro-template').html();
		var template = Handlebars.compile(source);
		var template_compiled = template(data);
		this.$el.html(template_compiled);

		return this;
	},
	validarUsuarioRepetido: function(event) {
		var usuario_valido_valor;
     	$.ajax({
     		type: "POST",
     		url: BASE_URL + "registro/validar_usuario_repetido",
     		data: "nombre=" + $("#txtUsuario").val(),
     		async: false,
     		success: function(data){
     			if(data >= 1){
     				$("#txtUsuario").parent().addClass("has-error");
     				$("#txtUsuario").parent().find("span").html("El nombre de usuario registrado ya se encuentra en uso");
     				usuario_valido_valor = false;
     			}else{
     				$("#txtUsuario").parent().removeClass("has-error");
     				$("#txtUsuario").parent().find("span").html("");
     				usuario_valido_valor = true;
     			}
     		},
     		error: function(data){
     			//FALTA MANEJAR EL ERROR DEL AJAX
     		}
     	});
     	this.model.set({usuario_valido : usuario_valido_valor});
	},
	validarUsuarioLleno: function(event) {
		if(this.model.get("usuario_valido") != false){
			if($("#txtUsuario").val() == ""){
				$("#txtUsuario").parent().addClass("has-error");
	      	$("#txtUsuario").parent().find("span").html("Debe ingresar un usuario");
	      	this.model.set({usuario_lleno : false});
			}else{
				$("#txtUsuario").parent().removeClass("has-error");
	      	$("#txtUsuario").parent().find("span").html("");
	      	this.model.set({usuario_lleno : true});
			}
		}
	},
	validarCorreoRepetido: function(event) {
		var correo_valido_valor;
     	$.ajax({
     		type: "POST",
     		url: BASE_URL + "registro/validar_correo_repetido",
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
     	this.model.set({correo_valido : correo_valido_valor});
	},
	validarCorreoIgual: function(event) {
		if($("#txtCorreoRepetir").val() != ""){
			if($("#txtCorreo").val() != $("#txtCorreoRepetir").val()){
				$("#txtCorreoRepetir").parent().addClass("has-error");
      		$("#txtCorreoRepetir").parent().find("span").html("El correo ingresado no coincide con el primero");
      		this.model.set({correo_valido : false});
			}else{
				$("#txtCorreoRepetir").parent().removeClass("has-error");
      		$("#txtCorreoRepetir").parent().find("span").html("");
      		this.model.set({correo_valido : true});
			}
		}
		this.validarCorreoFormato();
	}, 
	validarCorreoLleno: function(event) {
		if($("#txtCorreo").val() == ""){
			$("#txtCorreo").parent().addClass("has-error");
     		$("#txtCorreo").parent().find("span").html("Tiene que ingresar un correo");
     		this.model.set({correo_valido : false});
		}
	}, 
	validarCorreoRepetidoLleno: function(event) {
		if($("#txtCorreoRepetir").val() == ""){
			$("#txtCorreoRepetir").parent().addClass("has-error");
     		$("#txtCorreoRepetir").parent().find("span").html("Tiene que confirmar el correo ingresado");
     		this.model.set({correo_valido : false});
		}
	}, 
	validarContraseniaLleno: function(event) {
		if($("#txtContrasenia").val() == ""){
			$("#txtContrasenia").parent().addClass("has-error");
     		$("#txtContrasenia").parent().find("span").html("Tiene que ingresar su contraseña");
     		this.model.set({contrasenia_valido : false});
		}else{
			$("#txtContrasenia").parent().removeClass("has-error");
     		$("#txtContrasenia").parent().find("span").html("");
     		this.model.set({contrasenia_valido : true});
		}
	}, 
	validarContraseniaIgual: function(event) {
		this.validarContraseniaLleno();
		if($("#txtContrasenia").val() != $("#txtContraseniaRepetir").val()){
			$("#txtContraseniaRepetir").parent().addClass("has-error");
     		$("#txtContraseniaRepetir").parent().find("span").html("La contraseña ingresada no coincide con la primera");
     		this.model.set({contrasenia_valido : false});
		}else{
			$("#txtContraseniaRepetir").parent().removeClass("has-error");
     		$("#txtContraseniaRepetir").parent().find("span").html("");
     		this.model.set({contrasenia_valido : true});
		}
	}, 
	validarContraseniaRepetidoLleno: function(event) {
		if($("#txtContraseniaRepetir").val() == ""){
			$("#txtContraseniaRepetir").parent().addClass("has-error");
     		$("#txtContraseniaRepetir").parent().find("span").html("Tiene que confirmar la contrasña ingresada");
     		this.model.set({contrasenia_valido : false});
		}
	}, 
	validarCorreoFormato: function(event) {
		   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		   var rpta = re.test($("#txtCorreo").val());
		   if(rpta == false){
		   	$("#txtCorreo").parent().addClass("has-error");
     			$("#txtCorreo").parent().find("span").html("El correo ingresado no es de un formato válido");
		   	this.model.set({correo_valido : false});
		   }else{
		   	$("#txtCorreo").parent().removeClass("has-error");
     			$("#txtCorreo").parent().find("span").html("");
		   	this.model.set({correo_valido : true});
		   }
	}, 
	GuardarPaso1: function(event){
		//this.validarContraseniaIgual();
		this.validarUsuarioLleno();
		this.validarCorreoLleno();
		this.validarCorreoRepetidoLleno();
		this.validarContraseniaLleno();
		this.validarContraseniaRepetidoLleno();
		this.validarContraseniaIgual();
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
