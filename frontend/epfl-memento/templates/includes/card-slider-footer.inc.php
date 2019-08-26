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
$markup .= '<a href="' . esc_url("https://memento.epfl.ch/" . $memento_name . "/?period=30") . '">';
$markup .= __('Complete agenda of events', 'wp-gutenberg-epfl');
$markup .= '</a>';