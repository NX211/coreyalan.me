"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/remark-breaks";
exports.ids = ["vendor-chunks/remark-breaks"];
exports.modules = {

/***/ "(rsc)/./node_modules/remark-breaks/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/remark-breaks/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ remarkBreaks)\n/* harmony export */ });\n/* harmony import */ var mdast_util_newline_to_break__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-newline-to-break */ \"(rsc)/./node_modules/mdast-util-newline-to-break/lib/index.js\");\n/**\n * @typedef {import('mdast').Root} Root\n */\n\n\n\n/**\n * Support hard breaks without needing spaces or escapes (turns enters into\n * `<br>`s).\n *\n * @returns\n *   Transform.\n */\nfunction remarkBreaks() {\n  /**\n   * Transform.\n   *\n   * @param {Root} tree\n   *   Tree.\n   * @returns {undefined}\n   *   Nothing.\n   */\n  return function (tree) {\n    (0,mdast_util_newline_to_break__WEBPACK_IMPORTED_MODULE_0__.newlineToBreak)(tree)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvcmVtYXJrLWJyZWFrcy9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DOztBQUUwRDs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxJQUFJLDJFQUFjO0FBQ2xCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JleWFsYW4tcG9ydGZvbGlvLy4vbm9kZV9tb2R1bGVzL3JlbWFyay1icmVha3MvbGliL2luZGV4LmpzP2E3NzIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlJvb3R9IFJvb3RcbiAqL1xuXG5pbXBvcnQge25ld2xpbmVUb0JyZWFrfSBmcm9tICdtZGFzdC11dGlsLW5ld2xpbmUtdG8tYnJlYWsnXG5cbi8qKlxuICogU3VwcG9ydCBoYXJkIGJyZWFrcyB3aXRob3V0IG5lZWRpbmcgc3BhY2VzIG9yIGVzY2FwZXMgKHR1cm5zIGVudGVycyBpbnRvXG4gKiBgPGJyPmBzKS5cbiAqXG4gKiBAcmV0dXJuc1xuICogICBUcmFuc2Zvcm0uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbWFya0JyZWFrcygpIHtcbiAgLyoqXG4gICAqIFRyYW5zZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHtSb290fSB0cmVlXG4gICAqICAgVHJlZS5cbiAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICogICBOb3RoaW5nLlxuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uICh0cmVlKSB7XG4gICAgbmV3bGluZVRvQnJlYWsodHJlZSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/remark-breaks/lib/index.js\n");

/***/ })

};
;