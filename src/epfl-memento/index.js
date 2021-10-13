import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import * as axios from 'axios';

import './style.scss'

import mementoIcon from './memento-icon'
import PreviewMemento from './preview'
import InspectorControlsMemento from './inspector'
import './utils.js';

export const version = "v1.4.0";

const {__} = wp.i18n
const {registerBlockType} = wp.blocks
const {Fragment} = wp.element

registerBlockType(
    'epfl/memento',
    {
        title: __('EPFL Memento', 'epfl'),
        description: __(
            'Display events from memento.epfl.ch',
            'epfl'
        ),
        icon: mementoIcon,
        category: hasCommonCategory ? 'common' : 'embed',
        keywords: [
            __('events', 'epfl'),
        ],
        attributes: getTooltippedAttributes({
            memento: {
                type: 'integer',
                default: 1,
            },
            template: {
                type: 'string',
                default: 'slider_with_the_first_highlighted_event',
            },
            nbEvents: {
                type: 'integer',
                default: 10,
            },
            lang: {
                type: 'string',
                default: 'en',
            },
            category: {
              type: 'integer',
              default: 0,
            },
            categories: {
                type: 'string',
                default: null,
            },
            period: {
                type: 'string',
                default: 'upcoming',
            },
            year: {
                type: 'string',
                default: 'no-filter',
            },
            keyword: {
                type: 'string',
                default: "",
            }
        }),
        example: getTooltippedExample(),
        supports: {
            customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
        },

        edit: props => {
            const {attributes, className, setAttributes} = props

            if ( attributes.asToolTip ) {
                // render the tooltip
                return(
                    <Fragment>
                        <img src={ blockThumbnails.memento } />
                    </Fragment>
                );
            }

            return (
                <Fragment>
                    <InspectorControlsMemento {...{attributes, setAttributes}} />
                    <h2 className="epfl-block-title">{__('EPFL Memento', 'epfl')}</h2>
                    <PreviewMemento {...{attributes, className}} />
                </Fragment>
            )
        },

        save: props => {
            // This block is a dynamic block.
            // So we save only something like this :
            // <!-- wp:epfl/memento {"memento":"111","template":"4", ...}
            // /-->
            // The render of this block for the end user is doing in PHP.
            return null
        },
    }
)
