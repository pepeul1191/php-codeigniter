<?php

class ViewAccesos extends CI_Controller 
{
    public function index()
    {
        $this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
        $data_top = array(
            'base_url' => BASE_URL,
            'static_url' => STATIC_URL,
            'mensaje' => false,
            'titulo_pagina' => 'Gestión de Accesos', 
            'modulo' => 'Accesos',
            'title' => 'Home', 
            'css' => 'dist/accesos.min.css',
            'js_top' => 'http://localhost:3000/',
            'menu' => '[{"url" : "accesos", "nombre" : "Accesos"},{"url" : "libros", "nombre" : "Libros"}]', 
            'items' => '[{"subtitulo":"","items":[{"item":"Gestión de Sistemas","url":"accesos/#/sistema"},{"item":"Gestión de Usuarios","url":"accesos/#/usuario"}]}]', 
            'data' => json_encode(array(
                'mensaje' => false,
                'titulo_pagina' => 'Gestión de Accesos', 
                'modulo' => 'Accesos'
            )),
        );
        $data_bottom = array(
            'static_url' => STATIC_URL,
            'js_bottom' => 'dist/accesos.min.js',
        );
        $this->load->view('layouts/application_header', $data_top);
        $this->load->view('accesos/index');
        $this->load->view('layouts/application_footer', $data_bottom);
    }
}

?>