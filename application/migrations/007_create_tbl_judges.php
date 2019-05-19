<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_tbl_judges extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'judge_id' => array(
                                'type' => 'INT',
                                'constraint' => 11,
                                'auto_increment' => TRUE
                        ),
                        'id' => array(
                                'type' => 'int',
                                'constraint' => 11,
                        )
                ));
                
                $attributes = array('ENGINE' => 'InnoDB');
                $this->dbforge->add_key('judge_id', TRUE);
                $this->dbforge->create_table('judges', FALSE, $attributes);
                //add fk in properties account
                $this->db->query('ALTER TABLE `judges` ADD INDEX(`id`);');
                //add relation table
                $this->db->query('ALTER TABLE `judges` ADD FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;');
        }

        public function down()
        {
                $this->dbforge->drop_table('judges');
        }

}