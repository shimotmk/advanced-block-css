<?php
/**
 * Enqueue Assets
 *
 * @package block-code-snippets
 */

add_action(
	'enqueue_block_editor_assets',
	function () {

		wp_enqueue_code_editor( array( 'type' => 'text/css' ) );

		wp_add_inline_script(
			'wp-codemirror',
			'window.CodeMirror = wp.CodeMirror;'
		);

		$asset_file = include BLOCK_CODE_SNIPPETS_DIR_PATH . 'build/block-code-snippets/index.asset.php';
		wp_enqueue_script(
			'block-code-snippets-script',
			BLOCK_CODE_SNIPPETS_DIR_URL . 'build/block-code-snippets/index.js',
			array_merge( $asset_file['dependencies'], array( 'code-editor' ) ),
			$asset_file['version'],
			true
		);

		$abc_option = get_option( 'block_code_snippets_options' );
		wp_localize_script( 'block-code-snippets-script', 'advancedBlockCssOptions', $abc_option );

		wp_enqueue_style(
			'block-code-snippets-style',
			BLOCK_CODE_SNIPPETS_DIR_URL . 'build/block-code-snippets/style-index.css',
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
 * Minify JS
 *
 * @see https://shimotsuki.wwwxyz.jp/20200930-650
 *
 * @param string $js js.
 */
function abc_minify_js( $js ) {
	$js_replaces = array();
		// (1) JSの正規表現前後の空白文字列の除去
	$js_replaces['/([(+=])\s*(\/(?:(?!(?<!\\\)\/).)+\/[dgimsuy]*)\s*([)+,.;])/s'] = '${1}${2}${3}';
	// (2) コメントの除去
	$js_replaces['/(\/\*[!@].*?\*\/|[(+=]\/(?:(?!(?<!\\\)\/).)+\/[dgimsuy]*[)+,.;]|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\'|\`(?:(?!(?<!\\\)\`).)*\`)|\/\*.*?\*\/|\/\/[^\r\n]+[\r\n]/s'] = '${1}';
	// (3) 1つ以上連続する空白文字列の置換
	$js_replaces['/(\/\*[!@].*?\*\/|[(+=]\/(?:(?!(?<!\\\)\/).)+\/[dgimsuy]*[)+,.;]|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\'|\`(?:(?!(?<!\\\)\`).)*\`)\s*|\s+/s'] = '${1} ';
	// (4) 記号前後の半角スペースの除去
	$js_replaces['/(\/\*[!@].*?\*\/|[(+=]\/(?:(?!(?<!\\\)\/).)+\/[dgimsuy]*[)+,.;]|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\'|\`(?:(?!(?<!\\\)\`).)*\`) | ([!#$%&)*+,\-.\/:;<=>?@\]^_|}~]) | ([!#$%&)*,.\/:;<=>?@\]^_|}~]|\+(?!\+)|-(?!-)|\z)|([!#$%&()*+,\-.\/:;<=>?@\[\]^_{|}~]|\A) /s'] = '${1}${2}${3}${4}';
	$js = preg_replace( array_keys( $js_replaces ), array_values( $js_replaces ), $js );
	return $js;
}

/**
 * Enqueue block_support_script
 *
 * @param string $script script.
 * @param int    $priority To set the priority for the add_action.
 */
function abc_enqueue_block_support_scripts( $script, $priority = 10 ) {
	$action_hook_name = 'wp_footer';
	add_action(
		$action_hook_name,
		static function () use ( $script ) {
			echo "<script>$script</script>\n";
		},
		$priority
	);
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
 * Add attributes
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

		$unique_class = '';
		$css          = ! empty( $block['attrs']['advancedBlockCss'] ) ? $block['attrs']['advancedBlockCss'] : null;
		$javascript   = ! empty( $block['attrs']['advancedBlockJavaScript'] ) ? $block['attrs']['advancedBlockJavaScript'] : null;

		if ( ! empty( $css ) || ! empty( $javascript ) ) {
			$unique_class = wp_unique_id( 'bcs_id_' );
		}

		if ( ! empty( $css ) ) {
			if ( strpos( $css, 'selector' ) !== false ) {
				$css = preg_replace( '/selector/', '.' . $unique_class, $css );
			}
			$css = abc_minify_css( $css );
			wp_enqueue_block_support_styles( $css );
		}

		if ( ! empty( $javascript ) ) {
			if ( strpos( $javascript, 'selector' ) !== false ) {
				$javascript = preg_replace( '/selector/', '.' . $unique_class, $javascript );
			}
			$javascript = abc_minify_js( $javascript );
			abc_enqueue_block_support_scripts( $javascript );
		}

		if ( ! empty( $css ) || ! empty( $javascript ) ) {
			$processor = new WP_HTML_Tag_Processor( $block_content );
			$processor->next_tag();
			$processor->add_class( $unique_class );
			return $processor->get_updated_html();
		}

		return $block_content;
	},
	10,
	2
);
