<?php

require_once 'application/config/database.php';

class Estacion_model extends Model 
{
	public static $_connection_name = 'quinua';
	public static $_table = 'inve_estacion';
}

?>