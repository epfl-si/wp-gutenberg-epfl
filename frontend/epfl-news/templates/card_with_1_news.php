<?php
    // template = 4
    function epfl_news_card_with_1_news($results, $all_news_link) {

        $count = 1;
        $header = false;
        $last = count($results);
        $url_channel = epfl_news_get_url_channel($results);

        $markup = '<div class="container-full my-3 pl-5">';
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
            
            if ($is_first_event) {
                $markup .= '<h2 class="mt-5 mb-4">';
                $markup .= esc_html('The latest news', 'epfl');
                $markup .= '</h2>';
                $markup .= '<div class="row">';
            }
            $markup .= '<div class="col-md-6">';
            $markup .= '<a href="' . esc_url($news->news_url) . '" class="card link-trapeze-horizontal" itemscope itemtype="https://schema.org/NewsArticle">';
            $markup .= '<picture class="card-img-top">';
            $markup .= '<img src="' . esc_url($visual_url) . '" class="img-fluid" title="' . esc_attr($image_description) . '" alt="' . esc_attr($image_description) . '" />';
            $markup .= '</picture>';
            $markup .= '<div class="card-body">';
            $markup .= '<h3 class="card-title" itemprop="name">' . esc_html($news->title) . '</h3>';
            $markup .= '<div class="card-info">';
            $markup .= '<span class="card-info-date" itemprop="datePublished" content="' . esc_attr($publish_date) . '">' . esc_html($publish_date) . '</span>';
            $markup .= '<span itemprop="about">'. esc_html($category) . '</span>';
            $markup .= '</div>';
            $markup .= '<p itemprop="description">' . esc_html($subtitle) . '</p>';
            $markup .= '</div>';
            $markup .= '</a>';
            $markup .= '</div>';
            
            if ($last == $count) {
                $markup .= '</div>';
            }
            $count++;
        } // end foreach

        $markup .= '</div>';
        $markup .= '</div>';

        return $markup;
    }