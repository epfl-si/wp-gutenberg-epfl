
let filterList = [];
let columns, columnsOk, header_options, table, column_name, limit_filter_to;

// Looping through table to filter
$(".epfl-table-filter").each(function(filter_div_index, filter_div) {

    columnsOk = false;
    columns = [];

    table = $(filter_div).find('table');

    // Filter options
    limit_filter_to = JSON.parse($(filter_div).find('input[name="limit_filter_to_cols"]').attr('value'));

    // Looping through rows
    table.find('tr').each(function(tr_index, tr){

        // loopging through columns
        $(tr).find('td').each(function(td_index, td) {

            /* If we have to sort on current column,
            (we do 'td_index+1' because limit_filter_to doesn't start at 0 like td_index)*/
            if(limit_filter_to.length == 0 || limit_filter_to.includes(td_index+1))
            {

                column_name = 'epfl-table-filter-col-'+td_index;
                // Adding class to sort
                $(td).toggleClass(column_name);

                // If we don't have all columns names yet, 
                if(!columnsOk)
                {
                    columns.push(column_name);
                }
            }

        });// End looping on all columns

        // Now we have all columns
        columnsOk = true;
        
    });
    
    // Getting header configuration for current table
    header_options = $(filter_div).find('input[name="header"]').attr('value');
    header_options = (header_options.trim() != '')? header_options.split(','): [];
    
    if(header_options.length > 0)
    {
        
        // if we have at least one option, 'header' will be in it, so...

        // Changing <td> into <th> in header
        table.find('tr:first').find('td').changeElementType('th');
        // Wraping <tr><th> into <thead>
        table.find('tr:first').wrap('<thead/>').parent().prependTo(table);

        // if we also have to sort table
        if(header_options.includes('sort'))
        {
            // Setting table to be sorted
            table.toggleClass('table table-sortable tablesaw-stack tablesaw-sortable');
            table.attr('data-tablesaw-sortable', '');

            // Adding sortable option to headers
            table.find('tr:first').find('th').each(function(th_index, th){
                $(th).attr('data-tablesaw-sortable-col', '');
                $(th).toggleClass('tablesaw-sortable-head');
            });

        }

    }

    table.find('tbody').toggleClass('list');

    // Creating object to sort current table
    filterList.push(new List($(filter_div).attr('id'), {valueNames: columns}));

});
