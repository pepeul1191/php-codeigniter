var tablaUsuarioRoles = new Grid();
var tablaUsuarioPermisos = new Grid();

var UsuarioRolPermisoView = Backbone.View.extend({
	el: '#modal-container',
	initialize: function(){
		//this.render();
	},
	events: {
	    "change #cbmSistemas": "cargarRolesPermisos", 
	},
	render: function(usuario_id){
		$("#btnModal").click(); 
		var context = this.getUsuarioSistemas(usuario_id);
		if(context == null){
			window.location.replace(BASE_URL + "error/access/404");
		}
		this.$el.html(this.getTemplate());
		var source = $("#usuario-roles-permisos-template").html();
		var template = Handlebars.compile(source);
		var html = template(context);
		this.$el.html(html);
	}, 
	getTemplate: function() {
		var data = { };
		var template = null;
		$.ajax({
		   url: STATICS_URL + 'templates/accesos/usuario_rol_permiso.html', 
		   type: "GET", 
		   async: false, 
		   success: function(source) { 
			   template = source
		   }
		});
		return template;
	},
	getUsuarioSistemas: function(usuario_id){
		var sistemas_json = { };
		$.ajax({
		   url: BASE_URL + 'accesos/usuario/listar_sistemas/' + usuario_id, 
		   type: "GET", 
		   async: false, 
		   success: function(data) {
		   		if (data == "null"){
		   			sistemas_json = null;
		   		}else{
		   			sistemas_json = JSON.parse(data);
		   		}
		   }
		});
		var rpta = [];
		for(var i = 0; i < sistemas_json.length; i++){
			if(sistemas_json[i]['existe'] == 1){
				var temp = {sistema_id:sistemas_json[i]['id'], nombre:sistemas_json[i]['nombre']};
				rpta.push(temp);
			}
		}
		return {usuario_sistemas:rpta};
	},
	cargarRolesPermisos: function(event) {
		var sistema_id = $(event.currentTarget).val();
		var usuario_id = $("#idUsuario").html();

		if(sistema_id == 'E'){
			$("#txtMensajeRptaModal").addClass("color-rojo");
			$("#txtMensajeRptaModal").removeClass("oculto");
     		$("#txtMensajeRptaModal").html("Debe seleccionar un sistema para poder continuar");
		}else{
			$("#txtMensajeRptaModal").removeClass("color-rojo");
			$("#txtMensajeRptaModal").addClass("oculto");
     		$("#txtMensajeRptaModal").html("");

     		var array_extra_data= [
				{tipo: "label", llave: "usuario_id", id : "idUsuario"}
			];	

     		var usuario_rol_array_json_th = [
				{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
				{titulo:"Nombre",index:"nombre",estilos:"width: 200px;"},
				{titulo:"Existe",index:"existe",estilos:"width: 20px;"}
			];

			var usuario_rol_array_json_td = [
				{tipo:"label_id",estilos:"color: blue; display:none;", index:"id", edicion:""},
				{tipo:"label",estilos:"width:200px;", index:"nombre", edicion:""},
				{tipo:"checkbox",estilos:"width:60px; padding-left: 18px;", index:"existe", edicion:""}
			];

			var usuario_rol_array_json_btn_td = [
			]; 

			var usuario_rol_array_json_btn = [
				{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
			];

			tablaUsuarioRoles.BorrarTable();
			var ajax_dao_usuario_rol = new AjaxPython(); 
			ajax_dao_usuario_rol.Constructor("GET", BASE_URL + "accesos/usuario/listar_roles/" + sistema_id + "/" + usuario_id, "", false);

			tablaUsuarioRoles.SetTableId("tablaUsuarioRoles");
			tablaUsuarioRoles.SetTableObj("tablaUsuarioRoles");
			tablaUsuarioRoles.SetTableHeader(usuario_rol_array_json_th);
			tablaUsuarioRoles.SetTableBody(usuario_rol_array_json_td, usuario_rol_array_json_btn_td, ajax_dao_usuario_rol);
			tablaUsuarioRoles.SetTableFooter(usuario_rol_array_json_btn, false);
			tablaUsuarioRoles.SetURLGuardar(BASE_URL + "accesos/usuario/asociar_roles");
			tablaUsuarioRoles.SetExtraData(array_extra_data);
			tablaUsuarioRoles.SetLabelMensaje("#txtMensajeRptaRolesPermisos");
			tablaUsuarioRoles.MostrarTable();

     		var usuario_permiso_array_json_th = [
				{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
				{titulo:"Nombre",index:"nombre",estilos:"width: 200px;"},
				{titulo:"Llave",index:"llave",estilos:"width: 200px;"},
				{titulo:"Existe",index:"existe",estilos:"width: 20px;"}
			];

			var usuario_permiso_array_json_td = [
				{tipo:"label_id",estilos:"color: blue; display:none;", index:"id", edicion:""},
				{tipo:"label",estilos:"width:200px;", index:"nombre", edicion:""},
				{tipo:"label",estilos:"width:200px;", index:"llave", edicion:""},
				{tipo:"checkbox",estilos:"width:60px; padding-left: 18px;", index:"existe", edicion:""}
			];

			var usuario_permiso_array_json_btn_td = [
			]; 

			var usuario_permiso_array_json_btn = [
				{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
			];

			tablaUsuarioPermisos.BorrarTable();
			var ajax_dao_usario_permiso = new AjaxPython(); 
			ajax_dao_usario_permiso.Constructor("GET", BASE_URL + "accesos/usuario/listar_permisos/" + sistema_id + "/" + usuario_id, "", false);

			tablaUsuarioPermisos.SetTableId("tablaUsuarioPermisos");
			tablaUsuarioPermisos.SetTableObj("tablaUsuarioPermisos");
			tablaUsuarioPermisos.SetTableHeader(usuario_permiso_array_json_th);
			tablaUsuarioPermisos.SetTableBody(usuario_permiso_array_json_td, usuario_permiso_array_json_btn_td, ajax_dao_usario_permiso);
			tablaUsuarioPermisos.SetTableFooter(usuario_permiso_array_json_btn, false);
			tablaUsuarioPermisos.SetURLGuardar(BASE_URL + "accesos/usuario/asociar_permisos");
			tablaUsuarioPermisos.SetExtraData(array_extra_data);
			tablaUsuarioPermisos.SetLabelMensaje("#txtMensajeRptaRolesPermisos");
           
          tablaUsuarioPermisos.MostrarTable();
		}
	}, 
});