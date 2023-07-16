/**
 * @typedef FunctionOnDeleteImageUpload
 * @function
 * @param {ReferenceStateSetter} setImage
 */

/**
 * @typedef FunctionCallbackImageUpload
 * @function
 * @param { string } src
 * @param { Object } data
 */


/**
 * @typedef {Object} ReferenceState
 */

/**
 * @callback ReferenceStateSetter
 * @param {ReferenceState} state
 * @returns {void}
 */


/**
 * @typedef Columns
 * @property {String} key
 * @property {String | String[]} dataIndex
 * @property {Number} width
 * @property {Function} render
 * @property {Function} sorter
 * @property {String} className
 * @property {Number} colSpan
 * @property {Boolean} filterResetToDefaultFilteredValue
 * @property {String[]} defaultFilteredValue
 * @property {"ascend" | "descend"} defaultSortOrder
 * @property {ReactNode | Function} filterDropdown
 * @property {Boolean} filterDropdownOpen
 * @property {Boolean} filtered
 * @property {String[]} filteredValue
 * @property {Boolean} filterMultiple
 * @property {"menu" | "tree"} filterMode
 * @property {Boolean | Function} filterSearch
 */