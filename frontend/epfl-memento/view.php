<?php
    namespace EPFL\Plugins\Gutenberg\Memento;

    require_once(dirname(__FILE__) . '/utils.php');
    require_once(dirname(__FILE__) . '/templates/slider.php');
    require_once(dirname(__FILE__) . '/templates/listing_with_the_first_highlighted_event.php');
    require_once(dirname(__FILE__) . '/templates/listing_without_the_first_highlighted_event.php');

    function epfl_memento_render($results, $template, $memento_name) {

        $function_to_be_called = __NAMESPACE__ . '\epfl_memento_' . $template;
        $markup = $function_to_be_called($results, $memento_name);

        return $markup;
    }

    function epfl_memento_slider_with_the_first_highlighted_event($results, $memento_name) {
        return epfl_memento_slider($results, "1", $memento_name);
    }

    function epfl_memento_slider_without_the_first_highlighted_event($results, $memento_name) {
        return epfl_memento_slider($results, "2", $memento_name);
    }
?>