import {
  hasCommonCategory,
  getTooltippedAttributes,
  getTooltippedExample,
} from '../block-utils.js'

const classNames = require('classnames')

import alertIcon from './alert-icon'

const version = "v1.0.0";

const {__} = wp.i18n;

const {
  registerBlockType,
} = wp.blocks;

const {
  InspectorControls,
  RichText,
} = wp.blockEditor;

const {
  PanelBody,
  SelectControl,
  ToggleControl,
} = wp.components;

const {Fragment} = wp.element;

let optionsAlertType = [
  {value: 'info', label: __('Info', 'epfl')},
  {value: 'success', label: __('Success', 'epfl')},
  {value: 'warning', label: __('Warning', 'epfl')},
  {value: 'danger', label: __('Danger', 'epfl')},
];

registerBlockType('epfl/alert', {
  title: __('EPFL Alert', 'epfl'),
  description: __(
    'Show a message inside a notification zone',
    'epfl'
  ),
  icon: alertIcon,
  category: hasCommonCategory ? 'common' : 'widgets',
  attributes: getTooltippedAttributes({
    content: {
      type: 'string',
    },
    largeDisplay: {
      type: 'boolean',
      default: false,
    },
    canBeClosed: {
      type: 'boolean',
      default: false,
    },
    alertType: {
      type: 'string',
      default: 'info',
    }
  }),
  example: getTooltippedExample(),
  supports: {
    customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
  },
  edit: (props) => {
    const {attributes, className, setAttributes} = props

    if (attributes.asToolTip) {
      // render the tooltip
      return (
        <Fragment>
          <img src={blockThumbnails.alert}/>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <InspectorControls>
          <p><a className="wp-block-help" href={__('https://www.epfl.ch/campus/services/website/alert-en/', 'epfl')}
                target="new">{__('Online help', 'epfl')} </a></p>
          <p className="wp-block-help">{version}</p>
          <PanelBody title='Format'>
            <ToggleControl
              label={__('Large display', 'epfl')}
              checked={attributes.largeDisplay}
              onChange={largeDisplay => setAttributes({largeDisplay})}
            />
            <ToggleControl
              label={__('Alert can be closed', 'epfl')}
              checked={attributes.canBeClosed}
              onChange={canBeClosed => setAttributes({canBeClosed})}
            />
            <SelectControl
              label={__('Alert type', 'epfl')}
              value={attributes.alertType}
              onChange={alertType => setAttributes({alertType})}
              options={optionsAlertType}
            />
          </PanelBody>
        </InspectorControls>
        <div className={classNames({'container': attributes.largeDisplay})}>
          <div
            className={
              classNames('alert',
              `alert-${attributes.alertType}`,
              {container: attributes.largeDisplay},
              {'alert-dismissible fade show': attributes.canBeClosed}
            )}
            role='alert'
          >
            <RichText
              value={ attributes.content}
              onChange={content => setAttributes({content})}
              placeholder={__('Write your text here', 'epfl')}
              keepPlaceholderOnFocus={true}
            />
            { attributes.canBeClosed && (
              <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            )}
          </div>
        </div>
      </Fragment>
    )
  },
  save: (props) => {
    return null;
  },
});
