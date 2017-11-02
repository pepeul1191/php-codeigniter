<?php

require_once 'application/models/accesos/Subtitulo_model.php';

class Subtitulo extends CI_Controller 
{
	public function listar($modulo_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Subtitulo_model', 'accesos')->select('id')->select('nombre')->where('modulo_id', $modulo_id)->find_array());
	}

	public function guardar()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		ORM::get_db('accesos')->beginTransaction();
		$data = json_decode($this->input->post('data'));
		$nuevos = $data->{'nuevos'};
		$editados = $data->{'editados'};
		$eliminados = $data->{'eliminados'};
		$id_modulo = $data->{"extra"}->{'id_modulo'};
		$rpta = []; $array_nuevos = [];
		try {
			if(count($nuevos) > 0){
				foreach ($nuevos as &$nuevo) {
				    $subtitulo = Model::factory('Subtitulo_model', 'accesos')->create();
					$subtitulo->nombre = $nuevo->{'nombre'};
					$subtitulo->modulo_id = $id_modulo;
					$subtitulo->save();
				    $temp = [];
				    $temp['temporal'] = $nuevo->{'id'};
	              	$temp['nuevo_id'] = $subtitulo->id;
	              array_push( $array_nuevos, $temp );
				}
			}
			if(count($editados) > 0){
				foreach ($editados as &$editado) {
					$subtitulo = Model::factory('Subtitulo_model', 'accesos')->find_one($editado->{'id'});
					$subtitulo->nombre = $editado->{'nombre'};
					$subtitulo->save();
				}
			}	
			if(count($eliminados) > 0){
				foreach ($eliminados as &$eliminado) {
			    	$subtitulo = Model::factory('Subtitulo_model', 'accesos')->find_one($eliminado);
			    	$subtitulo->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado los cambios en los subtitulos', $array_nuevos];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en guardar la tabla de subtitulos', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
	}
}

?>