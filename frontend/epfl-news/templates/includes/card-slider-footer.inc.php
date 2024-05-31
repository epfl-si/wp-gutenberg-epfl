<?php
namespace EPFL\Plugins\Gutenberg\News;

$markup .= '<div class="card-slider-footer">';
$markup .= '    <div>';
$markup .= '        <button role="button" id="card-slider-prev" class="card-slider-btn link-trapeze-horizontal disabled">';
$markup .= '            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-chevron-left"></use></svg>';
$markup .= '        </button>';
$markup .= '        <button role="button" id="card-slider-next" class="card-slider-btn link-trapeze-horizontal">';
$markup .= '            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-chevron-right"></use></svg>';
$markup .= '        </button>';
$markup .= '    </div>';
$markup .= '</div>';

        if ("1" == $all_news_link and "" != $url_channel) {
            $markup .= '<a href="' . $url_channel . '">' . __("All news", "epfl" ) . '</a>';
        }