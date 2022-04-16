/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AdminContext } from '../index';

export default function EnqueueSection() {
	const { abcOption, setAbcOption } = useContext( AdminContext );

	const updateOptionValue = ( newValue ) => {
		setAbcOption( newValue );
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
		</>
	);
}
