var Usuario = Backbone.Model.extend({
    initialize: function() {
        this.usuario_valido = false;
        this.usuario_lleno = false;
        this.correo_valido = false;
        this.contrasenia_valido = false;
        this.datos_generales_valido = false;
        this.datos_contrasenias_valido = false;
    }, 
    validarDatosGenerales: function() {
        if(this.get("usuario_valido") == true && this.get("correo_valido") == true && this.get("usuario_lleno") == true){
            this.set({datos_generales_valido : true});
        }else{
            this.set({datos_generales_valido : false});
        }
    },
    validarContrasenias: function() {
        if(this.get("contrasenia_valido") == true){
            this.set({datos_contrasenias_valido : true});
        }else{
            this.set({datos_contrasenias_valido : false});
        }
    },
    datosGeneralesToJSON: function() {
        var usuario = new Object();
        usuario.id = $("#idUsuario").html();
        usuario.usuario = $("#txtUsuario").val();
        usuario.correo = $("#txtCorreo").val();
        return usuario;
    },
    datosContraseniasToJSON: function() {
        var usuario = new Object();
        usuario.id = $("#idUsuario").html();
        usuario.contrasenia = $("#txtContraseniaNueva").val();
        return usuario;
    },
});