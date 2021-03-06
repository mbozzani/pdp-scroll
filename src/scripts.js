(function () {

	//
	// Variables
	//
	let productGallery;
	let productForm;
	let variantSelector;

	let productRecommendations;
	let isStickyModeActive = false;

	let initialSizeSwatchesOptions;
	let sizeSwatchesSelect;

	let progressBar;

	//
	// Methods
	//
	/**
	 * Watch for product recommendations and gallery sections
	 * and enable/disable the 'sticky' feature
	 * We use IntersectionObserver API instead of adding listeners for scroll events
	 * which can cause performance issues
	 */
	const createIntersectionsObserver = () => {
		const options = {
			threshold: 0.1
		};
	
		const observer = new IntersectionObserver(handleIntersections, options);
		productRecommendations && observer.observe(productRecommendations);
		productGallery && observer.observe(productGallery);
	}

	/**
	 * Handler for IntersectionObserver
	 * If productGallery or productRecommendations sections are visible in viewport
		the 'sticky' feature is removed, otherwise is activated
	 */
	const handleIntersections = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				removeFormSticky();
			} else {
				makeFormSticky();
			}
		});
	}

	/**
	 * Activate the 'sticky' functionality
	 * Only if the viewport witdh is less than 1024 
	 */
	const makeFormSticky = () => {
		const windowInnerWidth  = document.documentElement.clientWidth;
		if (windowInnerWidth < 1024) {
			if (!isStickyModeActive) {
				productForm && productForm.classList.add('product__form_sticky');
				variantSelector && variantSelector.classList.add('variant-selector__status-hidden');
				isStickyModeActive = true;
				removeSizeSwatches();
			}
		}
	}
	
	const removeFormSticky = () => {
		if (isStickyModeActive) {
			isStickyModeActive = false;
			productForm && productForm.classList.remove('product__form_sticky');
			variantSelector && variantSelector.classList.remove('variant-selector__status-hidden');
			restoreSizeSwatches();
		}
	}

	/**
	 * Removes size swatches that are not multiple of 4
	 * We iterate a static list returned by querySelectorAll when removing
	 * This is a safe operation since the static list is not mutating while the options are being removed
	 */
	const removeSizeSwatches = () => {
		const sizeSwatchesOptions = sizeSwatchesSelect.querySelectorAll('option');
		if (sizeSwatchesOptions) {
			sizeSwatchesOptions.forEach((option) => {
				const value = parseInt(option.value.trim());
				// If size swatch if not multiple of 4, remove it
				if (!isNaN(value) && value%4 !== 0) {
					option.remove();
				}
			});
		}
	}

	/**
	 * Restore the initial size swatches options and check the current selected item
	 * to preserve the selection
	 */
	const restoreSizeSwatches = () => {
		const selectedOption = sizeSwatchesSelect.selectedOptions.length && sizeSwatchesSelect.selectedOptions[0];
		initialSizeSwatchesOptions.forEach(function(element,key) {
			if (element.text!=='Select') {
				const isSelected = element.value == selectedOption.value ? true:false;
				const option = new Option(element.text, element.value, element.defaultSelected, isSelected);
				sizeSwatchesSelect[key] = option;
			}
		});
	}

	/**
	 * Create the DOM elements of the progress bar and add them to the cart
	 */
	const addProgressBar = (parent, cartTotal) => {
		const discounts = ['$15 off', '$20 off', '$30 off', '$50 off'];
		progressDiv = document.createElement('div');
		progressDiv.classList.add('progress-bar');
		const ul = document.createElement('ul');

		discounts.forEach((discount) => {
			const li = document.createElement('li');
			const span = document.createElement('span');
			li.appendChild(span);
			span.appendChild(document.createTextNode(discount));
			ul.append(li);
		});
		progressDiv.appendChild(ul);
		parent.appendChild(progressDiv);
		setProgressBarPercentage(cartTotal);
	}

	/**
	 * Calculate and set the progress bar percentage
	 */
	const setProgressBarPercentage = (cartTotal) => {
		const amounts = [100, 150, 200, 300];
		const liItems = progressDiv.firstElementChild.children;

		for (let i = 0; i < liItems.length; i++) {
			const span = liItems[i].firstElementChild;
			span.classList.remove('completed', 'current');
			span.style.removeProperty('--width');

			if (cartTotal >= amounts[i]) {
				span.classList.add('completed');
			} else if (i===0 || (cartTotal<amounts[i] && cartTotal>=amounts[i-1])) {
				span.classList.add('current');
				let percentage = 0;
				if (i===0) {
					percentage = (cartTotal*100)/amounts[i];
				} else {
					percentage = ((cartTotal-amounts[i-1])*100)/(amounts[i]-amounts[i-1]);
				}
				span.style.setProperty('--width', percentage);
			}
		}
	}

	/**
	 * Watch changes in the cart main section.
	 * If list items are deleted or cart total amount changes the observer
	 * will catch the change and set the new value in the progress bar
	 * I've decided to use an observer since all operations in the cart are async
	 * A better solution would be to listen for cartManager events
	 */
	const watchCartMain = () => {
		const mutationOptions = { childList: true, subtree: true, characterData: true};
		const cartMainObserver = new MutationObserver(function (mutationList) {
			setProgressBarPercentage(cartManager.getCart().totalPrice)
		});
		const cartMain = document.querySelector('.cart__main');
		cartMain && cartMainObserver.observe(cartMain, mutationOptions);
	}


	//
	// Inits & Event Listeners
	//
	/**
	 * Wait until the page completes loading (shopify, etc) to init
	 */
	window.addEventListener('load', (event) => {
		productGallery = document.querySelector('.product__gallery');
		productRecommendations = document.querySelector('.product-recommendations');
		productForm = document.querySelector('.product__form');
		variantSelector = document.querySelector('.variant-selector__status');
		sizeSwatchesSelect = document.querySelector('.variant-selector__options select');
		initialSizeSwatchesOptions = sizeSwatchesSelect.querySelectorAll('option');

		const cartButton = document.querySelector('.cart-count');
		cartButton && cartButton.addEventListener('click', handleCartButton);

		const submitButtons = document.querySelectorAll('.variant-selector__submit');
		submitButtons.forEach((button) => {
			button.addEventListener('click', handleCartButton);
		})

		createIntersectionsObserver();
	});

	/**
	 * Handle the cart/submit buttons click event
	 * When the buttons are pressed we need to wait until flyout element is visible
	 * before injecting the progress bar
	 */
	function handleCartButton(event){
		// Utility method for executing a callback when an element is loaded to the DOM
		// Needs a MAX_TRIES config to avoid setting the timeout indefinitely
		// if the element is never loaded
		const MAX_TRIES = 10;
		let counter = 0;
		const waitForEl = (selector, callback) => {
			const el = document.querySelector(selector);
			if (el) {
				callback(el);
			} else {
				if (counter <= MAX_TRIES) {
					counter++;
					setTimeout(function() {
						waitForEl(selector, callback);
					}, 200);
				}
			}
		};

		waitForEl('.cart__banner', function(el) {
			addProgressBar(el, cartManager.getCart().totalPrice);
			watchCartMain();
		});
	}

})();
