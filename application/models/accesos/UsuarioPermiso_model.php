<?php

require_once 'application/config/database.php';

class UsuarioPermiso_model extends Model 
{
	public static $_table = 'usuarios_permisos';
	public static $_connection_name = 'accesos';
}

?>