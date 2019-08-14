/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */
import * as axios from 'axios';

import './epfl-news'
import './epfl-memento'
import './epfl-cover'
import './epfl-toggle'
import './epfl-quote'
import './epfl-people'
import './epfl-map'
import './epfl-introduction'
import './epfl-hero'
import './epfl-google-forms'
import './epfl-video'
import './epfl-scheduler'
import './epfl-tableau'
import './epfl-infoscience-search'
import './epfl-scienceqa'
import './epfl-page-teaser'
import './epfl-custom-highlight'
import './epfl-page-highlight'
import './epfl-post-teaser'
import './epfl-post-highlight'
import './epfl-social-feed'
import './epfl-contact'
import './epfl-schools'
import './epfl-card'

const getHomeURL = () => {
    let href = window.location.href;
    let index = href.indexOf('/wp-admin');
    let homeUrl = href.substring(0, index);
    return homeUrl;
}

wp.domReady( function() {
    // see ./plugin.php for the right list
    let allowedBlocks = [
        'epfl/news',
        'epfl/memento',
        'epfl/cover',
        'epfl/cover-dynamic',
        'epfl/toggle',
        'epfl/quote',
        'epfl/people',
        'epfl/map',
        'epfl/introduction',
        'epfl/hero',
        'epfl/google-forms',
        'epfl/video',
        'epfl/scheduler',
        'epfl/tableau',
        'epfl/page-teaser',
        'epfl/custom-highlight',
        'epfl/page-highlight',
        'epfl/post-teaser',
        'epfl/post-highlight',
        'epfl/infoscience-search',
        'epfl/social-feed',
        'epfl/contact',
        'epfl/schools',
        'epfl/card',
        'core/paragraph',
        'core/heading',
    ];
    wp.blocks.getBlockTypes().forEach( function( blockType ) {
        if ( allowedBlocks.indexOf( blockType.name ) === -1 ) {
            wp.blocks.unregisterBlockType( blockType.name );
        }
    } );

} );

export const getAllPagesOrPosts = (type, lang) => {

    return new Promise((resolve, reject) => {

        let homeUrl = getHomeURL();
        if (type !== 'pages' && type !== 'posts') {
            type = 'pages';
        }
        let apiRestUrl = `${homeUrl}/?rest_route=/wp/v2/${type}&per_page=100`;

        if (lang) {
            apiRestUrl += '&lang=' + lang;
        }

        axios.get(apiRestUrl).then(
            response => {

                // Total number of pages on the WP site
                let nbTotalPages = response.headers["x-wp-total"];

                // Total number of pages (in the pagination sense)
                let nbPages = response.headers["x-wp-totalpages"];

                // We build a array containing all pages of WP site
                const pages = [];

                for (let page = 1; page <= nbPages; page += 1) {

                    axios.get(`${apiRestUrl}&page=${page}`).then(

                        pagesByPagination => {

                            pages.push(pagesByPagination.data);

                            if (pages.flat().length == nbTotalPages) {
                                resolve(pages.flat());
                            }
                        }
                    );
                }
            }
        ).catch( err => reject(err))
    });
};
