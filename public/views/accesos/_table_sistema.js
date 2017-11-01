var sistema_array_json_th = [
	{titulo:"id", index: "id", estilos:"width: 10px; display:none;"},
	{titulo:"Nombre",index:"nombre",estilos:"width: 250px;"},
    {titulo:"Versión",index:"version",estilos:"width: 100px;"},
    {titulo:"Repositorio",index:"repositorio",estilos:"width: 250px;"},
	{titulo:"Botones",index:"NA",estilos:"width: 80px;"}
];

var sistema_array_json_td = [
	{tipo:"label_id",estilos:"color: blue; display:none", index:"id", edicion:""},
	{tipo:"text",estilos:"width:250px;", index:"nombre", edicion:""},
    {tipo:"text",estilos:"width:100px;", index:"version", edicion:""},
    {tipo:"text",estilos:"width:250px;", index:"repositorio", edicion:""},
	{tipo:"botones", index:"botones", edicion:"true"}
];

var sistema_array_json_btn_td = [
	{clase:"fa fa-chevron-right", href:"#/accesos/sistemas/menu/", alt:"Gestionar Menú",estilos:"padding-left: 2px;", tipo:"btn_td_href", operacion:"IrURL"},
	{clase:"fa fa-list",href:"#/accesos/sistemas/permiso/",alt:"Gestionar Permisos",estilos:"padding-left: 2px;", tipo:"btn_td_href", operacion:"IrURL"},
	{clase:"fa fa-id-card-o",href:"#/accesos/sistemas/rol/",alt:"Gestionar Roles",estilos:"padding-left: 2px;", tipo:"btn_td_href", operacion:"IrURL"},
	{clase:"fa fa-times",url:"",alt:"Eliminar capa",estilos:"padding-left: 2px;", operacion:"QuitarFila"}
]; 

var sistema_array_json_btn = [
	{tipo: "agrega_fila", operacion:"AgregarFila", icono: "fa fa-plus", label: "Agregar Registro", clase: "boton-tabla  mootools"},
	{tipo: "guardar_tabla", operacion:"GuardarTabla", icono: "fa fa-check", label: "Guardar Cambios", clase: "boton-tabla  mootools" }
];