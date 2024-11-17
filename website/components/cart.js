export async function displayCart(cartItems, user_id) {
    const mainContent = document.getElementById('main_content');
    mainContent.innerHTML = '';
    mainContent.className = 'flex flex-col items-center text-center m-11';

    const cartLabel = document.createElement('h1');
    cartLabel.className = 'text-5xl font-bold text-center mb-8';
    cartLabel.textContent = 'Cart';
    mainContent.appendChild(cartLabel);

    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.className = 'flex flex-col items-center text-center w-96';
    cartItems.forEach(cartItem => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'flex flex-row items-center justify-between w-full border-b-2 border-gray-300';

        const productLabel = document.createElement('p');
        productLabel.className = 'text-2xl';
        productLabel.textContent = cartItem.productLabel;
        cartItemDiv.appendChild(productLabel);

        const sizeLabel = document.createElement('p');
        sizeLabel.className = 'text-2xl';
        sizeLabel.textContent = cartItem.size;
        cartItemDiv.appendChild(sizeLabel);

        const priceLabel = document.createElement('p');
        priceLabel.className = 'text-2xl';
        priceLabel.textContent = `$${cartItem.price}€`;
        cartItemDiv.appendChild(priceLabel);

        cartItemsContainer.appendChild(cartItemDiv);
    });

    mainContent.appendChild(cartItemsContainer);

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    const totalPriceLabel = document.createElement('p');
    totalPriceLabel.className = 'text-3xl font-bold mt-8';
    totalPriceLabel.textContent = `Total Price: $${totalPrice}€`;
    mainContent.appendChild(totalPriceLabel);

    const checkoutButton = document.createElement('button');
    checkoutButton.className = 'w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3';
    checkoutButton.textContent = 'Checkout';
    checkoutButton.onclick = () => alert('Checkout page is under construction');
    mainContent.appendChild(checkoutButton);

    const clearCartButton = document.createElement('button');
    clearCartButton.className = 'w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3';
    clearCartButton.textContent = 'Clear Cart';
    clearCartButton.onclick = () => clearCart(user_id);

    
    mainContent.appendChild(clearCartButton);
}