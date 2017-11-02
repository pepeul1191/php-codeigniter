/*
Archivos que usa :
	+ 
*/
var PermisoView = Backbone.View.extend({
	el: '#modal-container',
	initialize: function(){
		//this.render();
		console.log("initialize");
	},
	render: function(){
		$("#btnModal").click(); 
		this.$el.html(this.getTemplate());
	}, 
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/accesos/permiso.html', 
		   type: "GET", 
		   async: false, 
		   success: function(source) {
		   	var template = Handlebars.compile(source);
		   	template_compiled = template(data);
		   }
		});
		return template_compiled;
	},
	mostrarTabla: function(sistema_id){
		var array_extra_data= [
			{tipo: "label", llave: "sistema_id", id : "txtIdeSistema"}
		];	

		tablaPermisos.BorrarTable();
		var ajax_permiso = new AjaxPython(); 
		ajax_permiso.Constructor("GET", BASE_URL + "accesos/permiso/listar/" + sistema_id, "", false);
		tablaPermisos.SetTableId("tablaPermisos");
		tablaPermisos.SetTableObj("tablaPermisos");
		tablaPermisos.SetTableHeader(array_json_th_permiso);
		tablaPermisos.SetTableBody(array_json_td_permiso, array_json_btn_td_permiso, ajax_permiso);
		tablaPermisos.SetTableFooter(array_json_btn_permiso, false);
		tablaPermisos.SetLabelMensaje("#txtMensajeRptaModal");
		tablaPermisos.SetExtraData(array_extra_data);
		tablaPermisos.SetURLGuardar(BASE_URL + "accesos/permiso/guardar");

	   	tablaPermisos.MostrarTable();
	}
});