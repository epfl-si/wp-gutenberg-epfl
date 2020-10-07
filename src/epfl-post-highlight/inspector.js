
import React from 'react';
import Select from 'react-select';
import { getAllPagesPostsOrCategories } from '../index';
import { version } from './index';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.blockEditor

const {
    PanelBody,
    RadioControl,
    Spinner,
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
        getAllPagesPostsOrCategories('posts', current_lang_code).then( (allPosts) => {
            this.setState({ posts: allPosts });
        });
	}

    render() {
		if ( ! this.state.posts ) {
			return (
				<p>
					<Spinner />
					{ __('Loading posts', 'epfl') }
				</p>
			)
        }

        const { attributes, setAttributes } = this.props
        const handlePostChange = ( post ) => setAttributes( { post: JSON.stringify( post ) } );

        let content = (
            <div>
                {__( 'No post found', 'epfl') }
            </div>
        )

        let optionsLayoutList = [
            { value: 'right', label: __('Right', 'epfl')},
            { value: 'bottom', label: __('Bottom', 'epfl')},
            { value: 'left', label: __('Left', 'epfl')},
        ];

        if (this.state.posts !== null) {

            let optionsPostsList = [];

            this.state.posts.forEach(post => {
                optionsPostsList.push({ label: post.title.rendered, value: post.id });
            });

            // add empty value at first, in case for an unselect
            optionsPostsList.unshift({ value: null, label: __('None', 'epfl') });

            {/*const divStyle = {
                height: '600px',
            };*/}

            const selectStyle = {
                marginBottom: '20px'
            }

            content = (

                <div>
                	<InspectorControls>
                        <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/post-highlight-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                        <p className="wp-block-help">{ version }</p>
                        <PanelBody title={ __( 'Layout', 'epfl' ) }>
                            <RadioControl
                                label={ __("Select a layout", 'epfl') }
                                selected={ attributes.layout }
                                options={ optionsLayoutList }
                                onChange={ layout => setAttributes( { layout } ) }
                                help={ __('Decides where the text will be aligned, to allow the subject of the picture to be visible', 'epfl')}
                            />
                        </PanelBody>
                	</InspectorControls>
                        <Select
                            id='epfl-post-highlight-post'
                            name='epfl-post-highlight-post'
                            value={ JSON.parse( attributes.post ) }
                            onChange={ handlePostChange }
                            options={ optionsPostsList }
                            placeholder={ __('Select post', 'epfl') }
                        />
                </div>
            )
        }
        return content;
    }
}
