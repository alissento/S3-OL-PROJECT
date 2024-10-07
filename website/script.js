async function loadStuff(api_route) {
    window.history.pushState({}, '', api_route);
    const apiURLTerraform = '${api_url}'
    const apiUrl = apiURLTerraform+api_route;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json'
            }
        });
    
    const products = await response.json();

    const mainContent = document.getElementById('main_content');
    mainContent.innerHTML = '';
    mainContent.className = 'flex justify-center items-start flex-wrap w-full';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'flex flex-col items-center text-center m-5';

        const img = document.createElement('img');
        img.src = `images/$${product.photoID}`;
        img.alt = product.productLabel;
        img.className = 'h-64 w-56 mb-2.5 rounded-[10%] border-2 border-black cursor-pointer';
        img.onclick = () => loadProductPage(product);

        productDiv.appendChild(img);

        const label = document.createElement('p');
        label.className = 'text-2xl font-bold text-center';
        label.textContent = product.productLabel;
        productDiv.appendChild(label);

        const price = document.createElement('p');
        price.className = 'text-3xl font-bold text-center';
        price.textContent = `$${product.price}€`;
        productDiv.appendChild(price);
        mainContent.appendChild(productDiv);
    });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('main_content').textContent = 'Error with fetching.';
    }
}

async function loadProductPage(product) {

    const mainContent = document.getElementById('main_content');
    mainContent.className = 'flex';
    mainContent.innerHTML = '';

    const productPhoto = document.createElement('div');
    productPhoto.className = 'flex flex-col w-[50%] items-left text-left m-11 ml-32';

    const img = document.createElement('img');
    img.src = `images/$${product.photoID}`;
    img.alt = product.productLabel;
    img.className = 'h-[623px] w-[529px] rounded-[10%] border-[3px] border-black';

    productPhoto.appendChild(img);

    mainContent.appendChild(productPhoto);    

    const productDesc = document.createElement('div');
    productDesc.className = 'flex flex-col w-[50%] items-center text-center m-11 mr-32';

    const label = document.createElement('p');
    label.className = 'text-6xl font-bold text-center';
    label.textContent = product.productLabel;

    productDesc.appendChild(label);

    const price = document.createElement('p');
    price.className = 'text-5xl font-bold text-center mt-3';
    price.textContent = `$${product.price}€`;
    productDesc.appendChild(price);

    const desc = document.createElement('p');
    desc.className = 'text-2xl mt-10';
    desc.textContent = product.productDescription;

    productDesc.appendChild(desc);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'flex space-x-4 mt-16';

    sizes.forEach(size => {
        const sizeButton = document.createElement('button');
        sizeButton.className = 'px-8 py-3 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer';
        sizeButton.textContent = size;
        sizeButton.onclick = () => {
            // TODO logic for selecting size
            sizeButton.className = 'px-8 py-3 text-2xl border-2 border-black rounded-lg cursor-pointer';
        };
        sizeContainer.appendChild(sizeButton);
    });

    productDesc.appendChild(sizeContainer);

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'mt-8 px-40 py-5 text-5xl bg-blue-700 text-white rounded-lg';
    addToCartButton.textContent = 'ADD TO CART';
    addToCartButton.onclick = () => {
        // TODO logic
    };

    productDesc.appendChild(addToCartButton);

    mainContent.appendChild(productDesc);
}