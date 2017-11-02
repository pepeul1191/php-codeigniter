<?php

require_once 'application/config/database.php';

class RolPermiso_model extends Model 
{
	public static $_table = 'roles_permisos';
	public static $_connection_name = 'accesos';
}

?>