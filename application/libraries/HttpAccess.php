<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class HttpAccess {
    function __construct($params)
    {
		if (!in_array($params['received'], $params['allow'])){
			header( 'Location: ' . BASE_URL . 'error/access/404' );
		}
    }
}

?>