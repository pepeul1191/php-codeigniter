var tablaSistema = new Grid();

var SistemaView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
		//this.render();
		//console.log("initialize");
	},
	render: function() {
		this.$el.html(this.getTemplate());
		return this;
	},
	getTemplate: function() {
		var data = { };
		var template_compiled = null;
		$.ajax({
		   url: STATICS_URL + 'templates/accesos/sistema.html', 
		   type: "GET", 
		   async: false, 
		   success: function(source) {
		   	var template = Handlebars.compile(source);
		   	template_compiled = template(data);
		   }
		});
		return template_compiled;
	},
	mostrarTabla: function(){
		tablaSistema.BorrarTable();
	   	var ajax_dao_sistema = new AjaxPython(); 
	   	ajax_dao_sistema.Constructor("GET", BASE_URL + "accesos/sistema/listar", "", false);
	   	tablaSistema.SetTableId("tablaSistema");
	   	tablaSistema.SetTableObj("tablaSistema");
	   	tablaSistema.SetTableHeader(sistema_array_json_th);
	   	tablaSistema.SetTableBody(sistema_array_json_td, sistema_array_json_btn_td, ajax_dao_sistema);
	   	tablaSistema.SetTableFooter(sistema_array_json_btn, false);
	   	tablaSistema.SetLabelMensaje("#txtMensajeRpta");
	   	tablaSistema.SetURLGuardar(BASE_URL + "accesos/sistema/guardar");

	   	tablaSistema.MostrarTable();
	}
});
