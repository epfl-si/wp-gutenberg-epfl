import React from 'react';

import { PanelBody } from '@wordpress/components'
import { Component } from '@wordpress/element'

const { __ } = wp.i18n

const {
    MediaUpload,
} = wp.editor;

const {
    TextControl,
    TextareaControl,
} = wp.components;

export default class CardPanel extends PanelBody {
	constructor( props ) {
        super( props );
        const { attributes, setAttributes, index } = this.props
    }

    getImageURL(attributes) {
        let url = "https://via.placeholder.com/1920x1080.jpg";
        if (attributes.image1) {
            url = attributes.image1;
        }
        return url;
    }

    onImageSelect(imageObject) {
        setAttributes({
            image1: imageObject.sizes.full.url,
            imageId1: imageObject.id
        })
    }

    render() {
        const { attributes, setAttributes, index } = this.props;

        <PanelBody title='Card { index }' >
            <TextControl
                label={ __('Title', 'wp-gutenberg-epfl') }
                value={ attributes.title1 }
                onChange={ title1 => setAttributes( { title1 } ) }
            />
            <TextControl
                label={ __('Link', 'wp-gutenberg-epfl') }
                value={ attributes.link1 }
                onChange={ link1 => setAttributes( { link1 } ) }
            />
            <MediaUpload
                onSelect={ onImageSelect }
                type="image"
                value={ attributes.image1 }
                render={({ open }) => (
                    <div>
                        <button onClick={ open }>
                        { __('Upload Image', 'wp-gutenberg-epfl') }
                        </button>
                        <div style={ { marginTop: '5px' } }>{ __('Recommended image size: ???', 'wp-gutenberg-epfl') }</div>
                    </div>
                )}
            />
            <TextareaControl
                label={ __('Text', 'wp-gutenberg-epfl') }
                value={ attributes.content1 }
                onChange={ content1 => setAttributes( { content1 } ) }
            />
        </PanelBody>
    }
}
