import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import newsIcon from './people-icon'
import PreviewPeople from './preview'
import InspectorControlsPeople from './inspector'

export const version = "v1.2.0";

const {__} = wp.i18n
const {registerBlockType} = wp.blocks
const {Fragment} = wp.element

registerBlockType(
    'epfl/people',
    {
        title: __("EPFL People", 'epfl'),
        description: __(
            'Display a list of people from the EPFL directory using different criteria',
            'epfl'
        ),
        icon: newsIcon,
        category: hasCommonCategory ? 'common' : 'embed',
        keywords: [
            __('people', 'epfl'),
        ],
        attributes: getTooltippedAttributes({
            units: {
                type: 'string',
            },
            groups: {
                type: 'string',
            },
            scipers: {
                type: 'string',
            },
            doctoralProgram: {
                type: 'string',
            },
            fonction: {
                type: 'string',
            },
            columns: {
                type: 'string',
                default: '3',
            },
            customData: {
                type: 'string',
            },
            filteredFields: {
                type: 'string',
            },
            order: {
                type: 'string',
                default: 'alphabetical',
            },
            structure: {
                type: 'string',
            },
            displayFunction: {
                type: 'boolean',
                default: true,
            },
            displayRoom: {
                type: 'boolean',
                default: true,
            },
            displayEmail: {
                type: 'boolean',
                default: true,
            },
            displayPhone: {
                type: 'boolean',
                default: true,
            },
            displayCustomData: {
                type: 'boolean',
                default: true,
            },
            title: {
                type: 'string',
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
                        <img src={ blockThumbnails.people } />
                    </Fragment>
                );
            }

            return (
                <Fragment>
                    <InspectorControlsPeople {...{attributes, setAttributes}} />
                    <h2 className="epfl-block-title">{__('EPFL People', 'epfl')}</h2>
                    <PreviewPeople {...{attributes, className}} />
                </Fragment>
            )
        },

        save: props => {
            return null
        },
    }
)
