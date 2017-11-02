<?php

require_once 'application/config/database.php';

class Rol_model extends Model 
{
	public static $_table = 'roles';
	public static $_connection_name = 'accesos';
}

?>