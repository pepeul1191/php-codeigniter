<?php

require_once 'application/config/database.php';

class Modulo extends CI_Controller 
{
	public function listar($sistema_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Modulo_model', 'accesos')->select('id')->select('nombre')->select('url')->where('sistema_id', $sistema_id)->find_array());
	}

	public function guardar()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		ORM::get_db('accesos')->beginTransaction();
		$data = json_decode($this->input->post('data'));
		$nuevos = $data->{'nuevos'};
		$editados = $data->{'editados'};
		$eliminados = $data->{'eliminados'};
		$sistema_id = $data->{"extra"}->{'sistema_id'};
		$rpta = []; $array_nuevos = [];
		try {
			if(count($nuevos) > 0){
				foreach ($nuevos as &$nuevo) {
				    $modulo = Model::factory('Modulo_model')->create();
					$modulo->nombre = $nuevo->{'nombre'};
					$modulo->url = $nuevo->{'url'};
					$modulo->sistema_id = $sistema_id;
					$modulo->save();
				    $temp = [];
				    $temp['temporal'] = $nuevo->{'id'};
	              	$temp['nuevo_id'] = $modulo->id;
	              array_push( $array_nuevos, $temp );
				}
			}
			if(count($editados) > 0){
				foreach ($editados as &$editado) {
					$modulo = Model::factory('Modulo_model')->find_one($editado->{'id'});
					$modulo->nombre = $editado->{'nombre'};
					$modulo->url = $editado->{'url'};
					$modulo->save();
				}
			}	
			if(count($eliminados) > 0){
				foreach ($eliminados as &$eliminado) {
			    	$modulo = Model::factory('Modulo_model')->find_one($eliminado);
			    	$modulo->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado los cambios en los modulos', $array_nuevos];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en guardar la tabla de modulos', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
	}
}

?>