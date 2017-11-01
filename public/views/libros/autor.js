var AutorView = Backbone.View.extend({
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
		   url: STATICS_URL + 'templates/libros/autor.html', 
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
	   	var ajax_dao_autor = new AjaxPython(); 
		ajax_dao_autor.Constructor("GET", BASE_URL + "libros/autor/listar", "", false);
		tablaAutor.BorrarTable();
	   	tablaAutor.SetTableId("tablaAutor");
	   	tablaAutor.SetTableObj("tablaAutor");
	   	tablaAutor.SetTableHeader(autor_array_json_th);
	   	tablaAutor.SetTableBody(autor_array_json_td, autor_array_json_btn_td, ajax_dao_autor);
	   	tablaAutor.SetTableFooter(autor_array_json_btn, false);
	   	tablaAutor.SetLabelMensaje("#txtMensajeRpta");
	   	tablaAutor.SetURLGuardar(BASE_URL + "libros/autor/guardar/");

	   	tablaAutor.MostrarTable();
	}
});
