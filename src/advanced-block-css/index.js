/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody } from '@wordpress/components';
import { InspectorControls, PlainText } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';

/**
 * External dependencies
 */
import { assign } from 'lodash';
import CodeMirror from '@uiw/react-codemirror';
import MonacoEditor from '@monaco-editor/react';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/view';

/**
 * Internal dependencies
 */
/*globals advancedBlockCssOptions */
import './style.scss';

/**
 * Block.json的なやつ
 *
 * @param {string} settings
 */
const abcRegisterBlockTypeFuc = ( settings ) => {
	if ( hasBlockSupport( settings, 'customClassName', true ) ) {
		settings.attributes = assign( settings.attributes, {
			advancedBlockCss: {
				type: 'string',
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
		if ( hasCustomClassName && isSelected ) {
			return (
				<>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody
							className={ 'abc-editor-panel-body' }
							title={ __(
								'Advanced Block CSS',
								'advanced-block-css'
							) }
							initialOpen={ advancedBlockCss ? true : false }
						>
							<div>
								{ editorOption === 'CodeMirror' && (
									<CodeMirror
										className="abc-editor"
										height="200px"
										extensions={ [
											css(),
											EditorView.lineWrapping,
										] }
										value={ advancedBlockCss }
										onChange={ onChange }
									/>
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
							</div>
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
