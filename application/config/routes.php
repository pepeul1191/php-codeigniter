<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = 'errorAccess/not_found';
$route['error/access/404'] = 'errorAccess/not_found';
$route['translate_uri_dashes'] = FALSE;
$route['journals'] = 'quinua/estacion/listar';
# ACCESOS
# vistas
$route['accesos']['GET'] = 'accesos/ViewAccesos/index';
# item
$route['accesos/item/listar/(:num)']['GET'] = 'accesos/item/listar/$1';
$route['accesos/item/guardar']['POST'] = 'accesos/item/guardar';
# modulo
$route['accesos/modulo/listar/(:num)']['GET'] = 'accesos/modulo/listar/$1';
$route['accesos/modulo/guardar']['POST'] = 'accesos/modulo/guardar';
# permiso
$route['accesos/permiso/listar/(:num)']['GET'] = 'accesos/permiso/listar/$1';
$route['accesos/permiso/listar_asociados/(:num)/(:num)']['GET'] = 'accesos/permiso/listar_asociados/$1/$2';
$route['accesos/permiso/guardar']['POST'] = 'accesos/permiso/guardar';
# rol
$route['accesos/rol/listar/(:num)']['GET'] = 'accesos/rol/listar/$1';
$route['accesos/rol/guardar']['POST'] = 'accesos/rol/guardar';
$route['accesos/rol/asociar_permisos']['POST'] = 'accesos/rol/asociar_permisos';
# sistema
$route['accesos/sistema/listar']['GET'] = 'accesos/sistema/listar';
$route['accesos/sistema/guardar']['POST'] = 'accesos/sistema/guardar';
# subtitulo
$route['accesos/subtitulo/listar/(:num)']['GET'] = 'accesos/subtitulo/listar/$1';
$route['accesos/subtitulo/guardar']['POST'] = 'accesos/subtitulo/guardar';
# usuario
$route['accesos/usuario/listar']['GET'] = 'accesos/usuario/listar';
$route['accesos/usuario/logs/(:num)']['GET'] = 'accesos/usuario/logs/$1';
$route['accesos/usuario/correo_repetido']['POST'] = 'accesos/usuario/correo_repetido';
$route['accesos/usuario/nombre_repetido']['POST'] = 'accesos/usuario/nombre_repetido';
$route['accesos/usuario/guardar_usuario_correo']['POST'] = 'accesos/usuario/guardar_usuario_correo';
$route['accesos/usuario/obtener_usuario_correo/(:num)']['GET'] = 'accesos/usuario/obtener_usuario_correo/$1';
$route['accesos/usuario/listar_permisos/(:num)/(:num)']['GET'] = 'accesos/usuario/listar_permisos/$1/$2';
$route['accesos/usuario/listar_roles/(:num)/(:num)']['GET'] = 'accesos/usuario/listar_roles/$1/$2';
$route['accesos/usuario/listar_sistemas/(:num)']['GET'] = 'accesos/sistema/usuario/$1';
$route['accesos/usuario/guardar_sistemas']['POST'] = 'accesos/usuario/guardar_sistemas';
$route['accesos/usuario/asociar_roles']['POST'] = 'accesos/usuario/asociar_roles';
$route['accesos/usuario/asociar_permisos']['POST'] = 'accesos/usuario/asociar_permisos';