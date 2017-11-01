var tablaRoles = new Grid();

var array_json_th_rol = [
	{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
	{titulo:"Nombre",index:"nombre",estilos:"width: 250px;"},
	{titulo:"Botones",index:"NA",estilos:"width: 80px;"}
];

var array_json_td_rol = [
	{tipo:"label_id",estilos:"color: blue; display:none", index:"id", edicion:""},
	{tipo:"text",estilos:"width:250px;", index:"nombre", edicion:""},
	{tipo:"botones", index:"botones", edicion:"true"}
];

var array_json_btn_td_rol = [
	{clase:"fa fa-chevron-right", alt:"Gestionar Menú",estilos:"padding-left: 2px;", operacion:"MostrarRoles"},
	{clase:"fa fa-times",url:"",alt:"Eliminar capa",estilos:"padding-left: 2px;", operacion:"QuitarFila"}
]; 

var array_json_btn_rol = [
	{tipo: "agrega_fila", operacion:"AgregarFila", icono: "fa fa-plus", label: "Agregar Registro", clase: "boton-tabla  mootools"},
	{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
];

var array_extra_data_modulo = [
	{tipo: "label", llave: "sistema_id", id : "sistema_id"}
];

var MostrarRoles = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    }, 
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        //console.log("MostrarRoles");
        var id_rol = thisDOM.parent().parent().children(0).children(0).html();

        if(operacion == "MostrarRoles"){
        	tablaPermisos.BorrarTable();

        	var array_json_th = [
				{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
				{titulo:"Nombre",index:"nombre",estilos:"width: 200px;"},
				{titulo:"Llave",index:"llave",estilos:"width: 200px;"},
				{titulo:"Existe",index:"existe",estilos:"width: 20px;"}
			];

			var array_json_td = [
				{tipo:"label_id",estilos:"color: blue; display:none;", index:"id", edicion:""},
				{tipo:"label",estilos:"width:200px;", index:"nombre", edicion:""},
				{tipo:"label",estilos:"width:200px;", index:"llave", edicion:""},
				{tipo:"checkbox",estilos:"width:60px; padding-left: 18px;", index:"existe", edicion:""}
			];

			var array_json_btn_td = [
			]; 

			var array_json_btn = [
				{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
			];

			var array_extra_data = [
				{tipo: "label", llave: "id_rol", id : "idRol"}
			];
			
			var ajax_dao_permisos = new AjaxPython(); 
			ajax_dao_permisos.Constructor("GET", BASE_URL + "accesos/permiso/listar_asociados/" + $("#txtIdeSistema").html() + "/" + id_rol, "", false);

			tablaPermisos.SetTableId("tablaPermisos");
			tablaPermisos.SetTableObj("tablaPermisos");
			tablaPermisos.SetTableHeader(array_json_th);
			tablaPermisos.SetTableBody(array_json_td, array_json_btn_td, ajax_dao_permisos);
			tablaPermisos.SetTableFooter(array_json_btn, false);
			tablaPermisos.SetURLGuardar(BASE_URL + "accesos/rol/asociar_permisos");
			tablaPermisos.SetExtraData(array_extra_data);
			tablaPermisos.SetLabelMensaje("#txtMensajeRptaModal");

			$("#idRol").html(id_rol);
           
          tablaPermisos.MostrarTable();
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

$(document).on("click", ".mootools", function() {
    var objeto = eval(this.get("objeto"));
    var eslabon_1 = new MostrarRoles();

    var operacion = this.get("operacion"); console.log(operacion);

    eslabon_1.EjecutarOperacion(operacion, $(this), objeto);
    return false;
});