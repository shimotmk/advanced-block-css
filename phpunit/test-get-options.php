<?php
/**
 * Test Get Option
 *
 * @package advanced-block-css
 */

/**
 * Get Options Test case.
 */
class GetOptionsTest extends WP_UnitTestCase {

	/**
	 * Test Get Option
	 */
	public function test_abc_get_option() {
		$test_data = array(
			array(
				'option'  => null,
				'correct' => array(
					'enqueue' => 'just-before-block',
					'editor'  => 'CodeMirror',
				),
			),
			array(
				'option'  => array(
					'enqueue' => 'just-before-block',
				),
				'correct' => array(
					'enqueue' => 'just-before-block',
					'editor'  => 'CodeMirror',
				),
			),
			array(
				'option'  => array(
					'editor' => 'MonacoEditor',
				),
				'correct' => array(
					'enqueue' => 'just-before-block',
					'editor'  => 'MonacoEditor',
				),
			),
			array(
				'option'  => array(
					'enqueue' => 'head',
					'editor'  => 'MonacoEditor',
				),
				'correct' => array(
					'enqueue' => 'head',
					'editor'  => 'MonacoEditor',
				),
			),
			array(
				'option'  => array(
					'enqueue' => 'head',
					'editor'  => 'MonacoEditor',
				),
				'correct' => array(
					'enqueue' => 'head',
					'editor'  => 'MonacoEditor',
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'abc_get_option()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			if ( empty( $test_value['option'] ) ) {
				delete_option( 'block_code_snippets_options' );
			} else {
				update_option( 'block_code_snippets_options', $test_value['option'] );
			}

			$return  = abc_get_option();
			$correct = $test_value['correct'];

			print 'return[\'enqueue\']  :' . $return['enqueue'] . PHP_EOL;
			print 'correct[\'enqueue\'] :' . $correct['enqueue'] . PHP_EOL;
			print 'return[\'editor\']  :' . $return['editor'] . PHP_EOL;
			print 'correct[\'editor\'] :' . $correct['editor'] . PHP_EOL;
			$this->assertSame( $correct, $return );

		}
	}
}
