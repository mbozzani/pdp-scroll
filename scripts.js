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
		if (!isStickyModeActive) {
			isStickyModeActive = true;
			productForm.classList.add('product__form_sticky');
			variantSelector.classList.add('variant-selector__status-hidden');
			removeSizeSwatches();
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

		createIntersectionsObserver();
	});

})();
