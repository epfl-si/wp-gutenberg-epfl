<?php

// Styleguide: Not present in styleguide

namespace EPFL\Plugins\Gutenberg\PDFFlipbook;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_pdf_flipbook_block( $attributes ) {

    $pdf_id    = Utils::get_sanitized_attribute( $attributes, 'pdfId' );


    $code = '<div class="container">'.
            '[flipbook pdf="'.wp_get_attachment_url($pdf_id).'" same_height_as="body" theme="light"]'.
            '</div>';
    return do_shortcode($code);
}
