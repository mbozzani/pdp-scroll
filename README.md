### Use Case

As a customer viewing a mobile PDP, when I scroll down the PDP to read additional content, I want to be easily able to add the product to the cart in my desired color and size without having to scroll back up the page.

Also, I want to visually display using a progress bar the discount the customer will get after adding one or more products to the cart.

### Background

A lot of valuable content on the PDP lives below the add to bag button, which can be cumbersome when a user scrolls down the page but then wants to add the product to bag/cart.

### Functional Requirements

- When a user scrolls past the native color/size selector and adds to the bag container, it should stick to the top of their screen and persist as the user scrolls up or down the page. When the user scrolls back into view of the native container, the stickiness should be disabled and it should lock into its normal placement.

- The sticky container should stop sticking once the user scrolls down to product recommendations at the bottom of the PDP.

- Sticky add to bag container should not include the color name or low stock messaging.

- If the user clicks on size or color selector, the drawers should open below, as usual, the Second 'add to bag button' should display when both color and size are selected and one of the drawers is expanded.

- 'Add to bag button' should be disabled if no size is selected (maintain usual behavior).

- When the sticky mode is active, the size swatches shown should be visible multiple of 4. E.g 28 will be visible, and the next one will be 32, and the following 36 and so on

- Once the user clicks on the "Add to Bag" button, the flyout cart opens and displays the products in the cart. Implement a progress bar following the specs in Figma. Don't do any more changes in the cart beside the progress bar.

The progress bar has to be filled according to this logic: 15 $ discount for 100 USD in the cart, 20 $ discount for 150 USD, 30 $ discount for 200 USD and, 50 $ discount for 300 USD.

### Technical Requirements

To avoid any possible issue you should develop the challenge using vanilla js only so the use of external libraries/frameworks is not allowed.

## Running the project

- Install a code injection extension like [User Javascript and CSS to](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld)
- Copy the src/scripts.js and src/styles.css files in the extension and load the PDP page in the browser

-
