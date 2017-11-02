<?php

require_once 'application/config/database.php';

class Sistema_model extends Model 
{
	public static $_table = 'sistemas';
	public static $_connection_name = 'accesos';
}

?>