<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_tbl_users_autologin extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'key_id' => array(
                                'type' => 'INT',
                                'constraint' => 11,
                                'auto_increment' => TRUE
                        ),
                        'id' => array(
                                'type' => 'int',
                                'constraint' => 11,
                        ),
                        'user_agent' => array(
                                'type' => 'varchar',
                                'constraint' => '150',
                        ),
                        'last_ip' => array(
                                'type' => 'varchar',
                                'constraint' => '40',
                        ),
                        'last_login' => array(
                                'type' => 'timestamp'
                        )
                ));
                
                $attributes = array('ENGINE' => 'InnoDB');
                $this->dbforge->add_key('key_id', TRUE);
                $this->dbforge->create_table('users_autologin', FALSE, $attributes);
                //add fk in properties account
                $this->db->query('ALTER TABLE `users_autologin` ADD INDEX(`id`);');
                //add relation table
                $this->db->query('ALTER TABLE `users_autologin` ADD FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;');
        }

        public function down()
        {
                $this->dbforge->drop_table('users_autologin');
        }

}