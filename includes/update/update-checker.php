<?php
/**
 * Update File
 *
 * @package advanced-block-css
 */

add_action(
	'after_setup_theme',
	function() {
		add_filter( 'https_ssl_verify', '__return_false' );
		/**
		 * Require
		 */
		if ( ! class_exists( '\Puc_v4_Factory' ) ) {
			require ADVANCED_BLOCK_CSS_DIR_PATH . 'includes/update/plugin-update-checker/plugin-update-checker.php';
		}

		if ( class_exists( '\Puc_v4_Factory' ) ) {
			$abc_update_checker = Puc_v4_Factory::buildUpdateChecker(
				'https://github.com/shimotmk/advanced-block-css/',
				ADVANCED_BLOCK_CSS_DIR_PATH . 'advanced-block-css.php',
				'advanced-block-css'
			);

			$abc_update_checker->getVcsApi()->enableReleaseAssets();
		}
	}
);
