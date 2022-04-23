/**
 * WordPress dependencies
 */
import { SearchControl, Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CSSExport from './css-export';
// https://developer.wordpress.org/block-editor/how-to-guides/data-basics/3-building-an-edit-form/
/*globals advancedBlockCssOptions */

export default function ExportSection() {
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const { pages, hasResolved } = useSelect(
		( select ) => {
			const query = {};
			if ( searchTerm ) {
				query.search = searchTerm;
			}
			// const selectorArgs = [ 'postType', 'post', query ];
			// 各カスタム投稿タイプ,サイトエディター,ウィジェットエリアもある
			const selectorArgs = [ 'postType', 'post', query ];
			return {
				pages: select( coreDataStore ).getEntityRecords(
					...selectorArgs
				),
				hasResolved: select( coreDataStore ).hasFinishedResolution(
					'getEntityRecords',
					selectorArgs
				),
			};
		},
		[ searchTerm ]
	);

	return (
		<>
			<h2>
				{ __( 'Advanced Block CSS Export(β)', 'advanced-block-css' ) }
			</h2>
			<p>
				{ __(
					'You can export the styles you have added with Advanced Block CSS for each page.',
					'advanced-block-css'
				) }
			</p>
			<SearchControl onChange={ setSearchTerm } value={ searchTerm } />
			<PagesList hasResolved={ hasResolved } pages={ pages } />
		</>
	);
}

function PagesList( { hasResolved, pages } ) {
	if ( ! hasResolved ) {
		return <Spinner />;
	}
	if ( ! pages?.length ) {
		return <div>{ __( 'No results', 'advanced-block-css' ) }</div>;
	}

	return (
		<>
			<table className="wp-list-table widefat fixed striped table-view-list">
				<thead>
					<tr>
						<td>{ __( 'Title', 'advanced-block-css' ) }</td>
						<td>
							{ __( 'Export CSS File', 'advanced-block-css' ) }
						</td>
					</tr>
				</thead>
				<tbody>
					{ pages?.map( ( page ) => (
						<tr key={ page.id }>
							<td>{ page.title.rendered }</td>
							{ ( () => {
								let content;
								let regexp;
								// ブロックテーマの場合
								if (
									advancedBlockCssOptions.isBlockTheme === ''
								) {
									content = page.content.rendered;
									regexp = /style/;
								} else {
									content = page.content.raw;
									regexp = /advancedBlockCss/;
								}
								if ( regexp.test( content ) ) {
									return (
										<td>
											<CSSExport page={ page } />
										</td>
									);
								}
								return (
									<td>
										{ __(
											'Not used',
											'advanced-block-css'
										) }
									</td>
								);
							} )() }
						</tr>
					) ) }
				</tbody>
			</table>
		</>
	);
}
