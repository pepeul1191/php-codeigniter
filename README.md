# Codeigniter - PP

### Tecnologías

+ PHP (5.3+)
+ SQLite3
+ Composer

### Instalación - Despliegue

 	$ composer update

### Para recargar el autoload de clases:

 	$ composer dump-autoload -o

 Thanks/Credits

    Pepe Valdivia: developer Software Web Perú [http://softweb.pe]

### Descipción

Serv

### Rutas

+ GET '/estado_usuario/listar', to Controller_Estado_Usuario#listar
+ GET '/item/listar/menu', to Controller_Item#menu
+ GET '/item/listar_todos', to Controller_Item#listar_todos
+ GET '/item/listar/@subtitulo_id', to Controller_Item#listar
+ POST '/item/guardar', to Controller_Item#guardar
+ GET '/modulo/listar/@sistema_id', to Controller_Modulo#listar
+ GET '/modulo/listar_menu', to Controller_Modulo#listar_menu
+ POST '/modulo/guardar', to Controller_Modulo#guardar
+ GET '/subtitulo/listar/@modulo_id', to Controller_Subtitulo#listar
+ POST '/subtitulo/guardar', to Controller_Subtitulo#guardar
+ GET '/permiso/listar/@sistema_id', to Controller_Permiso#listar
+ GET '/permiso/listar_asociados/@sistema_id/@rol_id', to Controller_Permiso#listar_asociados
+ POST '/permiso/guardar', to Controller_Permiso#guardar
+ GET '/rol/listar/@sistema_id', to Controller_Rol#listar
+ POST '/rol/guardar', to Controller_Rol#guardar
+ POST '/rol/asociar_permisos', to Controller_Rol#asociar_permisos
+ GET '/sistema/listar', to Controller_Sistema#listar
+ GET '/sistema/usuario/@usuario_id', to Controller_Sistema#usuario
+ POST '/sistema/guardar', to Controller_Sistema#guardar
+ POST '/sistema/asociar_usuario', to Controller_Sistema#asociar_usuario
+ GET '/usuario/listar', to Controller_Usuario#listar
+ GET '/usuario/listar_accesos/@usuario_id', to Controller_Usuario#listar_accesos
+ GET '/usuario/listar_permisos/@sistema_id/@usuario_id', to Controller_Usuario#listar_permisos
+ GET '/usuario/listar_roles/@sistema_id/@usuario_id', to Controller_Usuario#listar_roles
+ GET '/usuario/usuario_correo/@usuario_id', to Controller_Usuario#usuario_correo
+ POST '/usuario/asociar_permisos', to Controller_Usuario#asociar_permisos
+ POST '/usuario/asociar_roles', to Controller_Usuario#asociar_roles
+ POST '/usuario/validar', to Controller_Usuario#validar
+ POST '/usuario/nombre_repetido', to Controller_Usuario#validar_nombre_repetido
+ POST '/usuario/correo_repetido', to Controller_Usuario#validar_correo_repetido
+ POST '/usuario/contrasenia_repetida', to Controller_Usuario#contrasenia_repetida
+ POST '/usuario/guardar_usuario_correo', to Controller_Usuario#guardar_usuario_correo
+ POST '/usuario/guardar_contrasenia', to Controller_Usuario#guardar_contrasenia

--- 

#### Fuentes

IDI-ORM y Paris ORM a la base de datos

+ http://idiorm.readthedocs.io/
+ http://paris.readthedocs.io/
	
Framework FlightPHP :

+ http://flightphp.com/

Composer :

+ http://phpenthusiast.com/blog/how-to-autoload-with-composer
