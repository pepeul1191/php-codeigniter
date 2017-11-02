var CategoriaView = Backbone.View.extend({
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
		   url: STATICS_URL + 'templates/libros/categoria.html', 
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
	   	var ajax_dao_categoria = new AjaxPython(); 
		ajax_dao_categoria.Constructor("GET", BASE_URL + "libros/categoria/listar", "", false);
		tablaCategoria.BorrarTable();
	   	tablaCategoria.SetTableId("tablaCategoria");
	   	tablaCategoria.SetTableObj("tablaCategoria");
	   	tablaCategoria.SetTableHeader(categoria_array_json_th);
	   	tablaCategoria.SetTableBody(categoria_array_json_td, categoria_array_json_btn_td, ajax_dao_categoria);
	   	tablaCategoria.SetTableFooter(categoria_array_json_btn, false);
	   	tablaCategoria.SetLabelMensaje("#txtMensajeRpta");
	   	tablaCategoria.SetURLGuardar(BASE_URL + "libros/categoria/guardar/");

	   	tablaCategoria.MostrarTable();
	}
});
