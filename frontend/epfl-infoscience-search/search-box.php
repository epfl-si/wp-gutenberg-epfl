<?php
namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;
?>
<div class="form-group">
  <input
          type="text"
          id="infsocience-search-search-input"
          class="form-control search mb-2"
          placeholder="<?php _e('Search', 'epfl') ?>"
          aria-describedby="infsocience-search-input"
  >

  <button class="btn btn-secondary sort asc" data-sort="title"><?php _e('Sort by title', 'epfl') ?></button>
  <button class="btn btn-secondary sort" data-sort="year"><?php _e('Sort by year', 'epfl') ?></button>
</div>
