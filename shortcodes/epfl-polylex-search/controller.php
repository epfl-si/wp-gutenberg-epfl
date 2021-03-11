<?php

namespace EPFL\Plugins\Shortcodes\EPFLPolylexSearch;

/**
 * render the shortcode, mainly a form and his table
 */
function renderLexSearch($lexes, $category, $subcategory, $search) {
  wp_enqueue_script( 'lib-listjs', plugins_url('lib/list.min.js', dirname(__FILE__)), ['jquery'], '2.3.1', false);
  wp_enqueue_style( 'epfl-polylex-search-css', plugins_url('epfl-polylex-search.css', __FILE__),false,'1.1','all');

  polylex_filter_out_unused_language($lexes);

  $cat_with_sub = tree_categories_with_subcategories($lexes);

  set_query_var('epfl_lexes-list', $lexes);
  set_query_var('epfl_lexes-predefined_category', $category);
  set_query_var('epfl_lexes-predefined_subcategory', $subcategory);
  set_query_var('epfl_lexes-predefined_search', $search);

  set_query_var('epfl_lexes-cat_with_sub_tree', $cat_with_sub);
  load_template(dirname(__FILE__). '/view.php');
}

function tree_categories_with_subcategories($lexes) {
  // build a parentship relation for javascript comboboxes
  $categ_with_sub = [];

  foreach ($lexes as $lex) {
    if (!isset($categ_with_sub[$lex->category])) {
      $categ_with_sub[$lex->category] = [];
    }

    foreach ($lex->subcategories as $subcategory) {
      if (!in_array($subcategory, $categ_with_sub[$lex->category])) {
        $categ_with_sub[$lex->category][] = $subcategory;
      }
    }
  }

  return $categ_with_sub;
}

/**
 * Simplify the sites data by removing and renaming languages fields
 * As the client's browser will draw this results, we keep it the minimal possible
 */
function polylex_filter_out_unused_language($lexes) {
  $current_language = get_current_language();

  foreach ($lexes as $lex) {
    if ($current_language === 'fr') {
      $lex->title = $lex->titleFr;
      unset($lex->titleFr);
      unset($lex->titleEn);
      $lex->url = $lex->urlFr;
      unset($lex->urlFr);
      unset($lex->urlEn);
      $lex->description = $lex->descriptionFr;
      unset($lex->descriptionFr);
      unset($lex->descriptionEn);
      $lex->responsible->url = $lex->responsible->urlFr;
      unset($lex->responsible->urlEn);
      $lex->category = $lex->category->nameFr;
      unset($lex->category->nameEn);

      $lex_subcategories = $lex->subcategories ?? [];
      unset($lex->subcategories);
      $lex->subcategories = [];
      foreach ($lex_subcategories as $subcategory) {
        $lex->subcategories[] = $subcategory->nameFr;
      }
    } else {
      $lex->title = $lex->titleEn;
      unset($lex->titleEn);
      unset($lex->titleFr);
      $lex->url = $lex->urlEn;
      unset($lex->urlEn);
      unset($lex->urlFr);
      $lex->description = $lex->descriptionEn;
      unset($lex->descriptionEn);
      unset($lex->descriptionFr);
      $lex->responsible->url = $lex->responsible->urlEn;
      unset($lex->responsible->urlFr);
      $lex->category = $lex->category->nameEn;
      unset($lex->category->nameFr);

      $lex_subcategories = $lex->subcategories ?? [];
      unset($lex->subcategories);
      $lex->subcategories = [];
      foreach ($lex_subcategories as $subcategory) {
        $lex->subcategories[] = $subcategory->nameEn;
      }
    }
  }
}
