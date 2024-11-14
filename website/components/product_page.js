async function loadProductPage(product) {

    const mainContent = document.getElementById('main_content');
    mainContent.className = 'flex flex-grow';
    mainContent.innerHTML = ''; // Clearing the main content and formatting it

    const productPhoto = document.createElement('div');
    productPhoto.className = 'flex flex-col w-[50%] items-left text-left m-11 ml-[12%]'; // Creating a div for the product photo

    const img = document.createElement('img');
    img.src = `images/$${product.photoID}`;
    img.alt = product.productLabel;
    img.className = 'h-[95%] w-[85%] rounded-[10%] border-[3px] border-black'; // Creating the image element and formatting it

    productPhoto.appendChild(img);
    mainContent.appendChild(productPhoto);

    const productDesc = document.createElement('div');
    productDesc.className = 'flex flex-col w-[50%] items-center text-center m-11 mr-[12%]'; // Creating a div for the product description

    const label = document.createElement('p');
    label.className = 'text-6xl font-bold text-center';
    label.textContent = product.productLabel; // Creating a label element with the product name
    productDesc.appendChild(label);

    const price = document.createElement('p');
    price.className = 'text-5xl font-bold text-center mt-3';
    price.textContent = `$${product.price}€`; // Creating a price element with the product price
    productDesc.appendChild(price);

    const desc = document.createElement('p');
    desc.className = 'text-2xl mt-10';
    desc.textContent = product.productDescription; // Creating a description element with the product description

    productDesc.appendChild(desc);

    let sizes = [];
    if(product.productTag == 'kits') {
        sizes = ['S', 'M', 'L', 'XL', 'XXL']; // Creating a sizes array for the kits
    }
    else if(product.productTag == 'boots') {
        sizes = [];
        for (let size = 36; size <= 46; size += 0.5) { // Creating a sizes array for the boots
            sizes.push(size.toString());
        }
    }

    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'flex flex-wrap justify-center mt-12'; // Creating a div for the sizes

    let selectedSize = null;

    sizes.forEach((size) => { // Creating a button for each size
        const sizeButton = document.createElement('button');
        sizeButton.className = 'w-16 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-2 ml-1 mr-1';
        sizeButton.textContent = size;
        sizeButton.onclick = () => {
            sizeContainer.querySelectorAll('button').forEach(btn => {
                btn.className = 'w-16 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-2 ml-1 mr-1';
            });
            sizeButton.className = 'w-16 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-2 ml-1 mr-1';
            selectedSize = size;
        };
        sizeContainer.appendChild(sizeButton);
    }); 

    productDesc.appendChild(sizeContainer);

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'mt-8 px-40 py-5 text-5xl bg-blue-700 text-white rounded-lg';
    addToCartButton.textContent = 'ADD TO CART'; // Creating an add to cart button
    addToCartButton.onclick = () => addToCart(product.product_id, selectedSize); // Adding an onclick event to add the product to the cart

    productDesc.appendChild(addToCartButton);

    mainContent.appendChild(productDesc);
}