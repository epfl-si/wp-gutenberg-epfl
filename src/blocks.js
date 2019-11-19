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

import './epfl-caption-cards'
import './epfl-card-deck'
import './epfl-contact'
import './epfl-cover'
import './epfl-custom-highlight'
import './epfl-custom-teaser'
import './epfl-definition-list'
import './epfl-google-forms'
import './epfl-hero'
import './epfl-infoscience-search'
import './epfl-introduction'
import './epfl-links-group'
import './epfl-map'
import './epfl-memento'
import './epfl-news'
import './epfl-page-highlight'
import './epfl-page-teaser'
import './epfl-people'
import './epfl-post-highlight'
import './epfl-post-teaser'
import './epfl-quote'
import './epfl-scheduler'
import './epfl-scienceqa'
import './epfl-share'
import './epfl-social-feed'
import './epfl-tableau'
import './epfl-toggle'
import './epfl-video'


const getHomeURL = () => {
    let href = window.location.href;
    let index = href.indexOf('/wp-admin');
    let homeUrl = href.substring(0, index);
    return homeUrl;
}


/**
 * Fetch all pages or post from the site
 * @param {string} type: 'pages' or 'posts'
 * @param {string} lang: optionnal, set it to limit the list to a specific language
 * @param {array of string} fields: optionnal, list of fields we want the data for the post.
 *                                  By default we mainly need the id and the title, ...
 *                                  Warning, getting content make a render of the post
 * @return a Promise of a list of pages or posts
 */
export const getAllPagesOrPosts = async (type='pages', lang=null, fields=['id', 'title']) => {
    return new Promise((resolve, reject) => {

        let homeUrl = getHomeURL();

        if (type !== 'pages' && type !== 'posts') {
            throw new Error("Please set the type parameter to 'pages' or 'posts'");
        }

        let apiRestUrl = `${homeUrl}/?rest_route=/wp/v2/${type}&per_page=100`;

        if (lang) {
            apiRestUrl += '&lang=' + lang;
        }

        if (fields) {
            fields.forEach((field) => {apiRestUrl += `&_fields[]=${field}`;});
        }

        axios.get(apiRestUrl).then(
            response => {
                // Total number of pages on the WP site
                let nbTotalPages = response.headers["x-wp-total"];

                // Total number of pages (in the pagination sense)
                let nbPages = response.headers["x-wp-totalpages"];

                // We build a array containing all pages of WP site
                const pages = [];

                // get first iteration
                pages.push(response.data);

                // is first iteration enough ?
                if (pages.flat().length == nbTotalPages) {
                    // all fine ! return what we got
                    resolve(pages.flat());
                }

                for (let page = 2; page <= nbPages; page += 1) {

                    axios.get(`${apiRestUrl}&page=${page}`).then(

                        pagesByPagination => {

                            pages.push(pagesByPagination.data);

                            if (pages.flat().length == nbTotalPages) {
                                resolve(pages.flat());
                            }
                        }
                    ).catch( err => reject(err));
                }
            }
        ).catch( err => reject(err));
    });
};
