<?php
/**
 * Option Page
 *
 * @package advanced-block-css
 */

add_action(
	'admin_menu',
	function () {
		add_options_page(
			'Advanced Block CSS',
			'Advanced Block CSS Setting',
			'administrator',
			'advanced-block-css-admin',
			'advanced_block_css_settings_page'
		);
	}
);

/**
 * オプションページのコンテンツ
 */
function advanced_block_css_settings_page() {
	echo '<div id="advanced-block-css-admin"></div>';
}

/**
 * 設定項目の登録.
 */
add_action(
	'init',
	function () {
		$properties_editor_settings = array();
		$default_editor_settings    = array();
		$default_option_settings    = abc_get_default_option();

		foreach ( $default_option_settings as $key => $value ) {
			$properties_editor_settings[ $key ] = array(
				'type' => $value['type'],
			);

			if ( 'object' === $value['type'] ) {
				$default_editor_settings[ $key ]['properties'] = array();

				$default_editor_settings[ $key ] = array();

				foreach ( $value['items'] as $sub_key => $sub_value ) {
					$properties_editor_options[ $key ]['properties'][ $sub_key ] = array(
						'type' => $sub_value['type'],
					);
					$default_editor_settings[ $key ][ $sub_key ]                 = $sub_value['default'];
				}
			} else {
				$default_editor_settings[ $key ] = $value['default'];
			}
		}
		register_setting(
			'advanced_block_css_setting',
			'advanced_block_css_options',
			array(
				'type'         => 'object',
				'show_in_rest' => array(
					'schema' => array(
						'type'       => 'object',
						'properties' => $properties_editor_settings,
					),
				),
				'default'      => $default_editor_settings,
			)
		);
	},
	100 // block_listの取得のために遅らせる.
);

/**
 * Get all Block.
 */
function abc_get_all_block() {
	$block_list = WP_Block_Type_Registry::get_instance()->get_all_registered();
	// テスト用サンプルデータ.
	$block_list     = array(
		'core/archives'  => (object) array(
			'name'     => 'core/archives',
			'title'    => 'アーカイブ',
			'category' => 'widgets',
			'supports' => array(
				'customClassName' => false,
			),
		),
		'core/paragraph' => (object) array(
			'name'     => 'core/paragraph',
			'title'    => '段落',
			'category' => 'text',
		),
	);
	$abc_block_list = array();
	foreach ( $block_list as $key => $block ) {
		if ( ! empty( $block->supports['customClassName'] ) && null !== $block->supports['customClassName'] ) {
			$custom_class_name = false;
		} else {
			$custom_class_name = true;
		}
		$block_info             = array(
			'name'            => $block->name,
			'title'           => $block->title,
			'category'        => $block->category,
			'customClassName' => $custom_class_name,
		);
		$abc_block_list[ $key ] = $block_info;
	}
	return $abc_block_list;
}

/**
 * Enqueue admin assets for this example.
 *
 * @param string $hook The current admin page.
 */
add_action(
	'admin_enqueue_scripts',
	function ( $hook ) {
		if ( 'settings_page_advanced-block-css-admin' !== $hook ) {
			return;
		}

		// Automatically load dependencies and version.
		$asset_file = include ADVANCED_BLOCK_CSS_DIR_PATH . 'build/admin/index.asset.php';

		// Enqueue CSS dependencies.
		foreach ( $asset_file['dependencies'] as $style ) {
			wp_enqueue_style( $style );
		}

		// Load js.
		wp_register_script(
			'abc-admin-script',
			ADVANCED_BLOCK_CSS_DIR_URL . 'build/admin/index.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
		wp_enqueue_script( 'abc-admin-script' );
		$abc_option = abc_get_option();
		wp_localize_script( 'abc-admin-script', 'advancedBlockCssOptions', $abc_option );
		$abc_block_list = abc_get_all_block();
		wp_localize_script( 'abc-admin-script', 'abcBlocksList', $abc_block_list );

		// Load css.
		wp_register_style(
			'abc-admin-css',
			ADVANCED_BLOCK_CSS_DIR_URL . 'build/admin/style-index.css',
			null,
			$asset_file['version']
		);
		wp_enqueue_style( 'abc-admin-css' );
	}
);

/**
 * Get Default Option.
 */
function abc_get_default_option() {
	$block_list = abc_get_all_block();
	foreach ( $block_list as $block ) {
		if ( false === $block['customClassName'] ) {
			$default = false;
		} else {
			$default = true;
		}
		if ( ! preg_match( '/^core/', $block['name'] ) ) {
			$default = false;
		}
		$block_items                        = array(
			'type'    => 'boolean',
			'default' => $default,
		);
		$abc_block_object[ $block['name'] ] = $block_items;
	}

	$default_option_settings = array(
		'enqueue' => array(
			'type'    => 'string',
			'default' => 'head',
		),
		'editor'  => array(
			'type'    => 'string',
			'default' => 'CodeMirror',
		),
		// 'activationBlock' => array(
		// 'type'  => 'object',
		// 'items' => $abc_block_object,
		// ),
	);
	return $default_option_settings;
}
add_action( 'init', 'abc_get_default_option', 999 );

/**
 * Get Option.
 */
function abc_get_option() {
	$default = abc_get_default_option();
	$options = get_option( 'advanced_block_css_options' );
	// abcBlocksListは後から追加されることがあるので、option値に保存されてない時にデフォルトとマージする.
	$options = wp_parse_args( $options, $default );
	return $options;
}
