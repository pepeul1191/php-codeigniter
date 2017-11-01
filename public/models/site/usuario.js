var Usuario = Backbone.Model.extend({
   initialize: function() {
        this.usuario_valido = false;
        this.usuario_lleno = false;
        this.correo_valido = false;
        this.contrasenia_valido = false;
        this.valido = false;
     }, 
     validar: function() {
     	if(this.get("usuario_valido") == true && this.get("correo_valido") == true && this.get("contrasenia_valido") == true && this.get("usuario_lleno") == true){
     		this.set({valido : true});
     	}else{
     		this.set({valido : false});
     	}
     },
     toJSON: function() {
     	var usuario = new Object();
		usuario.usuario = $("#txtUsuario").val();
		usuario.contrasenia = $("#txtContrasenia").val();
		usuario.correo = $("#txtCorreo").val();
     	return usuario;
     }
});