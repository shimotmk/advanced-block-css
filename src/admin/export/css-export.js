/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { download } from '@wordpress/icons';

export default function CSSExport( { page } ) {
	// https://github.com/WordPress/gutenberg/pull/22922#discussion_r439556871
	async function handleExport() {
		function downloadBlob( data, filename, mimeType ) {
			// eslint-disable-next-line no-undef
			const blob = new Blob( [ data ], { type: mimeType } );
			const url = URL.createObjectURL( blob );
			const anchor = document.createElement( 'a' );
			anchor.download = filename;
			anchor.href = url;
			document.body.appendChild( anchor );
			anchor.click();
			document.body.removeChild( anchor );
		}

		const renderedString = page.content.rendered;
		const tag = 'style';
		let cssContent = [
			...Object.assign( document.createElement( 'template' ), {
				innerHTML: renderedString,
			} ).content.querySelectorAll( tag ),
		].map( ( x ) => x.textContent );
		cssContent = cssContent.join( '' );

		downloadBlob( cssContent, 'style.css', 'text/css' );
	}
	return (
		<Button icon={ download } onClick={ handleExport }>
			{ __( 'Export', 'advanced-block-css' ) }
		</Button>
	);
}
