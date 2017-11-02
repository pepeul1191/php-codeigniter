<?php

require_once 'application/config/database.php';

class Item_model extends Model 
{
	public static $_table = 'items';
	public static $_connection_name = 'accesos';
}

?>