<?php
namespace EPFL\Plugins\Gutenberg\Memento;

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

$markup .= '<a href="' . esc_url(get_memento_url($period, $memento_name)) . '">';
$markup .= __('See all events', 'epfl');
$markup .= '</a>';