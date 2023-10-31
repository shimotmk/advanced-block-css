/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/download.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/download.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const download = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M18 11.3l-1-1.1-4 4V3h-1.5v11.3L7 10.2l-1 1.1 6.2 5.8 5.8-5.8zm.5 3.7v3.5h-13V15H4v5h16v-5h-1.5z"
}));
/* harmony default export */ __webpack_exports__["default"] = (download);
//# sourceMappingURL=download.js.map

/***/ }),

/***/ "./src/admin/export/css-export.js":
/*!****************************************!*\
  !*** ./src/admin/export/css-export.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CSSExport; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/download.js");


/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

/*globals ABCSCRIPT */

function CSSExport(_ref) {
  let {
    page
  } = _ref;

  // https://github.com/WordPress/gutenberg/pull/22922#discussion_r439556871
  async function handleExport() {
    function downloadBlob(data, filename, mimeType) {
      // eslint-disable-next-line no-undef
      const blob = new Blob([data], {
        type: mimeType
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = filename;
      anchor.href = url;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    let cssContent; // ブロックテーマのとき

    if (ABCSCRIPT.isBlockTheme) {
      const renderedString = page.content.rendered;
      const tag = 'style';
      cssContent = [...Object.assign(document.createElement('template'), {
        innerHTML: renderedString
      }).content.querySelectorAll(tag)].map(x => x.textContent);
      cssContent = cssContent.join('');
    } else {
      const string = page.content.raw;
      const regex = /"advancedBlockCss":"(.+)"/g;
      let arr = string.match(regex, '');
      arr = arr.map(item => item.replace(`"advancedBlockCss":"`, '').slice(0, -1)); // 改行コードを削除

      arr = arr.map(item => item.replace(/\\n/g, ''));
      cssContent = arr.join('');
    }

    downloadBlob(cssContent, 'style.css', 'text/css');
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
    onClick: handleExport
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Export', 'block-code-snippets'));
}

/***/ }),

/***/ "./src/admin/export/index.js":
/*!***********************************!*\
  !*** ./src/admin/export/index.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ExportSection; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _css_export__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css-export */ "./src/admin/export/css-export.js");


/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */

 // https://developer.wordpress.org/block-editor/how-to-guides/data-basics/3-building-an-edit-form/

/*globals advancedBlockCssOptions */

function ExportSection() {
  const [searchTerm, setSearchTerm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    pages,
    hasResolved
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const query = {};

    if (searchTerm) {
      query.search = searchTerm;
    } // const selectorArgs = [ 'postType', 'post', query ];
    // 各カスタム投稿タイプ,サイトエディター,ウィジェットエリアもある


    const selectorArgs = ['postType', 'post', query];
    return {
      pages: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).getEntityRecords(...selectorArgs),
      hasResolved: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store).hasFinishedResolution('getEntityRecords', selectorArgs)
    };
  }, [searchTerm]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Block Code Snippets Export(β)', 'block-code-snippets')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('You can export the styles you have added with Block Code Snippets for each page.', 'block-code-snippets')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SearchControl, {
    onChange: setSearchTerm,
    value: searchTerm
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PagesList, {
    hasResolved: hasResolved,
    pages: pages
  }));
}

function PagesList(_ref) {
  let {
    hasResolved,
    pages
  } = _ref;

  if (!hasResolved) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null);
  }

  if (!(pages !== null && pages !== void 0 && pages.length)) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No results', 'block-code-snippets'));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "wp-list-table widefat fixed striped table-view-list"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Title', 'block-code-snippets')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Export CSS File', 'block-code-snippets')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, pages === null || pages === void 0 ? void 0 : pages.map(page => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: page.id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, page.title.rendered), (() => {
    let content;
    let regexp; // ブロックテーマの場合

    if (advancedBlockCssOptions.isBlockTheme === '') {
      content = page.content.rendered;
      regexp = /style/;
    } else {
      content = page.content.raw;
      regexp = /advancedBlockCss/;
    }

    if (regexp.test(content)) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_css_export__WEBPACK_IMPORTED_MODULE_5__["default"], {
        page: page
      }));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Not used', 'block-code-snippets'));
  })())))));
}

/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminContext": function() { return /* binding */ AdminContext; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logo */ "./src/utils/logo.js");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./update */ "./src/admin/update/index.js");
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./export */ "./src/admin/export/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/admin/style.scss");


/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


 // import ActivationSection from './activation';



/*globals advancedBlockCssOptions */

const AdminContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)();

function AbcAdmin() {
  // 初期値を設定する
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [abcOption, setAbcOption] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(advancedBlockCssOptions);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AdminContext.Provider, {
    value: {
      isLoading,
      setIsLoading,
      abcOption,
      setAbcOption
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "privacy-settings-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "privacy-settings-title-section"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, _utils_logo__WEBPACK_IMPORTED_MODULE_2__.ABCIconBold, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Block Code Snippets Settings', 'block-code-snippets')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_update__WEBPACK_IMPORTED_MODULE_3__["default"], null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "privacy-settings-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "abc-admin-section"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_export__WEBPACK_IMPORTED_MODULE_4__["default"], null)))));
}

window.addEventListener('load', function () {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AbcAdmin, null), document.querySelector('#block-code-snippets-admin'));
}, false);

/***/ }),

/***/ "./src/admin/update/index.js":
/*!***********************************!*\
  !*** ./src/admin/update/index.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsContext": function() { return /* binding */ OptionsContext; },
/* harmony export */   "default": function() { return /* binding */ UpdateButton; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api */ "@wordpress/api");
/* harmony import */ var _wordpress_api__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../index */ "./src/admin/index.js");


/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


const OptionsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)();
function UpdateButton() {
  const {
    isLoading,
    abcOption,
    setIsLoading
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_index__WEBPACK_IMPORTED_MODULE_4__.AdminContext);
  const [isSaveSuccess, setIsSaveSuccess] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // オプション値を保存

  const onClickUpdate = event => {
    event.preventDefault();
    setIsLoading(true);
    _wordpress_api__WEBPACK_IMPORTED_MODULE_3___default().loadPromise.then(() => {
      // console.log( response );
      const model = new (_wordpress_api__WEBPACK_IMPORTED_MODULE_3___default().models.Settings)({
        block_code_snippets_options: abcOption
      });
      const save = model.save();
      save.success(() => {
        // console.log( response );
        // console.log( status );
        setTimeout(() => {
          setIsLoading(false);
          setIsSaveSuccess(true);
        }, 600);
      });
      save.error(() => {
        setTimeout(() => {
          setIsLoading(false);
          setIsSaveSuccess(false);
        }, 600);
      });
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "update-button-area"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.KeyboardShortcuts, {
    bindGlobal: true,
    shortcuts: {
      'mod+s': onClickUpdate
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "update-button",
    isPrimary: true,
    onClick: onClickUpdate,
    isBusy: isLoading
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save setting', 'block-code-snippets')), isSaveSuccess === false && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to save.', 'block-code-snippets'))));
}

/***/ }),

/***/ "./src/utils/logo.js":
/*!***************************!*\
  !*** ./src/utils/logo.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ABCIconBold": function() { return /* binding */ ABCIconBold; },
/* harmony export */   "ABCIconLight": function() { return /* binding */ ABCIconLight; },
/* harmony export */   "ABCIconRegular": function() { return /* binding */ ABCIconRegular; },
/* harmony export */   "Copy": function() { return /* binding */ Copy; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const ABCIconLight = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 250 250",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M67.6905 96.8324V54.581C67.6905 37.1027 81.2293 35.216 87.0551 35.216C89.3205 35.216 91.1624 33.3728 91.1624 31.1083C91.1624 28.8433 89.3205 27.0002 87.0551 27.0002C83.1822 27.0002 75.7324 27.7168 69.331 32.5164C62.8802 37.3535 59.4719 44.9834 59.4719 54.581V96.8324C59.4719 106.039 44.3913 114.146 38.5819 116.491C37.0155 117.118 36.0041 118.615 36 120.304C36 121.992 37.0114 123.489 38.5778 124.118C44.3913 126.465 59.4719 134.57 59.4719 143.779V195.419C59.4719 205.017 62.8802 212.646 69.331 217.484C75.7324 222.284 83.1822 223 87.0551 223C89.3205 223 91.1624 221.158 91.1624 218.892C91.1624 216.627 89.3205 214.785 87.0551 214.785C81.2293 214.785 67.6905 212.897 67.6905 195.419V143.779C67.6905 132.904 57.2353 124.842 49.3373 120.305C57.2353 115.769 67.6905 107.708 67.6905 96.8324",
  fill: "#100F0D"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M210.642 116.493C204.829 114.146 189.748 106.041 189.748 96.8321V54.5807C189.748 44.9833 186.341 37.3532 179.892 32.5163C173.491 27.7164 166.04 27 162.171 27C159.902 27 158.06 28.843 158.06 31.1078C158.06 33.3727 159.902 35.2157 162.171 35.2157C167.994 35.2157 181.534 37.1024 181.534 54.5807V96.8321C181.534 107.707 191.989 115.769 199.887 120.305C191.989 124.842 181.534 132.903 181.534 143.778V195.419C181.534 212.897 167.994 214.784 162.171 214.784C159.902 214.784 158.06 216.627 158.06 218.892C158.06 221.157 159.902 223 162.171 223C166.04 223 173.491 222.284 179.892 217.484C186.341 212.646 189.748 205.017 189.748 195.419V143.778C189.748 134.57 204.829 126.465 210.642 124.119C212.207 123.493 213.223 121.996 213.223 120.307C213.223 118.619 212.212 117.122 210.642 116.493Z",
  fill: "#100F0D"
}));
const ABCIconRegular = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 1027 1134",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M199.996 406.669V166.67C199.996 79.6599 262.666 66.6679 300.014 66.6679C318.409 66.6679 333.34 51.7129 333.34 33.3338C333.34 14.9548 318.409 -1.42001e-05 300.014 -1.42001e-05C276.761 -1.42001e-05 232.008 4.33186 193.347 33.3338C154.088 62.7738 133.344 108.881 133.344 166.67V406.669C133.344 453.202 50.0886 497.29 20.9831 509.052C8.24199 514.14 0 526.28 0 539.989C0 553.689 8.2021 565.837 20.9034 570.933C50.0885 582.707 133.344 626.803 133.344 673.336V966.669C133.344 1024.45 154.088 1070.56 193.347 1100C232.008 1129 276.761 1133.33 300.014 1133.33C318.409 1133.33 333.34 1118.39 333.34 1100C333.34 1081.62 318.409 1066.67 300.014 1066.67C262.666 1066.67 199.996 1053.68 199.996 966.669V673.336C199.996 614.07 151.341 569.213 105.154 540C151.341 510.791 199.996 465.943 199.996 406.669",
  fill: "#100F0D"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M1005.77 509.074C976.592 497.298 893.301 453.211 893.301 406.674V166.672C893.301 108.883 872.588 62.778 833.322 33.3396C794.673 4.33744 749.898 0.00534836 726.674 0.00534836C708.253 0.00534836 693.313 14.9582 693.313 33.3396C693.313 51.7209 708.253 66.6738 726.674 66.6738C764 66.6738 826.667 79.6653 826.667 166.672V406.674C826.667 465.947 875.32 510.793 921.505 540.006C875.32 569.22 826.667 614.074 826.667 673.338V966.669C826.667 1053.68 764 1066.67 726.674 1066.67C708.253 1066.67 693.313 1081.62 693.313 1100.01C693.313 1118.39 708.253 1133.34 726.674 1133.34C749.898 1133.34 794.673 1129 833.322 1100.01C872.588 1070.56 893.301 1024.46 893.301 966.669V673.338C893.301 626.792 976.548 582.714 1005.68 570.952C1018.41 565.866 1026.65 553.725 1026.65 540.024C1026.65 526.327 1018.46 514.186 1005.77 509.074",
  fill: "#100F0D"
}));
const ABCIconBold = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 1058 1165",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M230.649 422.001V182.004C230.649 149.085 240.56 125.524 260.1 111.97C277.5 99.8749 299.742 97.3353 315.34 97.3353C342.144 97.3353 363.993 75.5037 363.993 48.6716C363.993 21.8338 342.144 0.00202798 315.34 0.00202798C290.17 0.00202798 241.686 4.73221 199.453 36.4014C156.206 68.8533 133.344 119.201 133.344 182.004V422.001C133.344 454.977 66.3909 495.695 30.5772 510.15C11.9946 517.577 0 535.304 0 555.317C0 575.318 11.9945 593.056 30.4645 600.484C66.3344 614.961 133.344 655.696 133.344 688.672V982.001C133.344 1044.8 156.206 1095.15 199.453 1127.6C241.686 1159.27 290.17 1164 315.34 1164C342.144 1164 363.993 1142.18 363.993 1115.33C363.993 1088.5 342.144 1066.67 315.34 1066.67C299.742 1066.67 277.5 1064.14 260.1 1052.04C240.56 1038.48 230.649 1014.92 230.649 982.001V688.672C230.649 640.538 202.099 594.762 147.816 555.334C202.099 515.91 230.649 470.141 230.649 422.001"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M1026.83 510.177C990.973 495.69 923.989 454.973 923.989 422.001V182.002C923.989 119.197 901.156 68.8496 857.852 36.3991C815.639 4.72994 767.127 -5.66726e-05 741.993 -5.66726e-05C715.162 -5.66726e-05 693.359 21.8334 693.359 48.6695C693.359 75.4996 715.162 97.3332 741.993 97.3332C757.618 97.3332 779.845 99.8708 797.288 111.966C816.79 125.52 826.662 149.086 826.662 182.002V422.001C826.662 470.138 855.249 515.907 909.514 555.334C855.249 594.762 826.662 640.536 826.662 688.667V981.999C826.662 1014.92 816.79 1038.48 797.288 1052.04C779.845 1064.14 757.618 1066.67 741.993 1066.67C715.162 1066.67 693.359 1088.5 693.359 1115.33C693.359 1142.17 715.162 1164 741.993 1164C767.127 1164 815.639 1159.27 857.852 1127.6C901.156 1095.15 923.989 1044.8 923.989 981.999V688.667C923.989 655.696 990.973 614.972 1026.77 600.522C1045.3 593.096 1057.35 575.363 1057.35 555.365C1057.35 535.372 1045.36 517.633 1026.83 510.177"
}));
const Copy = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M20.2 8v11c0 .7-.6 1.2-1.2 1.2H6v1.5h13c1.5 0 2.7-1.2 2.7-2.8V8zM18 16.4V4.6c0-.9-.7-1.6-1.6-1.6H4.6C3.7 3 3 3.7 3 4.6v11.8c0 .9.7 1.6 1.6 1.6h11.8c.9 0 1.6-.7 1.6-1.6zm-13.5 0V4.6c0-.1.1-.1.1-.1h11.8c.1 0 .1.1.1.1v11.8c0 .1-.1.1-.1.1H4.6l-.1-.1z"
}));

/***/ }),

/***/ "./src/admin/style.scss":
/*!******************************!*\
  !*** ./src/admin/style.scss ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api":
/*!*****************************!*\
  !*** external ["wp","api"] ***!
  \*****************************/
/***/ (function(module) {

module.exports = window["wp"]["api"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["primitives"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"admin/index": 0,
/******/ 			"admin/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkblock_code_snippets"] = self["webpackChunkblock_code_snippets"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["admin/style-index"], function() { return __webpack_require__("./src/admin/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map