// Looping through faq blocks
$(".epfl-faq-header").each(function(header_ul_index, header_ul) {

    // Looping through questions inside current faq block
    $(header_ul).parent().find('.faq-item-question').each(function(question_item_index, question_item) {

        // Adding link in header
        $(header_ul).append('<li><a href="#'+$(question_item).parent().attr('id')+'">'+$(question_item).html()+'</a></li>');
    });

});

// Getting potential anchor given in URL
var hash = $(location).attr('hash');
if(hash != "")
{
    // To look for DIV element in page (have a look at "../controller.php" to see how anchors are defined in document)
    var div_anchor_tag = $('div[id="'+hash.substring(1)+'"]');
    console.log(div_anchor_tag);
    // Scrolling to element
    $('html,body').animate({scrollTop: div_anchor_tag.offset().top},'fast');
}
