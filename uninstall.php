<?php
/**
 * Delete Option
 *
 * @package advanced-block-css
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

delete_option( 'advanced_block_css_options' );
