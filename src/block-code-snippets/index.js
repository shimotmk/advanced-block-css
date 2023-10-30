/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { PanelBody, TextareaControl } from '@wordpress/components';
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
import ABCCodeMirror from './edit.js';

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
const abcRegisterBlockTypeFuc = ( settings ) => {
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
const abcBlockEditFunc = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes } = props;
		if ( ! hasCustomCssSupport( name ) ) {
			return <BlockEdit { ...props } />;
		}

		const { advancedBlockJavaScript } = attributes;

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
						<ABCCodeMirror { ...props } />
						<p>advancedBlockJavaScript</p>
						<TextareaControl
							value={
								advancedBlockJavaScript
									? advancedBlockJavaScript
									: ''
							}
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
const abcBlockListBlockFun = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { name, attributes, clientId } = props;
		if ( ! hasCustomCssSupport( name ) ) {
			return <BlockListBlock { ...props } />;
		}
		const { advancedBlockCss } = attributes;
		const element = useContext( BlockList.__unstableElementContext );

		// selectorをUniqueクラスに変換する
		let cssTag = advancedBlockCss ? advancedBlockCss : '';
		if ( cssTag ) {
			cssTag = advancedBlockCss.replace(
				/selector/g,
				`#block-${ clientId }`
			);
		}

		// cssに.editor-styles-wrapperをwrapする
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
	abcRegisterBlockTypeFuc
);

addFilter(
	'editor.BlockEdit',
	'block-code-snippets/block-edit',
	abcBlockEditFunc
);

addFilter(
	'editor.BlockListBlock',
	'block-code-snippets/block-list-block',
	abcBlockListBlockFun
);
