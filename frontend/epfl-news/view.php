<?php
    namespace EPFL\Plugins\Gutenberg\News;

    require_once(dirname(__FILE__) . '/utils.php');
    require_once(dirname(__FILE__) . '/templates/listing.php');
    require_once(dirname(__FILE__) . '/templates/highlighted_with_3_news.php');
    require_once(dirname(__FILE__) . '/templates/highlighted_with_1_news.php');
    require_once(dirname(__FILE__) . '/templates/card_with_1_news.php');
    require_once(dirname(__FILE__) . '/templates/card_with_2_news.php');
    require_once(dirname(__FILE__) . '/templates/card_with_3_news.php');

    function epfl_news_render($results, $template, $all_news_link) {
        $function_to_be_called = __NAMESPACE__ . '\epfl_news_' . $template;
        $markup = $function_to_be_called($results, $all_news_link);
        return $markup;
    }
