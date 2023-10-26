/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useContext, createContext } from '@wordpress/element';
import { Button, KeyboardShortcuts } from '@wordpress/components';
import api from '@wordpress/api';

/**
 * Internal dependencies
 */
import { AdminContext } from '../index';

export const OptionsContext = createContext();

export default function UpdateButton() {
	const { isLoading, abcOption, setIsLoading } = useContext( AdminContext );
	const [ isSaveSuccess, setIsSaveSuccess ] = useState( '' );

	// オプション値を保存
	const onClickUpdate = ( event ) => {
		event.preventDefault();
		setIsLoading( true );
		api.loadPromise.then( (/*response*/) => {
			// console.log( response );
			const model = new api.models.Settings( {
				block_code_snippets_options: abcOption,
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
			<div className="update-button-area">
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						'mod+s': onClickUpdate,
					} }
				/>
				<Button
					className="update-button"
					isPrimary
					onClick={ onClickUpdate }
					isBusy={ isLoading }
				>
					{ __( 'Save setting', 'block-code-snippets' ) }
				</Button>
				{ isSaveSuccess === false && (
					<p>{ __( 'Failed to save.', 'block-code-snippets' ) }</p>
				) }
			</div>
		</>
	);
}
