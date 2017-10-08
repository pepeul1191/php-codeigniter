<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Acl {
    function __construct($params)
    {
        if($params['valor'] == 5){
            $url = 'http://example.com/thankyou.php'; 
            header( "Location: $url" );
        }
    }
}

?>