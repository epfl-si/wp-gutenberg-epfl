# epfl_allowed_datawrappers

This shortcode integrate iframes of datawarappers in pages if their ID is validated based on a whitelist.

The whitelist stands in the [allowed_id.txt] file.


## ID validation

Only put the id and not the id and the version :

OK : mDixY
KO : mDixY/5

## Usage example

The following shortcode
```
[epfl_allowed_datawrappers id='LqKHy']
```
will display the iframe if the whitelist contains the same id.

By default the format is container-grid, but a parameter can specify to use large dispaly : container
```
[epfl_allowed_datawrappers id='mDixY7' display='large']
```



[allowed_id.txt]: https://github.com/epfl-si/wp-gutenberg-epfl/blob/master/shortcodes/epfl-allowed-datawrappers/allowed_id.txt
