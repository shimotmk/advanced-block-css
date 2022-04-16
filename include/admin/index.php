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
		$default_option_settings    = array(
			'enqueue' => array(
				'type'    => 'string',
				'default' => 'head',
			),
			'editor'  => array(
				'type'    => 'string',
				'default' => 'CodeMirror',
			),
			// 'activationBlock' => array(
			// 'type'    => 'array'
			// ),
		);

		foreach ( $default_option_settings as $key => $value ) {
			$properties_editor_settings[ $key ] = array(
				'type' => $value['type'],
			);
			$default_editor_settings[ $key ]    = $value['default'];
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
	}
);

/**
 * Get all Block.
 */
function abc_get_all_block() {
	$block_list     = WP_Block_Type_Registry::get_instance()->get_all_registered();
	$abc_block_list = array();
	foreach ( $block_list as $key => $block ) {
		$block_info             = array(
			'name'     => $block->name,
			'title'    => $block->title,
			'category' => $block->category,
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
		$abc_option = get_option( 'advanced_block_css_options' );
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

