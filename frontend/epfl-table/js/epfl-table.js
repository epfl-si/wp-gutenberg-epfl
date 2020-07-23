

let first_line_is_header, epfl_table;

// Looping through tables
$(".epfl-table").each(function(filter_div_index, filter_div) {

    epfl_table = $(filter_div).find('table');

    epfl_table.toggleClass('table');
    
    
    // Getting header configuration for current table
    first_line_is_header = $(filter_div).find('input[name="first_line_is_header"]').attr('value');

    if(first_line_is_header == '1')
    {
        
        // if we have at least one option, 'header' will be in it, so...

        // Changing <td> into <th> in header
        epfl_table.find('tr:first').find('td').changeElementType('th');
        // Wraping <tr><th> into <thead>
        epfl_table.find('tr:first').wrap('<thead/>').parent().prependTo(epfl_table);

    }

});
