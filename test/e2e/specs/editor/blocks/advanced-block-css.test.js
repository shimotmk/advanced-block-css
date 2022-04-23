import {
	createNewPost,
	openDocumentSettingsSidebar,
	openListView,
	clickButton,
	insertBlock,
} from '@wordpress/e2e-test-utils';

describe('E2E Test', () => {
  beforeAll( async () => {
		await createNewPost();
	} );

	it( 'ABC E2E Test', async () => {

		// テストするブロックリスト
		const testBlockLists = [
			// ['配置するブロック','CSSを設定するブロック','editor-block-list-item-に続くクラス名']
			[ 'Paragraph', 'Paragraph', 'paragraph' ],
			[ 'Image', 'Image', 'image'],
			[ 'Heading', 'Heading', 'heading' ],
			[ "Buttons", "Buttons", "buttons" ],
			[ "Buttons", "Button", "buttons" ],
		]

		for (let i = 0; i < testBlockLists.length; i++) {

			// ブロックを追加
			await insertBlock(testBlockLists[i][0]);

			// Open list view.
			await openListView();

			// Open the sidebar.
			await openDocumentSettingsSidebar();

			// abc-editor-panel-bodyをクリック
			const panelBodyOpen = await page.waitForSelector(
				'.abc-editor-panel-body'
			);
			await panelBodyOpen.click();

			//abc-editorをクリック
			const editor = await page.waitForSelector(
				'.abc-editor'
			);
			await editor.click();

			//テキストを入力
			await page.keyboard.type('.abc { color: red; }');

			// 入力した値が存在するかテストを入れたい。。
			// expect(
			// 	await page.$( 'advancedBlockCss":".abc { color: red; }' )
			// ).not.toBeNull();
			// expect(page.style).toContain('color: red');

			// 配置したブロックを削除
			await clickButton( testBlockLists[i][0] );
			await page.keyboard.press( 'Escape' );
			await page.keyboard.press( 'Backspace' );

		}

	} )

});
