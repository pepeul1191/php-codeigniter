var tablaLogs = new Grid();

var LogView = Backbone.View.extend({
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
		   url: STATICS_URL + 'templates/accesos/logs.html', 
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
		tablaLogs.BorrarTable();
		var ajax_log = new AjaxPython(); 
		ajax_log.Constructor("GET", BASE_URL + "accesos/usuario/logs/" + usuario_id, "", false);
		tablaLogs.SetTableId("tablaLogs");
		tablaLogs.SetTableObj("tablaLogs");
		tablaLogs.SetTableHeader(array_json_th_log);
		tablaLogs.SetTableBody(array_json_td_log, array_json_btn_td_log, ajax_log);
		tablaLogs.SetTableFooter(array_json_btn_log, false);
		tablaLogs.SetLabelMensaje("#txtMensajeRptaModal");
		//tablaLogs.SetExtraData(array_extra_data_rol);
		//tablaLogs.SetURLGuardar(BASE_URL + "accesos/rol/guardar");

		tablaLogs.MostrarTable();
	}
});