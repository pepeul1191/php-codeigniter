<?php

require_once 'application/config/database.php';

class UsuarioRol_model extends Model 
{
	public static $_table = 'usuarios_roles';
	public static $_connection_name = 'accesos';
}

?>