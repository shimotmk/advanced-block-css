/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { PanelBody } from '@wordpress/components';
import {
	InspectorControls,
	transformStyles,
	BlockList,
} from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';
import { useContext, createPortal } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import { ABCIconBold } from '../utils/logo';

/**
 * External dependencies
 */
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';

export const hasCustomCssSupport = ( blockName ) => {
	if ( ! hasBlockSupport( blockName, 'customClassName', true ) ) {
		return false;
	}
	return true;
};

export const emptyStringToUndefined = ( string ) => {
	return string !== '' ? string : undefined;
};

/**
 * Block.json
 *
 * @param {string} settings
 */
const bcsRegisterBlockTypeFuc = ( settings ) => {
	if ( ! hasCustomCssSupport( settings.name ) ) {
		return settings;
	}
	settings.attributes = {
		...settings.attributes,
		advancedBlockCss: {
			type: 'string',
		},
		advancedBlockJavaScript: {
			type: 'string',
		},
	};
	return settings;
};

/**
 * edit.js
 */
const bcsBlockEditFunc = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes } = props;
		if ( ! hasCustomCssSupport( name ) ) {
			return <BlockEdit { ...props } />;
		}

		const { advancedBlockCss, advancedBlockJavaScript } = attributes;

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						className={ 'abc-editor-panel-body' }
						title={ `Block Code Snippets` }
						icon={ ABCIconBold }
						initialOpen={ false }
					>
						<p>CSS</p>
						<CodeMirror
							height="200px"
							// https://uiwjs.github.io/react-codemirror/#/extensions/color
							extensions={ [
								css(),
								EditorView.lineWrapping,
							] }
							value={ advancedBlockCss ? advancedBlockCss : '' }
							onChange={(value) => {
								setAttributes({ advancedBlockCss: emptyStringToUndefined(value) })
							}}
						/>
						<p>JavaScript</p>
						<CodeMirror
							value={
								advancedBlockJavaScript
									? advancedBlockJavaScript
									: ''
							}
							height="200px"
							extensions={[
								javascript(),
								EditorView.lineWrapping,
							]}
							onChange={ ( value ) => {
								setAttributes( {
									advancedBlockJavaScript: emptyStringToUndefined(
										value
									),
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'abcBlockEdit' );

/**
 * edit.js
 */
const bcsBlockListBlockFun = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { name, attributes, clientId } = props;
		if ( ! hasCustomCssSupport( name ) ) {
			return <BlockListBlock { ...props } />;
		}
		const { advancedBlockCss } = attributes;
		const element = useContext( BlockList.__unstableElementContext );

		let cssTag = advancedBlockCss ? advancedBlockCss : '';
		if ( cssTag ) {
			cssTag = advancedBlockCss.replace(
				/selector/g,
				`#block-${ clientId }`
			);
		}

		if ( cssTag !== '' ) {
			cssTag = transformStyles(
				[ { css: cssTag } ],
				'.editor-styles-wrapper'
			);
		}

		return (
			<>
				{ element &&
					!! cssTag &&
					createPortal( <style>{ cssTag }</style>, element ) }
				<BlockListBlock { ...props } />
			</>
		);
	};
}, 'abcBlockListBlock' );

addFilter(
	'blocks.registerBlockType',
	'block-code-snippets/register-block-type',
	bcsRegisterBlockTypeFuc
);

addFilter(
	'editor.BlockEdit',
	'block-code-snippets/block-edit',
	bcsBlockEditFunc
);

addFilter(
	'editor.BlockListBlock',
	'block-code-snippets/block-list-block',
	bcsBlockListBlockFun
);
