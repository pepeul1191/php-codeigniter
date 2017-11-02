<?php

require_once 'application/models/accesos/Rol_model.php';

class Rol extends CI_Controller 
{
	public function listar($sistema_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Rol_model', 'accesos')->select('id')->select('nombre')->where('sistema_id', $sistema_id)->find_array());
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
				    $rol = Model::factory('Rol_model', 'accesos')->create();
					$rol->nombre = $nuevo->{'nombre'};
					$rol->sistema_id = $sistema_id;
					$rol->save();
				    $temp = [];
				    $temp['temporal'] = $nuevo->{'id'};
	              	$temp['nuevo_id'] = $rol->id;
	              array_push( $array_nuevos, $temp );
				}
			}
			if(count($editados) > 0){
				foreach ($editados as &$editado) {
					$rol = Model::factory('Rol_model', 'accesos')->find_one($editado->{'id'});
					$rol->nombre = $editado->{'nombre'};
					$rol->save();
				}
			}	
			if(count($eliminados) > 0){
				foreach ($eliminados as &$eliminado) {
			    	$rol = Model::factory('Rol_model', 'accesos')->find_one($eliminado);
			    	$rol->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado los cambios en los roles', $array_nuevos];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en guardar la tabla de roles', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
	}
}

?>