/**
 * WordPress dependencies
 */
import { render, useState, createContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ABCIconBold } from '../utils/logo';
import UpdateButton from './update';
// import ActivationSection from './activation';
import ExportSection from './export';
import './style.scss';
/*globals advancedBlockCssOptions */

export const AdminContext = createContext();

function AbcAdmin() {
	// 初期値を設定する
	const [ isLoading, setIsLoading ] = useState( false );
	const [ abcOption, setAbcOption ] = useState( advancedBlockCssOptions );

	return (
		<>
			{ /* AdminContext.Providerで各コンポーネントにvalueを渡す */ }
			<AdminContext.Provider
				value={ {
					isLoading,
					setIsLoading,
					abcOption,
					setAbcOption,
				} }
			>
				<div className="privacy-settings-header">
					<div className="privacy-settings-title-section">
						<h1>
							{ ABCIconBold }
							{ __(
								'Block Code Snippets Settings',
								'block-code-snippets'
							) }
						</h1>
						<UpdateButton />
					</div>
				</div>
				<div className="privacy-settings-body">
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
			document.querySelector( '#block-code-snippets-admin' )
		);
	},
	false
);
