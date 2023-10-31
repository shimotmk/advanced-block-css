<?php
/**
 * Plugin Name:       Block Code Snippets
 * Plugin URI:
 * Description:       Add a simple CSS and JavaScript editor to your Gutenberg block.
 * Requires at least: 5.3
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Stable tag:        0.1.0
 * Author:            Tomoki Shimomura
 * Author URI:
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-code-snippets
 *
 * @package           block-code-snippets
 */

namespace BlockCodeSnippets;

defined( 'ABSPATH' ) || exit;
define( 'BLOCK_CODE_SNIPPETS_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'BLOCK_CODE_SNIPPETS_DIR_URL', plugin_dir_url( __FILE__ ) );

require_once BLOCK_CODE_SNIPPETS_DIR_PATH . 'includes/enqueue/index.php';
