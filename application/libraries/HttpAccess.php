<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class HttpAccess {
    function __construct($params)
    {
		if (!in_array($params['received'], $params['allow'])){
			include 'application/config/config.php';
			header( 'Location: ' . $config['base_url'] . 'error/access/404' );
		}
    }
}

?>