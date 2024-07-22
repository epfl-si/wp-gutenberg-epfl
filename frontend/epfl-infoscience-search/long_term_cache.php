<?php

namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;

global $epfl_infoscience_search_db_version;
$epfl_infoscience_search_db_version = '1.0';

global $epfl_infoscience_search_db_table_name;
$epfl_infoscience_search_db_table_name = 'epfl_infoscience_cache_db';


/**
 * Create a table to do a long term save of all the returned html
 */
function create_cache_table(): void {
    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();

    global $epfl_infoscience_search_db_table_name;
    $table_name = $wpdb->prefix . $epfl_infoscience_search_db_table_name;

    // md5_id: the md5() from the serialized_attributes
    // serialized_attributes: the attributes that created the page
    // page: the html generated, compress into a blob

    $sql = "CREATE TABLE $table_name (
        id                    mediumint(9) AUTO_INCREMENT,
        md5_id                char(32) NOT NULL,
        serialized_attributes varchar(3000) DEFAULT '' NOT NULL, 
        page                  blob NOT NULL, 
        created_at            datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        updated_at            datetime NULL,
        last_time_used        datetime NULL,
        PRIMARY KEY  (id),
        KEY md5_id (md5_id)
    ) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );

    global $epfl_infoscience_search_db_version;
    add_option( 'epfl_infoscience_search_db_version', $epfl_infoscience_search_db_version );
}

function assert_or_create_cache_table(): void {
    // Check if the table exists
    global $wpdb;
    global $epfl_infoscience_search_db_table_name;

    $table_name = $wpdb->prefix . $epfl_infoscience_search_db_table_name;
    if ( $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) != $table_name ) {
        create_cache_table();
    }
}

/**
 * This function is no more in use because the Infoscience V2 (invenio) has been set to readonly and all the cache
 * should have been manually fulfilled
 * @param $md5_id                string md5 generated from serialized
 * @param $serialized_attributes string Serialized data that has been used to generate the $page
 * @param $page                  string The rendered html. This gonna be saved as BLOB
 *
 * @return void
 */
function save_page_in_cache_table( $md5_id, $serialized_attributes, $page ): void {

    global $wpdb;
    global $epfl_infoscience_search_db_table_name;

    $table_name = $wpdb->prefix . $epfl_infoscience_search_db_table_name;

    # first, assert we are disposed to save data
    assert_or_create_cache_table();

    $page_gz = gzcompress($page);

    # then find if a record already exist for this url
    $row_id = $wpdb->get_var(
        $wpdb->prepare("
            SELECT ID 
            FROM $table_name
            WHERE md5_id = %s
        ",
        $md5_id)
    );

    if ( is_null( $row_id ) ) {  // create
        $wpdb->insert(
            $table_name,
            [
                'md5_id'  => $md5_id,
                'serialized_attributes' => $serialized_attributes,
                'page' => $page_gz,
                'created_at' => current_time( 'mysql' )
            ],
        );
    } else {
        // update
        $wpdb->update(
            $table_name,
            [
                'serialized_attributes' => $serialized_attributes,
                'page' => $page_gz,
                'updated_at' => current_time( 'mysql' )
            ],
            [ 'id' => $row_id ]
        );
    }
}

function bump_last_used_page($id) {

    global $wpdb;
    global $epfl_infoscience_search_db_table_name;

    $table_name = $wpdb->prefix . $epfl_infoscience_search_db_table_name;

    $wpdb->update(
        $table_name,
        [
            'last_time_used' => current_time( 'mysql' )
        ],
        [ 'id' => $id ]
    );
}

function get_page_from_cache_table($md5_id): ?string {
    global $wpdb;
    global $epfl_infoscience_search_db_table_name;

    $table_name = $wpdb->prefix . $epfl_infoscience_search_db_table_name;

    $result = $wpdb->get_row(
        $wpdb->prepare(
            "SELECT * FROM $table_name WHERE md5_id = %s",
            $md5_id
        )
    );

    // Output the result
    if ($result) {
        bump_last_used_page($result->id);
        return gzuncompress($result->page);
    } else {
        return null;
    }
}
