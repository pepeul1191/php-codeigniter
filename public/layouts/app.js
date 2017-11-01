/*! layouts/site.js 
	variables : BASE_URL, STATICS_URL, MODULOS_JSON, DATA
*/

$( document ).ready(function() {
	var home_template = $("#template").html();
	var template = Handlebars.compile(home_template);

	Handlebars.registerPartial("header", $("#header-template").html());
	Handlebars.registerPartial("breadcrumb", $("#breadcrumb-template").html());
	Handlebars.registerPartial("contenido", $("#contenido-template").html());
	Handlebars.registerPartial("yield", $("#yield").html());
	Handlebars.registerPartial("footer", $("#footer-template").html());

	var data = {
		'BASE_URL' : BASE_URL, 
		'STATICS_URL' : STATICS_URL,
		'DATA' : DATA,
		'ITEMS_JSON' : ITEMS_JSON
	};
	var template_compiled = template(data);

	$("#app").html(template_compiled);

	$(".dropdown").click(function(e) {
		var url = $(e.currentTarget).children().eq(0).attr("href");
		window.location.href = url;
	});
});

Handlebars.registerHelper( "menuModulos", function (){
	var rpta = '';
	MODULOS_JSON.forEach(function(modulo) {
		if (DATA['modulo'] == modulo['nombre']){
			rpta = rpta + "<li class='dropdown active'><a href='" + BASE_URL + modulo['url'] + "' class='dropdown-toggle' data-toggle='dropdown'>" + modulo['nombre'] + "</a></li>";
		}else{
			rpta = rpta + "<li class='dropdown'><a href='" + BASE_URL + modulo['url'] + "' class='dropdown-toggle' data-toggle='dropdown'>" + modulo['nombre'] + "</a></li>"; 
		}
		
	});
	return rpta;    
});

Handlebars.registerHelper( "menuSubModulos", function (){
	var rpta = '';
	ITEMS_JSON.forEach(function(submodulo) {
	    rpta = rpta + "<li class='list-group-item list-toggle'><span>" + submodulo['subtitulo'] + "</span>";
		rpta = rpta + "<ul id='collapse-forms' class='collapse in' aria-expanded='true'>";
	    submodulo['items'].forEach(function(item){
			rpta = rpta + "<li class='list-group-item list-group-elemento'><a href='"+ BASE_URL + item['url']  + "'>" + item['item'] + "</a></li>";
		});
		rpta = rpta + "</ul></li>";
	});

	return rpta;    
});

Handlebars.registerHelper('getValue', function(obj, key) {
    return obj[key];
});