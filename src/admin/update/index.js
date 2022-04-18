/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useContext, createContext } from '@wordpress/element';
import { Button, Spinner } from '@wordpress/components';
import api from '@wordpress/api';

/**
 * Internal dependencies
 */
import { AdminContext } from '../index';

export const OptionsContext = createContext();

export default function UpdateButton() {
	const { isLoading, abcOption, setIsLoading } = useContext( AdminContext );
	const [ isSaveSuccess, setIsSaveSuccess ] = useState( '' );

	// console.log( abcOption );

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
			<Button
				className="update-button"
				isPrimary
				onClick={ onClickUpdate }
				isBusy={ isLoading }
			>
				{ __( 'Save setting', 'advanced-block-css' ) }
			</Button>
			{ isLoading && <Spinner /> }
			{ isSaveSuccess === false &&
				__( 'Failed to save.', 'advanced-block-css' ) }
		</>
	);
}
