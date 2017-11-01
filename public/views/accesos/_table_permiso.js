var tablaPermisos = new Grid();

var array_json_th_permiso = [
	{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
	{titulo:"Nombre",index:"nombre",estilos:"width: 150px;"},
	{titulo:"Llave",index:"llave",estilos:"width: 150px;"},
	{titulo:"Botones",index:"NA",estilos:"width: 10px;"}
];

var array_json_td_permiso = [
	{tipo:"label_id",estilos:"color: blue; display:none", index:"id", edicion:""},
	{tipo:"text",estilos:"width:150px;", index:"nombre", edicion:""},
	{tipo:"text",estilos:"width:150px;", index:"llave", edicion:""},
	{tipo:"botones", index:"botones", edicion:"true"}
];

var array_json_btn_td_permiso = [
	{clase:"fa fa-times",url:"",alt:"Eliminar módulo",estilos:"padding-left: 10px;", operacion:"QuitarFila"}
]; 

var array_json_btn_permiso = [
	{tipo: "agrega_fila", operacion:"AgregarFila", icono: "fa fa-plus", label: "Agregar Registro", clase: "boton-tabla  mootools"},
	{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
];