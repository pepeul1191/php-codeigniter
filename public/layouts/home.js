/*! layouts/site.js 
	variables : BASE_URL, STATICS_URL, MODULOS_JSON, DATA
*/

$( document ).ready(function() {
	$("#btn-to-navbar").click(function(){
		$('html, body').animate({
            scrollTop: $(".navbar").offset().top
        }, 1000);
	});

	var home_template = $("#header-template").html();
	var template = Handlebars.compile(home_template);

	Handlebars.registerPartial("menu_modulos", $("#menu-modulos").html());
	Handlebars.registerPartial("yield", $("#yield").html());
	Handlebars.registerPartial("menu_submodulos", $("#menu-submodulos").html());

	var data = {
		'BASE_URL' : BASE_URL, 
		'STATICS_URL' : STATICS_URL,
		'DATA' : DATA
	};
	var template_compiled = template(data);

	$("#header-app").html(template_compiled);
});

Handlebars.registerHelper( "menuModulos", function (){
	var rpta = '';
	MODULOS_JSON.forEach(function(modulo) {
	    rpta = rpta + '<li><a href="' + BASE_URL + modulo['url'] + '">' + modulo['nombre'] + '</a></li>';
	});
	return rpta;    
});

Handlebars.registerHelper( "menuSubmodulos", function (){
	var rpta = '';
	//console.log(SUBMODULOS_JSON);
	ITEMS_JSON.forEach(function(submodulo) {
		//console.log(submodulo);
	    rpta = rpta + "<li class='list-group-item list-group-item-titulo'>" + submodulo.subtitulo + "</li>";
	    //<a href="#" class="list-group-item">Cras justo odio</a>
	    submodulo.items.forEach(function(item){
	    		rpta = rpta + "<li class='list-group-item list-group-elemento'><a href='"+ BASE_URL + item.url  + "'>" + item.item + "</a></li>";
	    });
	});
	return rpta;    
});

Handlebars.registerHelper('getValue', function(obj, key) {
    return obj[key];
});