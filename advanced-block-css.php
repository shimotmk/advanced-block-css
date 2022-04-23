<?php
/**
 * Plugin Name:       Advanced Block CSS
 * Plugin URI:        https://github.com/shimotmk/advanced-block-css
 * Description:       Add a simple CSS editor to your Gutenberg block.
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Tomoki Shimomura
 * Author URI:
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       advanced-block-css
 *
 * @package           advanced-block-css
 */

defined( 'ABSPATH' ) || exit;
define( 'ADVANCED_BLOCK_CSS_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'ADVANCED_BLOCK_CSS_DIR_URL', plugin_dir_url( __FILE__ ) );

require_once ADVANCED_BLOCK_CSS_DIR_PATH . 'includes/admin.php';
require_once ADVANCED_BLOCK_CSS_DIR_PATH . 'includes/enqueue/index.php';
