var BuscarView = Backbone.View.extend({
	el: '#body-app',
	initialize: function(){
		//this.render();
		//console.log("initialize");
	},
	render: function() {
		this.getTemplate()
		//this.$el.html(this.getTemplate());
		//$("#targeto").html(this.getTemplate());
		console.log("render???");
		return this;
	},
	getTemplate: function() {
		var data = { BASE_URL: BASE_URL };
		var template_compiled = null;
		var html_target = this.$el;
		$.ajax({
		   url: STATICS_URL + 'templates/buscar.html', 
		   type: "GET", 
		   async: false, 
		   success: function(source) {
		   	html_target.html(source);
				var template = Handlebars.compile($('#buscar-template').html());
				template_compiled = template(data);
				$("#targeto").html(template_compiled);
		   }
		});
		return template_compiled;
	}
});