<?php

require_once 'application/config/database.php';

class Usuario_model extends Model 
{
	public static $_table = 'usuarios';
	public static $_connection_name = 'accesos';
}

?>