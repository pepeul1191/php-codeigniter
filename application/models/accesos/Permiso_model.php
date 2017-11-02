<?php

require_once 'application/config/database.php';

class Permiso_model extends Model 
{
	public static $_table = 'permisos';
	public static $_connection_name = 'accesos';
}

?>