// if an anchor has been given in URL
let target_anchor = document.location.hash;
if(target_anchor != "")
{
    // removing # at the beginning 
    target_anchor = target_anchor.substring(1);

    // Looping through toggles on page
    $(".epfl-toggle-anchor").each(function(anchor_index, anchor_a) {

        if($(anchor_a).attr('id') == target_anchor)
        {
            // We simulate click on button following anchor to open (or close...) toggle
            $(anchor_a).next().click();
        }
        
    });
}
