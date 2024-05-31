<?php
    namespace EPFL\Plugins\Gutenberg\News;

    // template = 1
    function epfl_news_horizontal($results, $all_news_link, $lang, $text_position, $gray_wrapper) {
        $count = 1;
        $url_channel = epfl_news_get_url_channel($results, $lang);

        if ($gray_wrapper == TRUE) {
            $markup = '<div class="container-full overflow-hidden my-3 p-md-4 p-lg-5 bg-gray-100">';
        } else {
            $markup = '<div class="container-full overflow-hidden my-3 pl-5">';
        }
        $markup .= '<div class="card-slider-wrapper">';
        $markup .= '<div class="card-slider">';

        foreach($results as $news) {

            $is_first_event       = ($count==1);
            $image_description    = epfl_news_get_image_description($news);
            $category             = epfl_news_get_label_category($news, $lang);
            $publish_date         = epfl_news_get_publish_date($news);
            $subtitle             = epfl_news_get_subtitle($news);
            $visual_url           = epfl_news_get_visual_url($news);

            $markup .= '<div class="card-slider-cell">';
            if ($gray_wrapper == TRUE) {
                $markup .= '<a href="' . esc_url($news->news_url) . '" class="card link-trapeze-horizontal">';
            } else {
                $markup .= '<a href="' . esc_url($news->news_url) . '" class="card card-gray link-trapeze-horizontal">';
            }
            $markup .= '<div class="card-body">';
            $markup .= '<picture>';
            $markup .= epfl_news_get_picture_source_media_for_visual($news);
            $markup .= '<img src="' . esc_url($visual_url) . '" class="img-fluid" alt="' . esc_attr($image_description) . '">';
            $markup .= '</picture>';
            $markup .= '<div itemscope itemtype="http://schema.org/Article">';
            $markup .= '<h3 class="card-title h5 mt-3" itemprop="name">' . esc_html($news->title) . '</h3>';
            $markup .= '<p>';
            $markup .= '<time datetime="' . esc_attr(epfl_news_get_publish_date($news, "Y-m-d")) . '" itemprop="datePublished"><span class="sr-only">Published:</span>' . esc_html($publish_date) . '</time>';
            $markup .= '<span class="text-muted" itemprop="description"> — ' . esc_html($subtitle) . '</span>';
            $markup .= '</p>';
            $markup .= '</div>';
            $markup .= '</div>';
            $markup .= '</a>';
            $markup .= '</div>';

            $count++;
        }

        $markup .= '</div>';

        include(dirname(__FILE__) . '/includes/card-slider-footer.inc.php');

        $markup .= '</div>';
        $markup .= '</div>';
        return $markup;
    }