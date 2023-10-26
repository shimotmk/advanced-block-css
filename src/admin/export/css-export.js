/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { download } from '@wordpress/icons';

/**
 * Internal dependencies
 */
/*globals ABCSCRIPT */

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

		let cssContent;
		// ブロックテーマのとき
		if ( ABCSCRIPT.isBlockTheme ) {
			const renderedString = page.content.rendered;
			const tag = 'style';
			cssContent = [
				...Object.assign( document.createElement( 'template' ), {
					innerHTML: renderedString,
				} ).content.querySelectorAll( tag ),
			].map( ( x ) => x.textContent );
			cssContent = cssContent.join( '' );
		} else {
			const string = page.content.raw;
			const regex = /"advancedBlockCss":"(.+)"/g;
			let arr = string.match( regex, '' );
			arr = arr.map( ( item ) =>
				item.replace( `"advancedBlockCss":"`, '' ).slice( 0, -1 )
			);
			// 改行コードを削除
			arr = arr.map( ( item ) => item.replace( /\\n/g, '' ) );
			cssContent = arr.join( '' );
		}

		downloadBlob( cssContent, 'style.css', 'text/css' );
	}
	return (
		<Button icon={ download } onClick={ handleExport }>
			{ __( 'Export', 'block-code-snippets' ) }
		</Button>
	);
}
