/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

// ブロックごとにアクティベーション機能を付けたいがまだ出来ていない
export default function ActivationSection() {
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
				{ /* <ToggleControl
					label={ abcBlocksList[ key ].title }
					checked={
						abcOption.activationBlock[ abcBlocksList[ key ].name ]
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
				/> */ }
			</div>
		</>
	);
}
