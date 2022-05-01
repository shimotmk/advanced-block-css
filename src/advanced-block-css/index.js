/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { PanelBody } from '@wordpress/components';
import { InspectorControls, PlainText } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';

/**
 * External dependencies
 */
import { assign } from 'lodash';
import MonacoEditor from '@monaco-editor/react';

/**
 * Internal dependencies
 */
/*globals advancedBlockCssOptions */
import './style.scss';
import { ABCIconBold } from '../utils/logo';
import ABCCodeMirror from './edit.js';

export const inString = ( str, keyword ) => {
	return str.indexOf( keyword ) !== -1;
};

export const isAddBlockCss = ( blockName ) => {
	// coreブロックの時 true を返す
	const allowed = [ 'core' ];
	const returnBool =
		allowed.find( ( item ) => inString( blockName, item ) ) !== undefined;
	return returnBool;
};

/**
 * Block.json
 *
 * @param {string} settings
 */
const abcRegisterBlockTypeFuc = ( settings ) => {
	if (
		isAddBlockCss( settings.name ) &&
		hasBlockSupport( settings, 'customClassName', true )
	) {
		settings.attributes = assign( settings.attributes, {
			advancedBlockCss: {
				type: 'string',
				default: null,
			},
		} );
	}
	return settings;
};
addFilter(
	'blocks.registerBlockType',
	'advanced-block-css/register-block-type',
	abcRegisterBlockTypeFuc
);

/**
 * edit.js
 */
const abcBlockEditFunc = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes, isSelected } = props;
		const { advancedBlockCss } = attributes;
		const hasCustomClassName = hasBlockSupport(
			name,
			'customClassName',
			true
		);
		const editorOption = advancedBlockCssOptions.editor;

		const onChange = ( value ) => {
			setAttributes( { advancedBlockCss: value } );
		};
		if ( isAddBlockCss( props.name ) && hasCustomClassName && isSelected ) {
			return (
				<>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody
							className={ 'abc-editor-panel-body' }
							title={ `Advanced Block CSS` }
							icon={ ABCIconBold }
							initialOpen={ advancedBlockCss ? true : false }
						>
							{ editorOption === 'CodeMirror' && (
								<ABCCodeMirror { ...props } />
							) }
							{ editorOption === 'MonacoEditor' && (
								<MonacoEditor
									className="abc-editor"
									height="200px"
									defaultLanguage="css"
									options={ {
										wordWrap: true,
										quickSuggestions: false,
									} }
									value={ advancedBlockCss }
									onChange={ onChange }
								/>
							) }
							{ editorOption === 'PlainText' && (
								<PlainText
									className="abc-editor abc-plane-text"
									value={ advancedBlockCss }
									onChange={ onChange }
								/>
							) }
						</PanelBody>
					</InspectorControls>
				</>
			);
		}
		return <BlockEdit { ...props } />;
	};
}, 'abcBlockEdit' );
addFilter(
	'editor.BlockEdit',
	'advanced-block-css/block-edit',
	abcBlockEditFunc
);

/**
 * edit.js
 */
const abcBlockListBlockFun = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const acsStyle = props.attributes.advancedBlockCss
			? props.attributes.advancedBlockCss
			: '';
		return (
			<>
				{ acsStyle ? <style>{ acsStyle }</style> : null }
				<BlockListBlock { ...props } />
			</>
		);
	};
}, 'abcBlockListBlock' );
addFilter(
	'editor.BlockListBlock',
	'advanced-block-css/block-list-block',
	abcBlockListBlockFun
);
