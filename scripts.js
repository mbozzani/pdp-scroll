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

	let cartButton;

	//
	// Methods
	//
	const createIntersectionsObserver = () => {
		let observer;
		const options = {
			threshold: 0.1
		};
	
		observer = new IntersectionObserver(handleIntersections, options);
		observer.observe(productRecommendations);
		observer.observe(productGallery);
	}

	const handleIntersections = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// if productGallery or productRecommendations are visible (in viewport)
				// remove sticky feature
				removeFormSticky();
			} else {
				makeFormSticky();
			}
		});
	}

	const makeFormSticky = () => {
		const windowInnerWidth  = document.documentElement.clientWidth;
		if (windowInnerWidth < 1024) {
			if (!isStickyModeActive) {
				isStickyModeActive = true;
				productForm.classList.add('product__form_sticky');
				variantSelector.classList.add('variant-selector__status-hidden');
				removeSizeSwatches();
			}
		}
	}
	
	const removeFormSticky = () => {
		if (isStickyModeActive) {
			isStickyModeActive = false;
			productForm.classList.remove('product__form_sticky');
			variantSelector.classList.remove('variant-selector__status-hidden');
			restoreSizeSwatches();
		}
	}

	const removeSizeSwatches = () => {
		const sizeSwatchesOptions = sizeSwatchesSelect.querySelectorAll('option');
		sizeSwatchesOptions.forEach((option) => {
			const value = parseInt(option.value.trim());
			// If size swatch if not multiple of 4, remove it
			if (!isNaN(value) && value%4 !== 0) {
				option.remove();
			}
		});
	}

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

	const addProgressBar = (parent, cartTotal) => {
		const discounts = ['$15 off', '$20 off', '$30 off', '$50 off'];
		const amounts = [100, 150, 200, 300];

		const progressDiv = document.createElement('div');
		progressDiv.classList.add('progress-bar');
		const ul = document.createElement('ul');

		for (var i = 0; i < discounts.length; i++) {
			const li = document.createElement('li');
			const span = document.createElement('span');
			span.appendChild(document.createTextNode(discounts[i]));

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

			li.appendChild(span);
			ul.appendChild(li);
		}

		progressDiv.appendChild(ul);
		parent.appendChild(progressDiv);
	}


	//
	// Inits & Event Listeners
	//
	window.addEventListener('load', (event) => {
		productGallery = document.querySelector('.product__gallery');
		productRecommendations = document.querySelector('.product-recommendations');
		productForm = document.querySelector('.product__form');
		variantSelector = document.querySelector('.variant-selector__status');
		sizeSwatchesSelect = document.querySelector('.variant-selector__options select');
		initialSizeSwatchesOptions = sizeSwatchesSelect.querySelectorAll('option');
		cartButton = document.querySelector('.cart-count');
		cartButton.addEventListener('click', handleCartButton);
		createIntersectionsObserver();
	});

	function handleCartButton(event){
		const waitForEl = (selector, callback) => {
			const el = document.querySelector(selector);
			if (el) {
				callback(el);
			} else {
				setTimeout(function() {
					waitForEl(selector, callback);
				}, 100);
			}
		};

		waitForEl('.cart__banner', function(el) {
			const cartTotal = cartManager.getCart().totalPrice;
			addProgressBar(el, cartTotal);
		});
	}


})();
