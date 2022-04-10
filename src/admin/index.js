/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import EnqueueSection from './enqueue';
import ExportSection from './export';
import './style.scss';
// https://developer.wordpress.org/block-editor/how-to-guides/data-basics/3-building-an-edit-form/

function AbcAdmin() {
	return (
		<>
			<div className="privacy-settings-header">
				<div className="privacy-settings-title-section">
					<h1>
						{ __(
							'Advanced Block CSS Settings',
							'advanced-block-css'
						) }
					</h1>
				</div>
			</div>
			<div className="privacy-settings-body">
				<section className="abc-admin-section">
					<EnqueueSection />
				</section>
				<section className="abc-admin-section">
					<ExportSection />
				</section>
			</div>
		</>
	);
}

window.addEventListener(
	'load',
	function () {
		render(
			<AbcAdmin />,
			document.querySelector( '#advanced-block-css-admin' )
		);
	},
	false
);
