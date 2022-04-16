<?php
/**
 * WP_Plugins_List_Table
 *
 * @package advanced-block-css
 */

add_filter(
	'plugin_action_links',
	function ( $links, $file ) {
		if ( plugin_basename( ADVANCED_BLOCK_CSS_DIR_PATH . '/advanced-block-css.php' ) === $file ) {
			$settings_link = '<a href="' . esc_url( admin_url( '/options-general.php?page=advanced-block-css-admin' ) ) . '">' . __( 'Setting', 'advanced-block-css' ) . '</a>';
			array_unshift( $links, $settings_link );
		}
		return $links;
	},
	10,
	2
);
