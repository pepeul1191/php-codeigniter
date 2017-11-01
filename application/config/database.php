<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once 'vendor/j4mie/idiorm/idiorm.php';
require_once 'vendor/j4mie/paris/paris.php';

ORM::configure('sqlite:' . APPPATH . DIRECTORY_SEPARATOR .'db' . DIRECTORY_SEPARATOR. 'db_quinua.db',  null, 'quinua');
ORM::configure('sqlite:' . APPPATH . DIRECTORY_SEPARATOR .'db' . DIRECTORY_SEPARATOR. 'db_libros.db',  null, 'libros');
ORM::configure('sqlite:' . APPPATH . DIRECTORY_SEPARATOR .'db' . DIRECTORY_SEPARATOR. 'db_accesos.db',  null, 'accesos');
ORM::configure('return_result_sets', true);
ORM::configure('error_mode', PDO::ERRMODE_WARNING);