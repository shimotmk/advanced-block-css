<?php
/**
 * Update File
 *
 * @package advanced-block-css
 */

/**
 * Require
 */
require ADVANCED_BLOCK_CSS_DIR_PATH . 'plugin-update-checker/plugin-update-checker.php';

$abc_update_checker = Puc_v4_Factory::buildUpdateChecker(
	'https://github.com/shimotmk/advanced-block-css/',
	__FILE__,
	'advanced-block-css'
);

// Set the branch that contains the stable release.
$abc_update_checker->setBranch( 'main' );
