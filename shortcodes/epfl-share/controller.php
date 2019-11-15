<?php

namespace EPFL\Plugins\Shortcodes\EPFLShare;

function renderShare($post_title, $target_url, $target_url_encoded) {
  // render for frontend
  set_query_var('epfl_share_post_title', $post_title);
  set_query_var('epfl_share_target_url', $target_url);
  set_query_var('epfl_share_target_url_encoded', $target_url_encoded);
  load_template(dirname(__FILE__).'/view.php');
}
