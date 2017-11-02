var autor_array_json_th = [
	{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
	{titulo:"Nombre",index:"nombre",estilos:"width: 250px;"},
	{titulo:"Botones",index:"NA",estilos:"width: 80px;"}
];

var autor_array_json_td = [
	{tipo:"label_id",estilos:"color: blue; display:none", index:"id", edicion:""},
	{tipo:"text",estilos:"width:250px;", index:"nombre", edicion:""},
	{tipo:"botones", index:"botones", edicion:"true"}
];

var autor_array_json_btn_td = [
	{clase:"fa fa-times",url:"",alt:"Eliminar capa",estilos:"padding-left: 30px;", operacion:"QuitarFila"}
]; 

var autor_array_json_btn = [
	{tipo: "agrega_fila", operacion:"AgregarFila", icono: "fa fa-plus", label: "Agregar Registro", clase: "boton-tabla  mootools"},
	{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
];

var tablaAutor = new Grid();