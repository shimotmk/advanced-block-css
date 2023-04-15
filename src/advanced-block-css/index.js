/**
 * External dependencies
 */
import classnames from 'classnames';

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
import { useEffect, useContext, createPortal } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import { ABCIconBold } from '../utils/logo';
import ABCCodeMirror from './edit.js';

export const existsCss = ( css ) => {
	// cssが存在するかつ空白文字のみではない
	return css && css.match( /\S/g );
};
export const customCssSelectorRegex = /selector/g;

export const hasCustomCssSupport = ( blockName ) => {
	// 追加CSSクラスを許可していない場合はfalse
	if ( ! hasBlockSupport( blockName, 'customClassName', true ) ) {
		return false;
	}
	return true;
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
		advancedBlockAdminCss: {
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
		const { name, attributes, setAttributes, isSelected } = props;
		if ( ! hasCustomCssSupport( name ) || ! isSelected ) {
			return <BlockEdit { ...props } />;
		}

		const {
			advancedBlockCss,
			advancedBlockJavaScript,
			className,
		} = attributes;
		// 追加CSSを半角文字列で分けて配列化
		const nowClassArray = className ? className.split( ' ' ) : [];

		// 追加 CSS クラスにcustom_block_idがあるか
		const existsCustomCssClass = ( _nowClassArray ) => {
			return _nowClassArray.indexOf( 'custom_block_id' ) !== -1
				? true
				: false;
		};

		// カスタムCSSにselectorがあるか
		const existsCustomCssSelector = ( customCss ) => {
			return customCssSelectorRegex.test( customCss );
		};

		// CustomCssが変更されたとき
		useEffect( () => {
			if (
				! existsCustomCssClass( nowClassArray ) &&
				existsCustomCssSelector( advancedBlockCss )
			) {
				// カスタムCSS用クラスを追加
				setAttributes( {
					className: classnames( nowClassArray, `custom_block_id` ),
				} );
			}

			if (
				existsCustomCssClass( nowClassArray ) &&
				! existsCustomCssSelector( advancedBlockCss )
			) {
				// カスタムCSS用クラスを削除
				const deleteClass = nowClassArray.indexOf( 'custom_block_id' );
				nowClassArray.splice( deleteClass, 1 );
				setAttributes( { className: classnames( nowClassArray ) } );
			}
		}, [ advancedBlockCss ] );

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
									advancedBlockJavaScript: value,
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
				customCssSelectorRegex,
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
	'advanced-block-css/register-block-type',
	abcRegisterBlockTypeFuc
);

addFilter(
	'editor.BlockEdit',
	'advanced-block-css/block-edit',
	abcBlockEditFunc
);

addFilter(
	'editor.BlockListBlock',
	'advanced-block-css/block-list-block',
	abcBlockListBlockFun
);
