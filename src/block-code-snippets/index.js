/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, Icon, Button } from '@wordpress/components';
import {
	InspectorControls,
	transformStyles,
	BlockList,
} from '@wordpress/block-editor';
import {
	createHigherOrderComponent,
	useCopyToClipboard,
} from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';
import {
	useContext,
	createPortal,
	createInterpolateElement,
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ABCIconBold, Copy } from '../utils/logo';

/**
 * External dependencies
 */
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';

export const hasCustomCssSupport = (blockName) => {
	if (!hasBlockSupport(blockName, 'customClassName', true)) {
		return false;
	}
	return true;
};

export const emptyStringToUndefined = (string) => {
	return string !== '' ? string : undefined;
};

/**
 * Block.json
 *
 * @param {string} settings
 */
const bcsRegisterBlockTypeFuc = (settings) => {
	if (!hasCustomCssSupport(settings.name)) {
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
const bcsBlockEditFunc = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, setAttributes } = props;
		if (!hasCustomCssSupport(name)) {
			return <BlockEdit {...props} />;
		}
		const { advancedBlockCss, advancedBlockJavaScript } = attributes;

		let iconStyle = {};
		if (advancedBlockCss || advancedBlockJavaScript) {
			iconStyle = {
				...iconStyle,
				background: '#757575',
				fill: '#fff',
			};
		}
		const ref = useCopyToClipboard('selector');

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						className={'abc-editor-panel-body'}
						title={`Block Code Snippets`}
						icon={<Icon icon={ABCIconBold} style={iconStyle} />}
						initialOpen={false}
					>
						<p>CSS</p>
						<CodeMirror
							height="200px"
							// https://uiwjs.github.io/react-codemirror/#/extensions/color
							extensions={[css(), EditorView.lineWrapping]}
							value={advancedBlockCss ? advancedBlockCss : ''}
							onChange={(value) => {
								setAttributes({
									advancedBlockCss:
										emptyStringToUndefined(value),
								});
							}}
							placeholder="selector { color: #fafafa; }"
						/>
						<p>JavaScript</p>
						<CodeMirror
							value={
								advancedBlockJavaScript
									? advancedBlockJavaScript
									: ''
							}
							height="200px"
							extensions={[javascript(), EditorView.lineWrapping]}
							onChange={(value) => {
								setAttributes({
									advancedBlockJavaScript:
										emptyStringToUndefined(value),
								});
							}}
							placeholder='const el = document.querySelector("selector");'
						/>
						<div
							style={{
								background: '#f0f0f0',
								color: '#1e1e1e',
								padding: '12px',
							}}
						>
							{createInterpolateElement(
								/* translators: Using the string (<code>selector</code>)<Button></Button>will be replaced with the block-specific CSS class. */
								__(
									'Using the string (<code>selector</code>)<Button></Button> will be replaced with the block-specific CSS class.',
									'block-code-snippets'
								),
								{
									code: <code />,
									Button: (
										<Button
											icon={Copy}
											size={'small'}
											ref={ref}
										/>
									),
								}
							)}
						</div>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'abcBlockEdit');

/**
 * edit.js
 */
const bcsBlockListBlockFun = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const { name, attributes, clientId } = props;
		if (!hasCustomCssSupport(name)) {
			return <BlockListBlock {...props} />;
		}
		const { advancedBlockCss } = attributes;
		const element = useContext(BlockList.__unstableElementContext);

		let cssTag = advancedBlockCss ? advancedBlockCss : '';
		if (cssTag) {
			cssTag = advancedBlockCss.replace(
				/selector/g,
				`#block-${clientId}`
			);
		}

		if (cssTag !== '') {
			cssTag = transformStyles(
				[{ css: cssTag }],
				'.editor-styles-wrapper'
			);
		}

		return (
			<>
				{element &&
					!!cssTag &&
					createPortal(<style>{cssTag}</style>, element)}
				<BlockListBlock {...props} />
			</>
		);
	};
}, 'abcBlockListBlock');

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
