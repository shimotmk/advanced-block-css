/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';
import { PlainText } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import MonacoEditor from '@monaco-editor/react';

/**
 * Internal dependencies
 */
import './style.scss';
import { AdminContext } from '../index';

export default function EditorSection() {
	const { abcOption, setAbcOption } = useContext( AdminContext );

	// console.log( abcOption );

	const updateOptionValue = ( newValue ) => {
		setAbcOption( newValue );
	};

	const abcEditorPreviewValue = `html {
	background: #f0f0f1;
	margin: 0 20px;
}

body {
	background: #fff;
	border: 1px solid #c3c4c7;
	color: #3c434a;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	margin: 140px auto 25px;
	padding: 20px 20px 10px;
	max-width: 700px;
}`;

	return (
		<>
			<h2>{ __( 'Editor Settings', 'advanced-block-css' ) }</h2>
			<p>
				{ __(
					'You can export the styles you have added with Advanced Block CSS for each page.',
					'advanced-block-css'
				) }
			</p>
			<div className="abc-admin-editor-content">
				<RadioControl
					className="abc-admin-radio"
					label={ __( 'Editor Setting' ) }
					selected={ abcOption.editor }
					options={ [
						{
							label: __(
								'CodeMirror (Default)',
								'advanced-block-css'
							),
							value: 'CodeMirror',
						},
						{
							label: __( 'PlainText', 'advanced-block-css' ),
							value: 'PlainText',
						},
						{
							label: __( 'MonacoEditor', 'advanced-block-css' ),
							value: 'MonacoEditor',
						},
					] }
					onChange={ ( newValue ) => {
						updateOptionValue( { ...abcOption, editor: newValue } );
					} }
				/>
				<div className="abc-admin-editor-preview-area">
					{ abcOption.editor === 'PlainText' && (
						<PlainText
							className="abc-plane-text"
							value={ abcEditorPreviewValue }
						/>
					) }
					{ abcOption.editor === 'MonacoEditor' && (
						<MonacoEditor
							className="abc-editor"
							height="200px"
							defaultLanguage="css"
							options={ {
								wordWrap: true,
								quickSuggestions: false,
							} }
							value={ abcEditorPreviewValue }
						/>
					) }
				</div>
			</div>
		</>
	);
}
