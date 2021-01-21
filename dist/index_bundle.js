/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["$"] = factory();
	else
		root["$"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts.js":
/*!************************!*\
  !*** ./src/scripts.js ***!
  \************************/
/***/ (() => {

eval("(function () {\n  //\n  // Variables\n  //\n  var productGallery;\n  var productForm;\n  var variantSelector;\n  var productRecommendations;\n  var isStickyModeActive = false;\n  var initialSizeSwatchesOptions;\n  var sizeSwatchesSelect; //\n  // Methods\n  //\n\n  var createIntersectionsObserver = function createIntersectionsObserver() {\n    var observer;\n    var options = {\n      threshold: 0.1\n    };\n    observer = new IntersectionObserver(handleIntersections, options);\n    observer.observe(productRecommendations);\n    observer.observe(productGallery);\n  };\n\n  var handleIntersections = function handleIntersections(entries) {\n    entries.forEach(function (entry) {\n      if (entry.isIntersecting) {\n        // if productGallery or productRecommendations are visible (in viewport)\n        // remove sticky feature\n        removeFormSticky();\n      } else {\n        makeFormSticky();\n      }\n    });\n  };\n\n  var makeFormSticky = function makeFormSticky() {\n    var windowInnerWidth = document.documentElement.clientWidth;\n\n    if (windowInnerWidth < 1024) {\n      if (!isStickyModeActive) {\n        isStickyModeActive = true;\n        productForm.classList.add('product__form_sticky');\n        variantSelector.classList.add('variant-selector__status-hidden');\n        removeSizeSwatches();\n      }\n    }\n  };\n\n  var removeFormSticky = function removeFormSticky() {\n    if (isStickyModeActive) {\n      isStickyModeActive = false;\n      productForm.classList.remove('product__form_sticky');\n      variantSelector.classList.remove('variant-selector__status-hidden');\n      restoreSizeSwatches();\n    }\n  };\n\n  var removeSizeSwatches = function removeSizeSwatches() {\n    var sizeSwatchesOptions = sizeSwatchesSelect.querySelectorAll('option');\n    sizeSwatchesOptions.forEach(function (option) {\n      var value = parseInt(option.value.trim()); // If size swatch if not multiple of 4, remove it\n\n      if (!isNaN(value) && value % 4 !== 0) {\n        option.remove();\n      }\n    });\n  };\n\n  var restoreSizeSwatches = function restoreSizeSwatches() {\n    var selectedOption = sizeSwatchesSelect.selectedOptions.length && sizeSwatchesSelect.selectedOptions[0];\n    initialSizeSwatchesOptions.forEach(function (element, key) {\n      if (element.text !== 'Select') {\n        var isSelected = element.value == selectedOption.value ? true : false;\n        var option = new Option(element.text, element.value, element.defaultSelected, isSelected);\n        sizeSwatchesSelect[key] = option;\n      }\n    });\n  };\n\n  var addProgressBar = function addProgressBar(parent, cartTotal) {\n    var discounts = ['$15 off', '$20 off', '$30 off', '$50 off'];\n    var amounts = [100, 150, 200, 300];\n    var progressDiv = document.createElement('div');\n    progressDiv.classList.add('progress-bar');\n    var ul = document.createElement('ul');\n\n    for (var i = 0; i < discounts.length; i++) {\n      var li = document.createElement('li');\n      var span = document.createElement('span');\n      span.appendChild(document.createTextNode(discounts[i]));\n\n      if (cartTotal >= amounts[i]) {\n        span.classList.add('completed');\n      } else if (i === 0 || cartTotal < amounts[i] && cartTotal >= amounts[i - 1]) {\n        span.classList.add('current');\n        var percentage = 0;\n\n        if (i === 0) {\n          percentage = cartTotal * 100 / amounts[i];\n        } else {\n          percentage = (cartTotal - amounts[i - 1]) * 100 / (amounts[i] - amounts[i - 1]);\n        }\n\n        span.style.setProperty('--width', percentage);\n      }\n\n      li.appendChild(span);\n      ul.appendChild(li);\n    }\n\n    progressDiv.appendChild(ul);\n    parent.appendChild(progressDiv);\n  }; //\n  // Inits & Event Listeners\n  //\n\n\n  window.addEventListener('load', function (event) {\n    productGallery = document.querySelector('.product__gallery');\n    productRecommendations = document.querySelector('.product-recommendations');\n    productForm = document.querySelector('.product__form');\n    variantSelector = document.querySelector('.variant-selector__status');\n    sizeSwatchesSelect = document.querySelector('.variant-selector__options select');\n    initialSizeSwatchesOptions = sizeSwatchesSelect.querySelectorAll('option');\n    var cartButton = document.querySelector('.cart-count');\n    cartButton.addEventListener('click', handleCartButton);\n    var submitButtons = document.querySelectorAll('.variant-selector__submit');\n    submitButtons.forEach(function (button) {\n      button.addEventListener('click', handleCartButton);\n    });\n    createIntersectionsObserver();\n  });\n\n  function handleCartButton(event) {\n    var waitForEl = function waitForEl(selector, callback) {\n      var el = document.querySelector(selector);\n\n      if (el) {\n        callback(el);\n      } else {\n        setTimeout(function () {\n          waitForEl(selector, callback);\n        }, 100);\n      }\n    };\n\n    waitForEl('.cart__banner', function (el) {\n      var cartTotal = cartManager.getCart().totalPrice;\n      addProgressBar(el, cartTotal);\n    });\n  }\n})();\n\n//# sourceURL=webpack://$/./src/scripts.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/scripts.js");
/******/ })()
;
});