var usuario_array_json_th = [
	{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
	{titulo:"Usuario",index:"usuario",estilos:"width: 200px;"},
	{titulo:"Correo",index:"correo",estilos:"width: 200px;"},
	{titulo:"Último Login",index:"momento",estilos:"width: 200px;"},
	{titulo:"Botones",index:"NA",estilos:"width: 90px;"}
];

var usuario_array_json_td = [
	{tipo:"label_id",estilos:"color: blue; display:none", index:"id", edicion:""},
	{tipo:"label",estilos:"width:200px;", index:"usuario", edicion:""},
	{tipo:"label",estilos:"width:200px;", index:"correo", edicion:""},
	{tipo:"label",estilos:"width:200px;", index:"momento", edicion:""},
	{tipo:"botones", index:"botones", edicion:"true"}
];

var usuario_array_json_btn_td = [
      {clase:"fa fa-thumb-tack", href:"#/accesos/usuario/logs/",alt:"Ver logs de ingreso",estilos:"padding-left: 8px;", operacion:"IrURL"},
      {clase:"fa fa-pencil", href:"#/accesos/usuario/editar/",alt:"Editar usuario",estilos:"padding-left: 8px;", operacion:"IrURL"},
      {clase:"fa fa-laptop", href:"#/accesos/usuario/sistemas/",alt:"Asociar Sistemas",estilos:"padding-left: 8px;", operacion:"IrURL"},
      {clase:"fa fa-list", href:"#/accesos/usuario/roles_permisos/",alt:"Asociar Roles y Permisos",estilos:"padding-left: 8px;", operacion:"IrURL"}, 
      {clase:"fa fa-envelope-o", url:"#",alt:"Enviar contraseña a su correo",estilos:"padding-left: 8px;", operacion:"EnviarContrasenia"}
]; 

var usuario_array_json_btn = [
	{tipo: "agrega_fila", operacion:"AgregarFila", icono: "fa fa-plus", label: "Agregar Registro", clase: "boton-tabla  mootools"},
	{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
];

var EnviarContrasenia = new Class({
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
        var id_rol = thisDOM.parent().parent().children(0).children(0).html();

        if(operacion == "EnviarContrasenia"){
        	var id_usuario = thisDOM.parent().parent().children().eq(0).children().eq(0).html();
	       alert("ENVIAR CORREO!!! id_usuario = " +  id_usuario);
           //ObservadorConcreto.NotificarObservadores(objeto.observador, tipo_arreglo, id_fila);
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
    var eslabon_1 = new EnviarContrasenia();
    var operacion = this.get("operacion"); console.log(operacion);

    eslabon_1.EjecutarOperacion(operacion, $(this), objeto);
});