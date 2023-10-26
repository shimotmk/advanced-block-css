<?php
/**
 * Update File
 *
 * @package block-code-snippets
 */

add_action(
	'after_setup_theme',
	function() {
		add_filter( 'https_ssl_verify', '__return_false' );
		/**
		 * Require
		 */
		if ( ! class_exists( '\Puc_v4_Factory' ) ) {
			require BLOCK_CODE_SNIPPETS_DIR_PATH . 'includes/update/plugin-update-checker/plugin-update-checker.php';
		}

		if ( class_exists( '\Puc_v4_Factory' ) ) {
			$abc_update_checker = Puc_v4_Factory::buildUpdateChecker(
				'https://github.com/shimotmk/block-code-snippets/',
				BLOCK_CODE_SNIPPETS_DIR_PATH . 'block-code-snippets.php',
				'block-code-snippets'
			);

			$abc_update_checker->setBranch( 'main' );

			$abc_update_checker->getVcsApi()->enableReleaseAssets();
		}
	}
);
