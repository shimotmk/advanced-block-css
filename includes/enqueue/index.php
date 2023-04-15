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

/**
 * カスタムCSSをサポートしているかどうか
 *
 * @param string $block_name block_name.
 * @return string
 */
function abc_has_custom_css_support( $block_name ) {
	if ( empty( $block_name ) ) {
		return false;
	}

	$block_type = WP_Block_Type_Registry::get_instance()->get_registered( $block_name );
	if ( ! block_has_support( $block_type, array( 'customClassName' ), true ) ) {
		return false;
	}

	return true;
};

/**
 * 各ブロックにadvancedBlockCssのattributesを追加する
 *
 * @param string $settings settings.
 * @param array  $metadata metadata.
 * @return string
 */
add_filter(
	'block_type_metadata_settings',
	function ( $settings, $metadata ) {
		if ( ! abc_has_custom_css_support( $metadata['name'] ) ) {
			return $settings;
		}

		$attributes = array();
		if ( ! empty( $settings['attributes'] ) ) {
			$attributes = $settings['attributes'];
		}
		$add_attributes = array(
			'advancedBlockCss'        => array(
				'type'    => 'string',
				'default' => '',
			),
			'advancedBlockAdminCss'   => array(
				'type'    => 'string',
				'default' => '',
			),
			'advancedBlockJavaScript' => array(
				'type'    => 'string',
				'default' => '',
			),
		);

		$settings['attributes'] = array_merge(
			$attributes,
			$add_attributes
		);
		return $settings;
	},
	10,
	2
);

/**
 * Render Custom Css Extension css
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
add_filter(
	'render_block',
	function ( $block_content, $block ) {
		if ( ! abc_has_custom_css_support( $block['blockName'] ) ) {
			return $block_content;
		}

		if ( empty( $block['attrs']['advancedBlockCss'] ) ) {
			return $block_content;
		}

		$css = $block['attrs']['advancedBlockCss'];
		if ( strpos( $css, 'selector' ) !== false ) {
			$unique_class  = wp_unique_id( 'custom_block_id_' );
			$css           = preg_replace( '/selector/', '.' . $unique_class, $css );
			$block_content = preg_replace( '/(class="[^"]*)custom_block_id([^"]*")/', '$1' . $unique_class . '$2', $block_content, 1 );
		}
		$css = abc_minify_css( $css );
		wp_enqueue_block_support_styles( $css );
		return $block_content;
	},
	10,
	2
);
