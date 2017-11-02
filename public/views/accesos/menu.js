/*
Archivos que usa :
	+ 
*/
var MenuView = Backbone.View.extend({
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
		   url: STATICS_URL + 'templates/accesos/menu.html', 
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
		tablaModulos.BorrarTable();
		var array_extra_data_modulo = [
			{tipo: "label", llave: "sistema_id", id : "txtIdeSistema"}
		];	
		var ajax_modulo = new AjaxPython(); 
		ajax_modulo.Constructor("GET", BASE_URL + "accesos/modulo/listar/" + sistema_id, "", false);
	   	tablaModulos.SetTableId("tablaModulos");
	   	tablaModulos.SetTableObj("tablaModulos");
	   	tablaModulos.SetTableHeader(array_json_th_modulo);
	   	tablaModulos.SetTableBody(array_json_td_modulo, array_json_btn_td_modulo, ajax_modulo);
	   	tablaModulos.SetTableFooter(array_json_btn_modulo, false);
	   	tablaModulos.SetLabelMensaje("#txtMensajeRptaModal");
	   	tablaModulos.SetExtraData(array_extra_data_modulo);
	   	tablaModulos.SetURLGuardar(BASE_URL + "accesos/modulo/guardar");

	   	tablaModulos.MostrarTable();
	}
});