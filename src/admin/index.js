/**
 * WordPress dependencies
 */
import { render, useState, createContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import UpdateButton from './update';
import EditorSection from './editor';
import EnqueueSection from './enqueue';
// import ActivationSection from './activation';
import ExportSection from './export';
import './style.scss';
/*globals advancedBlockCssOptions */
/*globals abcBlocksList */

export const AdminContext = createContext();

function AbcAdmin() {
	// 初期値を設定する
	const [ isLoading, setIsLoading ] = useState( false );
	const [ abcOption, setAbcOption ] = useState( advancedBlockCssOptions );

	return (
		<>
			<div className="privacy-settings-header">
				<div className="privacy-settings-title-section">
					<h1>
						{ __(
							'Advanced Block CSS Settings',
							'advanced-block-css'
						) }
					</h1>
				</div>
			</div>
			{ /* AdminContext.Providerで各コンポーネントにvalueを渡す */ }
			<AdminContext.Provider
				value={ {
					isLoading,
					setIsLoading,
					abcOption,
					setAbcOption,
					abcBlocksList,
				} }
			>
				<div className="privacy-settings-body">
					<section className="abc-admin-section">
						<UpdateButton />
					</section>
					<section className="abc-admin-section">
						<EditorSection />
					</section>
					<section className="abc-admin-section">
						<EnqueueSection />
					</section>
					{ /* <section className="abc-admin-section">
						<ActivationSection />
					</section> */ }
					<section className="abc-admin-section">
						<ExportSection />
					</section>
				</div>
			</AdminContext.Provider>
		</>
	);
}

window.addEventListener(
	'load',
	function () {
		render(
			<AbcAdmin />,
			document.querySelector( '#advanced-block-css-admin' )
		);
	},
	false
);
