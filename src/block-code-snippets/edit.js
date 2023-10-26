/**
 * WordPress dependencies.
 */
import { useEffect, useRef, memo } from '@wordpress/element';

/**
 * ABCCodeMirror
 */

const ABCCodeMirror = ( props ) => {
	const { attributes, setAttributes } = props;
	const { advancedBlockCss } = attributes;

	useEffect( () => {
		if ( advancedBlockCss ) {
			customCSSRef.current = advancedBlockCss;
		} else {
			customCSSRef.current = '';
		}

		// https://codemirror.net/doc/manual.html
		// https://github.com/WordPress/wordpress-develop/blob/81eb65fd9eb1a42efc657225d2ba1bce82406278/src/wp-includes/general-template.php#L3854-L3863
		editorRef.current = wp.CodeMirror(
			document.getElementById( 'abc-codemirror-editor' ),
			{
				value: customCSSRef.current,
				autoCloseBrackets: true,
				continueComments: true,
				lineNumbers: true,
				lineWrapping: true,
				matchBrackets: true,
				styleActiveLine: true,
			}
		);

		editorRef.current.on( 'change', () => {
			setAttributes( { advancedBlockCss: editorRef.current.getValue() } );
		} );
	}, [] );

	const editorRef = useRef( null );
	const customCSSRef = useRef( null );

	return (
		<>
			<div id="abc-codemirror-editor" className="abc-editor"></div>
		</>
	);
};
export default memo( ABCCodeMirror );
// https://reactjs.org/docs/react-api.html#reactmemo
