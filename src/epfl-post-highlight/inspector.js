
import React from 'react';
import Select from 'react-select';
import { getAllPagesOrPosts } from '../blocks';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    RadioControl,
} = wp.components

export default class InspectorControlsPostHighlight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: null,
        }
    }

    componentDidMount() {
        const current_lang_code = document.querySelector( '[name=post_lang_choice]' ).value;
        getAllPagesOrPosts('posts', current_lang_code).then( (allPosts) => {
            this.setState({ posts: allPosts });
        });
	}

    render() {

        const { attributes, setAttributes } = this.props
        const handlePostChange = ( post ) => setAttributes( { post: JSON.stringify( post ) } );

        let content = (
            <div>
                {__( 'No post found', 'wp-gutenberg-epfl') }
            </div>
        )

        let optionsLayoutList = [
            { value: 'right', label: __('Right', 'wp-gutenberg-epfl')},
            { value: 'bottom', label: __('Bottom', 'wp-gutenberg-epfl')},
            { value: 'left', label: __('Left', 'wp-gutenberg-epfl')},
        ];

        if (this.state.posts !== null) {

            let optionsPostsList = [];

            this.state.posts.forEach(post => {
                optionsPostsList.push({ label: post.title.rendered, value: post.id });
            });

            // add empty value at first, in case for an unselect
            optionsPostsList.unshift({ value: null, label: __('None', 'wp-gutenberg-epfl') });

            {/*const divStyle = {
                height: '600px',
            };*/}

            const selectStyle = {
                marginBottom: '20px'
            }

            content = (

                <div>
                	<InspectorControls>
                        <PanelBody title={ __( 'Layout', 'wp-gutenberg-epfl' ) }>
                            <RadioControl
                                label={ __("Select a layout", 'wp-gutenberg-epfl') }
                                selected={ attributes.layout }
                                options={ optionsLayoutList }
                                onChange={ layout => setAttributes( { layout } ) }
                                help={ __('Decides where the text will be aligned, to allow the subject of the picture to be visible', 'wp-gutenberg-epfl')}
                            />
                        </PanelBody>
                	</InspectorControls>
                        <Select
                            id='epfl-post-highlight-post'
                            name='epfl-post-highlight-post'
                            value={ JSON.parse( attributes.post ) }
                            onChange={ handlePostChange }
                            options={ optionsPostsList }
                            placeholder={ __('Select post', 'wp-gutenberg-epfl') }
                        />
                </div>
            )
        }
        return content;
    }
}
