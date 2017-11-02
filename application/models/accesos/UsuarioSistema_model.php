<?php

require_once 'application/config/database.php';

class UsuarioSistema_model extends Model 
{
	public static $_table = 'usuarios_sistemas';
	public static $_connection_name = 'accesos';
}

?>