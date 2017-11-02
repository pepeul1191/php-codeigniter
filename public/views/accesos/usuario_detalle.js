var UsuarioDetalleView = Backbone.View.extend({
	el: '#modal-container',
	initialize: function(){
		//this.render();
	},
	render: function(usuario_id){
		$("#btnModal").click(); 
		var context = this.getUsuario(usuario_id);
		if(context == null){
			window.location.replace(BASE_URL + "error/access/404");
		}
		this.$el.html(this.getTemplate());
		var source = $("#usuario-detalle-template").html();
		var template = Handlebars.compile(source);
		var html = template(context);
		this.$el.html(html);
		var usuario = new Usuario();
		var formUsuarioView = new FormUsuarioView({model:usuario});
		formUsuarioView.render();
	}, 
	getTemplate: function() {
		var data = { };
		var template = null;
		$.ajax({
		   url: STATICS_URL + 'templates/accesos/usuario_detalle.html', 
		   type: "GET", 
		   async: false, 
		   success: function(source) { 
			   template = source
		   }
		});
		return template;
	},
	getUsuario: function(usuario_id){
		var usuario_json = { };
		$.ajax({
		   url: BASE_URL + 'accesos/usuario/obtener_usuario_correo/' + usuario_id, 
		   type: "GET", 
		   async: false, 
		   success: function(data) {
		   		if (data == "null"){
		   			usuario_json = null;
		   		}else{
		   			usuario_json = JSON.parse(data);
		   		}
		   }
		});
		return usuario_json;
	}
});