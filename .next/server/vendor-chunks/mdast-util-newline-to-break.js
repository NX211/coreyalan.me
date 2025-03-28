"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-newline-to-break";
exports.ids = ["vendor-chunks/mdast-util-newline-to-break"];
exports.modules = {

/***/ "(rsc)/./node_modules/mdast-util-newline-to-break/lib/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/mdast-util-newline-to-break/lib/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   newlineToBreak: () => (/* binding */ newlineToBreak)\n/* harmony export */ });\n/* harmony import */ var mdast_util_find_and_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-find-and-replace */ \"(rsc)/./node_modules/mdast-util-find-and-replace/lib/index.js\");\n/**\n * @typedef {import('mdast').Nodes} Nodes\n * @typedef {import('mdast-util-find-and-replace').ReplaceFunction} ReplaceFunction\n */\n\n\n\n/**\n * Turn normal line endings into hard breaks.\n *\n * @param {Nodes} tree\n *   Tree to change.\n * @returns {undefined}\n *   Nothing.\n */\nfunction newlineToBreak(tree) {\n  (0,mdast_util_find_and_replace__WEBPACK_IMPORTED_MODULE_0__.findAndReplace)(tree, [/\\r?\\n|\\r/g, replace])\n}\n\n/**\n * Replace line endings.\n *\n * @type {ReplaceFunction}\n */\nfunction replace() {\n  return {type: 'break'}\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1uZXdsaW5lLXRvLWJyZWFrL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsYUFBYSx1QkFBdUI7QUFDcEMsYUFBYSx1REFBdUQ7QUFDcEU7O0FBRTBEOztBQUUxRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1AsRUFBRSwyRUFBYztBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDViIsInNvdXJjZXMiOlsid2VicGFjazovL2NvcmV5YWxhbi1wb3J0Zm9saW8vLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1uZXdsaW5lLXRvLWJyZWFrL2xpYi9pbmRleC5qcz8zMjA2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5Ob2Rlc30gTm9kZXNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtZmluZC1hbmQtcmVwbGFjZScpLlJlcGxhY2VGdW5jdGlvbn0gUmVwbGFjZUZ1bmN0aW9uXG4gKi9cblxuaW1wb3J0IHtmaW5kQW5kUmVwbGFjZX0gZnJvbSAnbWRhc3QtdXRpbC1maW5kLWFuZC1yZXBsYWNlJ1xuXG4vKipcbiAqIFR1cm4gbm9ybWFsIGxpbmUgZW5kaW5ncyBpbnRvIGhhcmQgYnJlYWtzLlxuICpcbiAqIEBwYXJhbSB7Tm9kZXN9IHRyZWVcbiAqICAgVHJlZSB0byBjaGFuZ2UuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogICBOb3RoaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZVRvQnJlYWsodHJlZSkge1xuICBmaW5kQW5kUmVwbGFjZSh0cmVlLCBbL1xccj9cXG58XFxyL2csIHJlcGxhY2VdKVxufVxuXG4vKipcbiAqIFJlcGxhY2UgbGluZSBlbmRpbmdzLlxuICpcbiAqIEB0eXBlIHtSZXBsYWNlRnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHJlcGxhY2UoKSB7XG4gIHJldHVybiB7dHlwZTogJ2JyZWFrJ31cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/mdast-util-newline-to-break/lib/index.js\n");

/***/ })

};
;