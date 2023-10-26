<?php
/**
 * Delete Option
 *
 * @package block-code-snippets
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

delete_option( 'block_code_snippets_options' );
