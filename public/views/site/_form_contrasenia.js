/*
Archivos que usa :
	+ models/usuario.js
*/
var FormContraseniaView = Backbone.View.extend({
	el: '#lost-form',
	initialize: function(){

	},
	events: {
	    "click #btnEnviarContrasenia": "enviarContrasenia"
	},
	render: function() {
		var data = { };
		var source = $('#contrasenia-template').html();
		var template = Handlebars.compile(source);
		var template_compiled = template(data);
		this.$el.html(template_compiled);
		return this;
	},
	validarCorreoLleno: function(event) {
		if($("#txtContraseniaFormContrasenia").val() == ""){
			$("#lblValidacionContraseniaFormContrasenia").addClass("has-error");
     		$("#lblValidacionContraseniaFormContrasenia").html("Tiene que ingresar un correo");
     		this.model.set({correo_valido : false});
		}
	}, 
	validarCorreoFormato: function(event) {
		   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		   var rpta = re.test($("#txtContraseniaFormContrasenia").val());
		   if(rpta == false){
		   	$("#lblValidacionContraseniaFormContrasenia").addClass("has-error");
     			$("#lblValidacionContraseniaFormContrasenia").html("El correo ingresado no es de un formato válido");
		   	this.model.set({correo_valido : false});
		   }else{
		   	$("#lblValidacionContraseniaFormContrasenia").removeClass("has-error");
     			$("#lblValidacionContraseniaFormContrasenia").html("");
		   	this.model.set({correo_valido : true});
		   }
	}, 
	enviarContrasenia: function(event){
		//this.validarContraseniaIgual();
		this.validarCorreoFormato();
		this.validarCorreoLleno();
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
