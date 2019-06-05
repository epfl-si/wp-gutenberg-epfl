<?php 

/**
 * Build the html
 *
 * @param $xml the XML path
 * @param $xslt the XSLT path
 * @return string the html
 */
function epfl_xml_build_html( string $xml, string $xslt ): string
{
    try
    {
        // check that we have valid URLs
        if (!filter_var($xml, FILTER_VALIDATE_URL) || !filter_var($xslt, FILTER_VALIDATE_URL))
        {
            return Utils::render_user_msg("epfl_xml error: invalid URLs");
        }
        $xml_doc = new DOMDocument;
        $xml_doc->load($xml);
        $xslt_doc = new DOMDocument;
        $xslt_doc->load($xslt);
        $processor = new XSLTProcessor;
        $processor->importStyleSheet($xslt_doc);
        return $processor->transformToXML($xml_doc);
    }
    catch (Exception $e)
    {
        return Utils::render_user_msg("epfl_xml error:" . $e->getMessage());
    }
}

function epfl_xml_block( $attributes ) {
    
    // sanitize parameters
    $xml = isset( $attributes['xmlUrl'] ) ? $attributes['xmlUrl'] : '';
    $xslt = isset( $attributes['xsltUrl'] ) ? $attributes['xsltUrl'] : '';

    return epfl_xml_build_html( $xml, $xslt );
}