// Looping through faq blocks
jQuery(".epfl-faq-header").each(function(header_ul_index, header_ul) {

    // Looping through questions inside current faq block
    jQuery(header_ul).parent().find('.faq-item-question').each(function(question_item_index, question_item) {

        // Adding link in header
        jQuery(header_ul).append('<li><a href="#'+jQuery(question_item).parent().attr('id')+'">'+jQuery(question_item).html()+'</a></li>');
    });

});
