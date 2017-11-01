var tablaUsuarioSistema = new Grid();

var UsuarioSistemaView = Backbone.View.extend({
	el: '#modal-container',
	initialize: function(){
		//this.render();
		//console.log("initialize");
	},
	render: function() {
		$("#btnModal").click(); 
		this.$el.html(this.getTemplate());
	},
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/accesos/usuario_sistema.html', 
		   type: "GET", 
		   async: false, 
		   success: function(source) {
			   	var template = Handlebars.compile(source);
			   	template_compiled = template(data);
		   }
		});
		return template_compiled;
	},
	mostrarTabla: function(usuario_id){
		var array_extra_data_usuario = [
			{tipo: "label", llave: "usuario_id", id : "idUsuario"}
		];	

		tablaUsuarioSistema.BorrarTable();
	   	var ajax_dao_usuario_sistema = new AjaxPython(); 
	   	ajax_dao_usuario_sistema.Constructor("GET", BASE_URL + "accesos/usuario/listar_sistemas/" + usuario_id, "", false);
	   	tablaUsuarioSistema.SetTableId("tablaUsuarioSistema");
	   	tablaUsuarioSistema.SetTableObj("tablaUsuarioSistema");
	   	tablaUsuarioSistema.SetTableHeader(usuario_sistema_array_json_th);
	   	tablaUsuarioSistema.SetTableBody(usuario_sistema_array_json_td, usuario_sistema_array_json_btn_td, ajax_dao_usuario_sistema);
	   	tablaUsuarioSistema.SetTableFooter(usuario_sistema_array_json_btn, false);
	   	tablaUsuarioSistema.SetExtraData(array_extra_data_usuario);
	   	tablaUsuarioSistema.SetLabelMensaje("#txtMensajeRptaModal");
	   	tablaUsuarioSistema.SetURLGuardar(BASE_URL + "accesos/usuario/guardar_sistemas");

	   	tablaUsuarioSistema.MostrarTable();
	}
});
