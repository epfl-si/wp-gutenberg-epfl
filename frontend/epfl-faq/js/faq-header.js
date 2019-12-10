// Looping through faq blocks
$(".epfl-faq-header").each(function(header_ul_index, header_ul) {

    // Looping through questions inside current faq block
    $(header_ul).parent().find('.faq-item-question').each(function(question_item_index, question_item) {

        // Adding link in header
        $(header_ul).append('<li><a href="#'+$(question_item).parent().attr('id')+'">'+$(question_item).html()+'</a></li>');
    });

});