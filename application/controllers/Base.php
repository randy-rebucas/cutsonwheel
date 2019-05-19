<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Base extends CI_Controller {

    public $ajax_controller = false;

    public function __construct()
    {
        parent::__construct();

        // Don't allow non-ajax requests to ajax controllers
        if ($this->ajax_controller and !$this->input->is_ajax_request())
        {
            exit;
        }

        $this->load->library('parser');

        $data = array();

        $this->load->vars($data);
       
    }

}
 /* End of file: Base_Controller.php */
 /* Location: ./application/core/Base_Controller.php */