<?php
/**
 * WP_Plugins_List_Table
 *
 * @package block-code-snippets
 */

namespace BlockCodeSnippets;

add_filter(
	'plugin_action_links',
	function ( $links, $file ) {
		if ( plugin_basename( BLOCK_CODE_SNIPPETS_DIR_PATH . '/block-code-snippets.php' ) === $file ) {
			$settings_link = '<a href="' . esc_url( admin_url( '/options-general.php?page=block-code-snippets-admin' ) ) . '">' . __( 'Setting', 'block-code-snippets' ) . '</a>';
			array_unshift( $links, $settings_link );
		}
		return $links;
	},
	10,
	2
);
