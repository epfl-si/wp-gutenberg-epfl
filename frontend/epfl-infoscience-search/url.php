<?php

namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;


/**
 * This is the old way to get an url. Kept to be able build the md5
 * so we can crawl the cache again
*/
function old_generate_url_from_attributes($attributes, $unmanaged_attributes) {
    # Url priority :
    # 1. direct url -> $attributes['url']
    # 2. url attribute ->
    # 3. with all the attributes, we built a custom one
    $url = htmlspecialchars_decode( $attributes['url'] );

    if ( $url ) {
        $url = trim( $url );
        # assert it is an infoscience one :
        if ( preg_match( '#^https?://infoscience.epfl.ch/#i', $url ) !== 1 ) {
            return Utils::render_user_msg( "Infoscience search shortcode: Please check the url" );
        }

        $recid_matches = [];
        preg_match( '#^https?://infoscience.epfl.ch/record/(\d+)/?#i', $url, $recid_matches );

        if ( count( $recid_matches ) >= 2 ) {
            # this is direct record url
            # transform it to a recid search
            $recid = $recid_matches[1];
            $url   = "https://infoscience.epfl.ch/search?p=recid:'" . $recid . "'";
        }

        $parts = parse_url( $url );
        $query = proper_parse_str( $parts['query'] );

        #
        # override values

        # set the given url to the good format
        $query['of'] = 'xm';

        # when it is a basket, dont touch the args, only the of one :
        if ( ! array_key_exists( 'bskid', $query ) || empty( $query['bskid'] ) ) {

            # set default if not already set :
            if ( ! array_key_exists( 'rg', $query ) || empty( $query['rg'] ) ) {
                $query['rg'] = '100';
            }

            #empty or not, the limit attribute has the last word
            if ( ! empty( $attributes['limit'] ) ) {
                $query['rg'] = $attributes['limit'];
            }

            if ( ! array_key_exists( 'sf', $query ) || empty( $query['sf'] ) ) {
                $query['sf'] = 'year';
            }

            if ( ! array_key_exists( 'so', $query ) || empty( $query['so'] ) ) {
                if ( array_key_exists( 'sort', $attributes ) && $attributes['sort'] === 'asc' ) {
                    $query['so'] = 'a';
                } else {
                    $query['so'] = 'd';
                }
            }
        }

        # We may use http_build_query($query, null, '&amp;'); when provided urls are overencoded
        # looks fine at the moment
        $query = http_build_query( $query, null );

        # from foo[1]=bar1&foo[2]=bar2 to foo[]=bar&foo[]=bar2
        $url = preg_replace( '/%5B(?:[0-9]|[1-9][0-9]+)%5D=/', '=', $query );

        $url = INFOSCIENCE_SEARCH_URL . urldecode( $url );
    } else {
        # no direct url were provided, build the custom one ourself
        $url = epfl_infoscience_search_generate_url_from_attrs( $attributes + $unmanaged_attributes );
    }

    return $url;
}

/**
 * Receive and parse the attributes to generate an url.
 * if $attributes['url'] is set, use it, or build a custom one with the other attributes
 */
function generate_url_from_attributes($attributes, $unmanaged_attributes) {
    $url = htmlspecialchars_decode($attributes['url']);

    if ($url) {  // we got a direct url
        $url = trim($url);
        # assert it is an infoscience one :
        if (
            (!preg_match( '#^https?://infoscience.epfl.ch/#i', $url ) == 1) &&
            (!preg_match( '#^https?://infoscience-prod.epfl.ch/#i', $url) == 1 ) &&
            (!preg_match( '#^https?://infoscience-test.epfl.ch/#i', $url) == 1 )
        ) {
            return render_user_msg("Infoscience search shortcode: Please check the url");
        }

        # use regex's to find which url we may have to transform
        $recid_matches = [];  # direct record
        $unit_url_matches = [];  # direct unit url
        $person_url_matches = [];  # direct person url

        preg_match('#^https?://infoscience.epfl.ch/record/(\d+)/?#i', $url, $recid_matches);
        if (count($recid_matches) >= 2) {
            # this is direct record url
            # transform it to a recid search
            $recid = $recid_matches[1];
            $url = "https://infoscience.epfl.ch/search?p=recid:'" . $recid . "'";
        } else {
            preg_match('/\/entities\/orgunit\/([^\/]+)$/', $url, $unit_url_matches);

            if (count($unit_url_matches) >= 2) {
                $unit_uuid = $unit_url_matches[1];

                $url = 'https://infoscience.epfl.ch/server/api/discover/export?spc.page=1&configuration=RELATION.OrgUnit.publications&scope='. $unit_uuid;
            } else {
                preg_match('/\/entities\/person\/([^\/]+)$/', $url, $person_url_matches);

                if (count($person_url_matches) >= 2) {
                    $person_uuid = $person_url_matches[1];

                    $url = 'https://infoscience.epfl.ch/server/api/discover/export?spc.page=1&configuration=RELATION.Person.researchoutputs&scope='. $person_uuid;
                }
            }
        }

        $parts = parse_url($url);
        $query = proper_parse_str($parts['query']);

        #
        # override parameters

        # set the given url to the good format
        $query['of'] = 'xm';

        # mandatory params
        $query['spc.page'] = '1';

        # set default if not already set :
        if (!array_key_exists('spc.rpp', $query) || empty($query['spc.rpp'])) {
            $query['spc.rpp'] = '20';
        }

        # empty or not, the limit attribute has the last word
        if (!empty($attributes['limit'])) {
            $query['spc.rpp'] = $attributes['limit'];
        }

        if (!array_key_exists('spc.sf', $query) || empty($query['spc.sf'])) {
            $query['spc.sf'] = 'dc.date.issued';
        }

        if (!array_key_exists('spc.sd', $query) || empty($query['spc.sd'])) {
            if (array_key_exists('sort', $attributes) && $attributes['sort'] === 'asc') {
                $query['spc.sd'] = 'ASC';
            } else {
                $query['spc.sd'] = 'DESC';
            }
        }

        # We may use http_build_query($query, null, '&amp;'); when provided urls are overencoded
        # looks fine at the moment
        $query = http_build_query($query, null);

        # from foo[1]=bar1&foo[2]=bar2 to foo[]=bar&foo[]=bar2
        $url = preg_replace('/%5B(?:[0-9]|[1-9][0-9]+)%5D=/', '=', $query);

        $url = INFOSCIENCE_SEARCH_URL . urldecode($url);
    } else {
        # no direct url were provided, build the custom one ourself
        $url = epfl_infoscience_search_generate_url_from_attrs($attributes+$unmanaged_attributes);
    }

    return $url;
}

/**
 * From any attributes, set them as url parameters for Infoscience
 *
 * @param array $attrs attributes that need to be sent to Infoscience
 *
 * @return string $url the url build
 */
function epfl_infoscience_search_generate_url_from_attrs($attrs) {
    $url = INFOSCIENCE_SEARCH_URL;

    # default parameters may change afterward
    $default_parameters = array(
        'ln' => 'en',  #TODO: dynamic language
        'of' => 'xm',  # template format
        'sf' => 'year', # year sorting
    );

    $parameters = epfl_infoscience_search_convert_keys_values($attrs);
    $parameters = $default_parameters + $parameters;

    $additional_parameters_array = [
        # remove pendings by setting collection to accepted
        'c' => 'Infoscience/Published',
    ];

    foreach($additional_parameters_array as $key => $add_params) {
        if (array_key_exists($key, $parameters)) {
            $parameters[$key] = [
                $parameters[$key],
                $add_params,
            ];
        }
    }

    $parameters = array_filter($parameters);

    # if we have only one operator set (meaning p1 is set and non p2 or p3)
    # and field resctriction is "any"
    # transform it to a non-advanced-search, as it has a better
    # search engine (mainly the date1->date2 operator)
    if (!empty($parameters['p1']) &&
        empty($parameters['p2']) &&
        empty($parameters['p3'])) {

        // yes there is a tricky tranformation to check (fieldrestriction -> to f1)
        if (array_key_exists('fieldrestriction', $parameters) &&
            $parameters['fieldrestriction'] === 'any' &&
            empty($parameters['f1']) ) {
            unset($parameters['as1']);
            unset($parameters['op1']);
            $parameters['p'] = $parameters['p1'];
            unset($parameters['p1']);
        }
    }

    # sort before build, for the caching system
    ksort($parameters);

    return INFOSCIENCE_SEARCH_URL . http_build_query($parameters);
}


/**
 * From any attributes, set them as url parameters for Infoscience
 * It may not used anymore as this feature is no more in Dspace
 *
 * @param array $attrs attributes that need to be sent to Infoscience
 *
 * @return string $url the url build
 */
function epfl_infoscience_search_convert_keys_values($array_to_convert) {
    $convert_fields = function($value) {
        return ($value === 'any') ? '' : $value;
    };

    $convert_operators = function($value) {
        if ($value === 'and') {
            return 'a';
        } elseif ($value === 'or') {
            return  'o';
        } elseif ($value === 'and_not') {
            return  'n';
        } else {
            return $value;
        }
    };

    $sanitize_text_field = function($value) {
        return sanitize_text_field($value);
    };

    $sanitize_pattern_field = function($value) {
        # find if we have an encoded value, and decode it
        # this code allow retro-compatibility,
        # as encoding value was not done before
        if (preg_match('/%[0-9a-f]{2}/i', $value)) {
            $value = urldecode($value);
        }
        return sanitize_text_field($value);
    };

    $map = array(
        'pattern' => ['p1', $sanitize_pattern_field],
        'field' => ['f1', $convert_fields],
        'limit' => ['rg', function($value) {
            return ($value === '') ? '100' : $value;
        }],
        'sort' => ['so', function($value) {
            return ($value === 'asc') ? 'a' : 'd';
        }],
        'collection' => ['c', $sanitize_text_field],
        'pattern2' => ['p2', $sanitize_pattern_field],
        'field2' => ['f2', $convert_fields],
        'operator2' => ['op1', $convert_operators],
        'pattern3' => ['p3', $sanitize_pattern_field],
        'field3' => ['f3', $convert_fields],
        'operator3' => ['op2', $convert_operators],
    );

    $converted_array = array();

    foreach ($array_to_convert as $key => $value) {
        if (array_key_exists($key, $map)) {
            # is the convert function defined
            if (array_key_exists(1, $map[$key]) && $map[$key][1])
            {
                $converted_array[$map[$key][0]] = $map[$key][1]($value);
            } else {
                $converted_array[$map[$key][0]] = $value;
            }
        }
        else {
            $converted_array[$key] = $value;
        }
    }
    return $converted_array;
}
