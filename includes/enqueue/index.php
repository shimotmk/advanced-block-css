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

		wp_add_inline_script(
			'wp-codemirror',
			'window.CodeMirror = wp.CodeMirror;'
		);

		$asset_file = include ADVANCED_BLOCK_CSS_DIR_PATH . 'build/advanced-block-css/index.asset.php';
		wp_enqueue_script(
			'advanced-block-css-script',
			ADVANCED_BLOCK_CSS_DIR_URL . 'build/advanced-block-css/index.js',
			array_merge( $asset_file['dependencies'], array( 'code-editor' ) ),
			$asset_file['version'],
			true
		);

		$abc_option = get_option( 'advanced_block_css_options' );
		wp_localize_script( 'advanced-block-css-script', 'advancedBlockCssOptions', $abc_option );

		wp_enqueue_style(
			'advanced-block-css-style',
			ADVANCED_BLOCK_CSS_DIR_URL . 'build/advanced-block-css/style-index.css',
			array( 'code-editor' ),
			$asset_file['version']
		);
	}
);

/**
 * Minify Css
 *
 * @see https://shimotsuki.wwwxyz.jp/20200930-650
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

$advanced_block_css_list = '';
add_action(
	'wp_enqueue_scripts',
	function() {
		add_filter(
			'render_block',
			function ( $block_content, $block ) {
				if ( isset( $block['attrs']['advancedBlockCss'] ) && '' !== $block['attrs']['advancedBlockCss'] ) {
					$css        = $block['attrs']['advancedBlockCss'];
					$abc_option = abc_get_option();
					// インラインで出力するときのcss.
					global $advanced_block_css_list;

					// just-before-blockで読み込む場合.
					if ( empty( $abc_option['enqueue'] ) || 'just-before-block' === $abc_option['enqueue'] ) {
						// ブロック直前にインラインで読み込む.
						return '<style>' . $css . '</style>' . $block_content;
					} else {
						// headにインラインで出力するとき
						// 使用しているcssをまとめる.
						$advanced_block_css_list .= $css;
						wp_register_style( 'advanced-block-css-style', false );
						wp_enqueue_style( 'advanced-block-css-style' );
						wp_add_inline_style( 'advanced-block-css-style', abc_minify_css( $advanced_block_css_list ) );
						return $block_content;
					}
				}
				return $block_content;
			},
			10,
			2
		);
	}
);

/**
 * ブロックテーマのときはheadで出力がなぜか出来ないのでブロック直前に出力する
 */
add_filter(
	'render_block',
	function ( $block_content, $block ) {
		if ( wp_is_block_theme() ) {
			if ( isset( $block['attrs']['advancedBlockCss'] ) && '' !== $block['attrs']['advancedBlockCss'] ) {
				$css = $block['attrs']['advancedBlockCss'];
				return '<style>' . $css . '</style>' . $block_content;
			}
		}
		return $block_content;
	},
	10,
	2
);
