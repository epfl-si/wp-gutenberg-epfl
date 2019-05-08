<?php
    // template = 1
    function epfl_news_listing($results, $all_news_link) {
        $count = 1;
        $header = false;
        $last = count($results);
        $url_channel = epfl_news_get_url_channel($results);

        $markup = '<div class="container my-3">';
        $markup .= '<div class="list-group">';

        foreach($results as $news) {

            $is_first_event    = ($count==1);
            $image_description = epfl_news_get_image_description($news);
            $category          = epfl_news_get_label_category($news);
            $publish_date      = epfl_news_get_publish_date($news);
            $subtitle          = epfl_news_get_subtitle($news);
            $visual_url        = epfl_news_get_visual_url($news);
            $video_name        = "teaser_" . str_replace("https://actu.epfl.ch/news/", "", $news->news_url);
            $media_url         = get_attachment_url_by_slug($video_name);
            
            $markup .= '<a href="' . esc_url($news->news_url) . '" class="list-group-item list-group-teaser link-trapeze-vertical">';
            $markup .= '<div class="list-group-teaser-container">';
            $markup .= '<div class="list-group-teaser-thumbnail">';
            $markup .= '<picture>';
            $markup .= '<img src="' . esc_url($visual_url) . '" class="img-fluid" alt="' . esc_attr($image_description) . '">';
            $markup .= '</picture>';
            $markup .= '</div>';
            $markup .= '<div class="list-group-teaser-content">';
            $markup .= '<p class="h5">' . esc_html($news->title) . '</p>';
            $markup .= '<p>';
            $markup .= '<time datetime="' . esc_attr($publish_date) . '"><span class="sr-only">Published:</span>' . esc_html($publish_date) . '</time>';
            $markup .= '<span class="text-muted"> — ' . esc_html($subtitle) . '</span>';
            $markup .= '</p>';
            $markup .= '</div>';
            $markup .= '</div>';
            $markup .= '</a>';

            $count++;
        }

        if ("true" == $all_news_link and "" != $url_channel) {
            $markup .= '<p class="text-center">';
            $markup .= '<a class="link-pretty" href="' . $url_channel . '">' . esc_html("All news", "epfl" ) . '</a>';
            $markup .= '</p>';
        }

        $markup .= '</div>';
        $markup .= '</div>';
        return $markup;
    }