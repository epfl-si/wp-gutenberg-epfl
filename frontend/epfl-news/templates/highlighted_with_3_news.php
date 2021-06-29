<?php
    namespace EPFL\Plugins\Gutenberg\News;

    // template = 2
    function epfl_news_highlighted_with_3_news($results, $all_news_link, $lang) {

        $count = 1;
        $header = false;
        $last = is_countable($results) ? count($results) : 0;

        $url_channel = epfl_news_get_url_channel($results, $lang);

        $markup = "";
        $markup .= '<div class="container-full my-3">';
        $markup .= '<div class="list-group">';

        foreach($results as $news) {

            $is_first_event       = ($count==1);
            $image_description    = epfl_news_get_image_description($news);
            $category             = epfl_news_get_label_category($news, $lang);
            $publish_date         = epfl_news_get_publish_date($news);
            $subtitle             = epfl_news_get_subtitle($news);
            $visual_url           = epfl_news_get_visual_url($news);
            $short_vimeo_video_id = $news->short_vimeo_video_id;

            if ( !empty($short_vimeo_video_id) ) {
              $media_url = "https://player.vimeo.com/video/" . $short_vimeo_video_id . "?autoplay=1&loop=1&muted=1&background=1&quality=720";
            }

            if (1 != $count and false == $header) {
                $header = true;
                $markup .= '<div class="container pb-5 offset-xl-top pt-5 pt-xl-0">';
                $markup .= '<div class="row">';
                $markup .= '<div class="col-lg-10 offset-lg-1">';
                $markup .= '<div class="row mb-4">';
            }

            if ($is_first_event) { // FIRST EVENT
                $markup .= '<div class="fullwidth-teaser fullwidth-teaser-horizontal">';
                if ($media_url) {
                    $markup .= '<div class="embed-responsive embed-responsive-16by9">';
                    $markup .= '<iframe src="' . $media_url . '" frameborder="1"></iframe>';
                    $markup .= '</div>';
                } else {
                    $markup .= '<picture>';
                    $markup .= '<img src="' . esc_url($visual_url) . '" aria-labelledby="background-label" alt="' . esc_attr($image_description) . '"/>';
                    $markup .= '</picture>';
                }
                $markup .= '<div class="fullwidth-teaser-text">';
                $markup .= '<div class="fullwidth-teaser-header">';
                $markup .= '<div class="fullwidth-teaser-title">';
                $markup .= '<h3>' . esc_html($news->title) . '</h3>';
                $markup .= '<ul class="list-inline mt-2">';
                $markup .= '<li class="list-inline-item">' . __('News', 'epfl') . '</li>';
                $markup .= '<li class="list-inline-item">' . esc_html($category) . '</li>';
                $markup .= '</ul>';
                $markup .= '</div>';
                $markup .= '<a href="' . esc_url($news->news_url) . '" aria-label="Link to read more of that page" class="btn btn-primary triangle-outer-top-right d-none d-xl-block">';
                $markup .= __('Read more', 'epfl');
                $markup .= '<span class="sr-only">sur Tech Transfer.</span>';
                $markup .= '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-chevron-right"></use></svg>';
                $markup .= '</a>';
                $markup .= '</div>';
                $markup .= '<div class="fullwidth-teaser-content">';
                $markup .= '<p>' . esc_html($subtitle) . '</p>';
                $markup .= '</div>';
                $markup .= '<div class="fullwidth-teaser-footer">';
                $markup .= '<a href="' . esc_url($news->news_url) . '" aria-label="Link to read more of that page" class="btn btn-primary btn-block d-xl-none">' . __('Read more', 'epfl') . '</a>';
                $markup .= '</div>';
                $markup .= '</div>';
                $markup .= '</div>';
            } else {// FIRST EVENT
                $markup .= '<div class="col-md-6 d-flex">';
                $markup .= '<a href="' . esc_url($news->news_url) . '" class="card link-trapeze-horizontal">';
                $markup .= '<div class="card-body">';
                $markup .= '<h3 class="card-title">' . esc_html($news->title) . '</h3>';
                $markup .= '<div class="card-info">';
                $markup .= '<span class="card-info-date">';
                $markup .= '<time datetime="' . esc_attr(epfl_news_get_publish_date($news, "Y-m-d")) . '">' . esc_html($publish_date) . '</time>';
                $markup .= '</span>';
                $markup .= '<span>' . __('News', 'epfl') . '</span>';
                $markup .= '<span>' . esc_html($category) . '</span>';
                $markup .= '</div>';
                $markup .= '<p>' . esc_html($subtitle) . '</p>';
                $markup .= '</div>';
                $markup .= '</a>';
                $markup .= '</div>';
            }

            if ($last == $count) {
                $markup .= '</div>';
                if ("1" == $all_news_link) {
                    $markup .= '<p class="text-center">';
                    $markup .= '<a class="link-pretty" href="' . $url_channel . '">';
                    $markup .= __('All news', 'epfl' );
                    $markup .= '</a>';
                    $markup .= '</p>';
                }
                $markup .= '</div>';
                $markup .= '</div>';
                $markup .= '</div>';
            }
            $count++;
        } // end foreach

        $markup .= '</div>';
        $markup .= '</div>';

        return $markup;
    }
?>
