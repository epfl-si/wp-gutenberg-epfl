# epfl_allowed_iframe

This shortcode integrate iframes in pages if their source URL is validated based
on a whitelist.

The whitelist stands in the [allowed_url.txt] file.


## URLs validation

The URL validation is done the following way:

1. First, all URLs (both from the shortcode attribute or the whitelist) have to
   pass the PHP's [FILTER_VALIDATE_URL].
2. Shortcode's URL has to start with `https`.
3. `PHP_URL_HOST` from PHP's [parse_url] has to match.
4. `PHP_URL_PATH` from PHP's [parse_url] have to match.


## Usage example

The following shortcode
```
[epfl_allowed_iframe url='https://menus.epfl.ch/cgi-bin/getMenus?&midisoir=midi']
```
will display the iframe if the whitelist contains the same URL.


[allowed_url.txt]: https://github.com/epfl-si/wp-gutenberg-epfl/blob/master/shortcodes/epfl-allowed-iframe/allowed_url.txt
[FILTER_VALIDATE_URL]: https://www.php.net/manual/en/filter.filters.validate.php
[parse_url]: https://www.php.net/manual/en/function.parse-url.php