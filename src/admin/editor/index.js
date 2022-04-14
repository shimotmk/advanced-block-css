/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { RadioControl, Button, Spinner } from '@wordpress/components';
import { PlainText } from '@wordpress/block-editor';
import api from '@wordpress/api';

/**
 * External dependencies
 */
import CodeMirror from '@uiw/react-codemirror';
import MonacoEditor from '@monaco-editor/react';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/view';

/**
 * Internal dependencies
 */
/*globals advancedBlockCssOptions */
import './style.scss';

export default function EditorSection() {
	const [ abcOption, setAbcOption ] = useState( {
		editor: advancedBlockCssOptions.editor,
	} );

	const updateOptionValue = ( newValue ) => {
		setAbcOption( newValue );
	};

	const [ isLoading, setIsLoading ] = useState( false );
	const [ isSaveSuccess, setIsSaveSuccess ] = useState( '' );

	// オプション値を保存
	const onClickUpdate = () => {
		setIsLoading( true );
		api.loadPromise.then( () => {
			const model = new api.models.Settings( {
				advanced_block_css_options: abcOption,
			} );
			const save = model.save();

			save.success( () => {
				setTimeout( () => {
					setIsLoading( false );
					setIsSaveSuccess( true );
				}, 600 );
			} );

			save.error( () => {
				setTimeout( () => {
					setIsLoading( false );
					setIsSaveSuccess( false );
				}, 600 );
			} );
		} );
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
							label: __( 'MonacoEditor', 'advanced-block-css' ),
							value: 'MonacoEditor',
						},
						{
							label: __( 'PlainText', 'advanced-block-css' ),
							value: 'PlainText',
						},
					] }
					onChange={ ( newValue ) => {
						updateOptionValue( { ...abcOption, editor: newValue } );
					} }
				/>
				<div className="abc-admin-editor-preview-area">
					{ abcOption.editor === 'CodeMirror' && (
						<CodeMirror
							className="abc-editor"
							height="200px"
							extensions={ [ css(), EditorView.lineWrapping ] }
							value={ abcEditorPreviewValue }
						/>
					) }
					{ abcOption.editor === 'MonacoEditor' && (
						<MonacoEditor
							className="abc-editor"
							height="200px"
							defaultLanguage="css"
							options={ { wordWrap: true } }
							value={ abcEditorPreviewValue }
						/>
					) }
					{ abcOption.editor === 'PlainText' && (
						<PlainText
							className="abc-plane-text"
							value={ abcEditorPreviewValue }
						/>
					) }
				</div>
			</div>
			<Button isPrimary onClick={ onClickUpdate } isBusy={ isLoading }>
				{ __( 'Save setting', 'advanced-block-css' ) }
			</Button>
			{ isLoading && <Spinner /> }
			{ isSaveSuccess === false &&
				__( 'Failed to save.', 'advanced-block-css' ) }
		</>
	);
}
