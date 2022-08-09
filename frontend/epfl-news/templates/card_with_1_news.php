<?php
    namespace EPFL\Plugins\Gutenberg\News;

    // template = 4
    function epfl_news_card_with_1_news($results, $all_news_link, $lang) {

        $count = 1;
        $last = count($results);

        $markup = '<div class="container-full p-3 p-md-4 p-lg-5">';
        $markup .= '<div class="list-group">';

        foreach($results as $news) {

            $is_first_event       = ($count==1);
            $image_description    = epfl_news_get_image_description($news);
            $category             = epfl_news_get_label_category($news, $lang);
            $publish_date         = epfl_news_get_publish_date($news);
            $subtitle             = epfl_news_get_subtitle($news);
            $visual_url           = epfl_news_get_visual_url($news);

            if ($is_first_event) {
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
