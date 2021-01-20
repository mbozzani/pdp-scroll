(function () {

	//
	// Variables
	//
	let productGallery;
	let productForm;
	let variantSelector;

	let productRecommendations;
	let isStickyModeActive = false;

	let selectSizeSwatches;
	let initialSizeSwatchesOptions = [];


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
		}
	}

	const removeSizeSwatches = () => {
		selectSizeSwatches.options.forEach((option) => {
			const value = parseInt(option.value.trim());
			if (!isNaN(value) && value%4 !== 0) {
				option.remove();
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
		
		selectSizeSwatches = document.querySelector('.variant-selector__options select');
		initialSizeSwatchesOptions = selectSizeSwatches.options;

		createIntersectionsObserver();
	});

})();
