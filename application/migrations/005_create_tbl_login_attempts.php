<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_tbl_login_attempts extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'id' => array(
                                'type' => 'INT',
                                'constraint' => 11,
                                'auto_increment' => TRUE
                        ),
                        'ip_address' => array(
                                'type' => 'varchar',
                                'constraint' => '40'
                        ),
                        'login' => array(
                                'type' => 'varchar',
                                'constraint' => '50'
                        ),
                        'time' => array(
                                'type' => 'timestamp'
                        )
                ));
                
                $attributes = array('ENGINE' => 'InnoDB');
                $this->dbforge->add_key('id', TRUE);
                $this->dbforge->create_table('login_attempts', FALSE, $attributes);
        }

        public function down()
        {
                $this->dbforge->drop_table('login_attempts');
        }
}