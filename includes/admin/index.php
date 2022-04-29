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
			function () {
				echo'<div id="advanced-block-css-admin"></div>';
			}
		);
	}
);

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
		wp_set_script_translations( 'abc-admin-script', 'advanced-block-css' );
		$abc_option = abc_get_option();
		wp_localize_script( 'abc-admin-script', 'advancedBlockCssOptions', $abc_option );

		wp_add_inline_script(
			'abc-admin-script',
			'const ABCSCRIPT = ' . json_encode(
				array(
					'isBlockTheme' => wp_is_block_theme(),
				)
			),
			'before'
		);

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
	$default_option_settings = array(
		'enqueue' => array(
			'type'    => 'string',
			'default' => 'just-before-block',
		),
		'editor'  => array(
			'type'    => 'string',
			'default' => 'PlainText',
		),
	);
	return $default_option_settings;
}

/**
 * Get Option.
 */
function abc_get_option() {
	$default_editor_settings = array();
	$default                 = abc_get_default_option();

	foreach ( $default as $key => $value ) {
		$default_editor_settings[ $key ] = $value['default'];
	}
	$options = get_option( 'advanced_block_css_options' );
	$options = array_merge( $default_editor_settings, $options );
	return $options;
}
