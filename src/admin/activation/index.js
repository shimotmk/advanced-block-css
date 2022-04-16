/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';
import { AdminContext } from '../index';

export default function ActivationSection() {
	const { abcOption, setAbcOption, abcBlocksList } = useContext(
		AdminContext
	);

	const updateOptionValue = ( newValue ) => {
		setAbcOption( newValue );
	};

	return (
		<>
			<h2>{ __( 'Activation Settings', 'advanced-block-css' ) }</h2>
			<p>
				{ __(
					'You can select the block that activates the Advanced Block CSS.',
					'advanced-block-css'
				) }
			</p>
			<div className="abc-admin-activation-block">
				{ /* https://wordpress.github.io/gutenberg/?path=/story/components-checkboxcontrol--indeterminate */ }
				{ Object.keys( abcBlocksList ).map( ( key, index ) => (
					<>
						<div className="abc-admin-activation-block-list">
							<div className="abc-admin-activation-block-category">
								{ abcBlocksList[ key ].category }
							</div>
							<div key={ index }>
								<ToggleControl
									label={ abcBlocksList[ key ].title }
									checked={
										abcOption.activationBlock[
											abcBlocksList[ key ].name
										]
									}
									onChange={ ( newValue ) => {
										const name = abcBlocksList[ key ].name;
										updateOptionValue( {
											...abcOption,
											activationBlock: {
												...abcOption.activationBlock,
												[ name ]: newValue,
											},
										} );
									} }
								/>
							</div>
						</div>
					</>
				) ) }
			</div>
		</>
	);
}
