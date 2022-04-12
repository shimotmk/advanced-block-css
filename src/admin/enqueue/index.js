/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { RadioControl, Button, Spinner } from '@wordpress/components';
import api from '@wordpress/api';

/**
 * Internal dependencies
 */
/*globals advancedBlockCssOptions */

export default function EnqueueSection() {
	const [ abcOption, setAbcOption ] = useState( {
		enqueue: advancedBlockCssOptions.enqueue,
	} );

	const updateOptionValue = ( newValue ) => {
		setAbcOption( newValue );
	};

	const [ isLoading, setIsLoading ] = useState( false );
	const [ isSaveSuccess, setIsSaveSuccess ] = useState( '' );

	// オプション値を保存
	const onClickUpdate = () => {
		setIsLoading( true );
		api.loadPromise.then( (/*response*/) => {
			// console.log( response );
			const model = new api.models.Settings( {
				advanced_block_css_options: abcOption,
			} );
			const save = model.save();

			save.success( (/* response, status */) => {
				// console.log( response );
				// console.log( status );
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

	return (
		<>
			<h2>{ __( 'Enqueue Settings', 'advanced-block-css' ) }</h2>
			<p>
				{ __(
					'You can export the styles you have added with Advanced Block CSS for each page.',
					'advanced-block-css'
				) }
			</p>
			<RadioControl
				className="abc-admin-radio"
				label={ __( 'Enqueue Setting' ) }
				selected={ abcOption.enqueue }
				options={ [
					{
						label: __( 'Head (Default)', 'advanced-block-css' ),
						value: 'head',
					},
					{
						label: __(
							'Load inline just before block',
							'advanced-block-css'
						),
						value: 'just-before-block',
					},
				] }
				onChange={ ( newValue ) => {
					updateOptionValue( { ...abcOption, enqueue: newValue } );
				} }
			/>
			<Button isPrimary onClick={ onClickUpdate } isBusy={ isLoading }>
				{ __( 'Save setting', 'advanced-block-css' ) }
			</Button>
			{ isLoading && <Spinner /> }
			{ isSaveSuccess === false &&
				__( 'Failed to save.', 'advanced-block-css' ) }
		</>
	);
}
