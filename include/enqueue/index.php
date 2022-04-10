<?php
/**
 * Enqueue Assets
 *
 * @package advanced-block-css
 */

add_action(
	'enqueue_block_editor_assets',
	function () {
		wp_enqueue_code_editor( array( 'type' => 'text/css' ) );

		$asset_file = include ADVANCED_BLOCK_CSS_DIR_PATH . 'build/advanced-block-css/index.asset.php';
		wp_enqueue_script(
			'advanced-block-css-script',
			ADVANCED_BLOCK_CSS_DIR_URL . 'build/advanced-block-css/index.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_enqueue_style(
			'advanced-block-css-style',
			ADVANCED_BLOCK_CSS_DIR_URL . 'build/advanced-block-css/style-index.css'
		);
	}
);

add_filter(
	'render_block',
	function ( $block_content, $block ) {
		if ( isset( $block['attrs']['acsStyles'] ) && '' !== $block['attrs']['acsStyles'] ) {
			$css        = $block['attrs']['acsStyles'];
			$abc_option = get_option( 'advanced_block_css_options' );
			// headで読み込む場合.
			if ( 'head' === $abc_option['enqueue'] ) {
				// 使用しているcssを登録する.
				abc_register_style( $css );
				return $block_content;
			} else {
				return '<style>' . $css . '</style>' . $block_content;
			}
		}
		return $block_content;
	},
	10,
	2
);

/**
 * Cssをminifyする
 *
 * @param string $css css.
 */
function abc_minify_css( $css ) {
	$css_replaces = array();
	// @charsetの除去.
	$css_replaces['/@charset \"(utf|UTF)-8\";/'] = '';
	// コメントの除去.
	$css_replaces['/(\/\*!.*?\*\/|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\')|\/\*.*?\*\//s'] = '${1}';
	// 1つ以上連続する空白文字列の置換.
	$css_replaces['/(\/\*!.*?\*\/|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\')\s*|\s+/s'] = '${1} ';
	// 一部の演算記号を除く記号前後の半角スペースの除去.
	$css_replaces['/(\/\*!.*?\*\/|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\')| ([!#$%&,.:;<=>?@^{|}~]) |([!#$&(,.:;<=>?@\[^{|}~]|\A) | ([$%&),;<=>?@\]^{|}~]|\z)/s'] = '${1}${2}${3}${4}';
	// 演算記号前後の半角スペースの除去.
	$css_replaces['/(\/\*!.*?\*\/|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\'|\([^;{}]+\))| ([+\-\/]) |([+\-\/]) | ([+\/])/s'] = '${1}${2}${3}${4}';
	// 置換.
	$css = preg_replace( array_keys( $css_replaces ), array_values( $css_replaces ), $css );
	return wp_strip_all_tags( $css );
}

$list = '';
/**
 * Bundle Css
 *
 * @param string $css css.
 */
function abc_register_style( $css ) {
	global $list;
	$list .= $css;
}

add_action(
	'wp_enqueue_scripts',
	function() {
		global $list;
		// $list = 'colo:red;';
		wp_register_style( 'acs-style', false );
		wp_enqueue_style( 'acs-style' );
		wp_add_inline_style( 'acs-style', abc_minify_css( $list ) );
	}
);
