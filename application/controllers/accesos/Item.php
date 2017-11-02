<?php

require_once 'application/models/accesos/Item_model.php';

class Item extends CI_Controller 
{
	public function listar($subtitulo_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Item_model', 'accesos')->select('id')->select('nombre')->select('url')->where('subtitulo_id', $subtitulo_id)->find_array());
	}

	public function guardar()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		ORM::get_db('accesos')->beginTransaction();
		$data = json_decode($this->input->post('data'));
		$nuevos = $data->{'nuevos'};
		$editados = $data->{'editados'};
		$eliminados = $data->{'eliminados'};
		$subtitulo_id = $data->{"extra"}->{'id_subtitulo'};
		$rpta = []; $array_nuevos = [];
		try {
			if(count($nuevos) > 0){
				foreach ($nuevos as &$nuevo) {
				    $item = Model::factory('Item_model')->create();
					$item->nombre = $nuevo->{'nombre'};
					$item->url = $nuevo->{'url'};
					$item->subtitulo_id = $subtitulo_id;
					$item->save();
				    $temp = [];
				    $temp['temporal'] = $nuevo->{'id'};
	              	$temp['nuevo_id'] = $item->id;
	              array_push( $array_nuevos, $temp );
				}
			}
			if(count($editados) > 0){
				foreach ($editados as &$editado) {
					$item = Model::factory('Item_model')->find_one($editado->{'id'});
					$item->nombre = $editado->{'nombre'};
					$item->url = $editado->{'url'};
					$item->save();
				}
			}	
			if(count($eliminados) > 0){
				foreach ($eliminados as &$eliminado) {
			    	$item = Model::factory('Item_model')->find_one($eliminado);
			    	$item->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado los cambios en los items', $array_nuevos];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en guardar la tabla de items', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
	}
}

?>