// Function to load the products from the API on the website
async function loadStuff(api_route) {
    window.history.pushState({}, '', api_route);
    const apiURLTerraform = '${api_url}'
    const apiUrl = apiURLTerraform+api_route; // apiURL based on Terraform output and the API route
    try {
        const response = await fetch(apiUrl, {
            method: 'GET', // GET request
            headers: 
            {
                'Accept': 'application/json' // Accepting JSON response
            }
        });
    
    const products = await response.json(); // Parsing the JSON response

    const mainContent = document.getElementById('main_content');
    mainContent.innerHTML = '';
    mainContent.className = 'flex justify-center items-start flex-wrap w-full'; // Clearing and formatting the main content in talwindcss
    products.forEach(product => {
        const productDiv = document.createElement('div'); // Creating a div for each product
        productDiv.className = 'flex flex-col items-center text-center m-5'; // Formatting the div

        const img = document.createElement('img');
        img.src = `images/$${product.photoID}`;
        img.alt = product.productLabel;
        img.className = 'h-64 w-56 mb-2.5 rounded-[10%] border-2 border-black cursor-pointer';
        img.onclick = () => loadProductPage(product); // Creating imagine element and adding an onclick event to load the product page

        productDiv.appendChild(img);

        const label = document.createElement('p');
        label.className = 'text-[22px] font-bold text-center';
        label.textContent = product.productLabel;
        productDiv.appendChild(label); // Creating a label element with the product name

        const price = document.createElement('p');
        price.className = 'text-3xl font-bold text-center';
        price.textContent = `$${product.price}€`;
        productDiv.appendChild(price); // Creating a price element with the product price
        mainContent.appendChild(productDiv); // Add everything to the main content
    });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('main_content').textContent = 'Error with fetching.';
    }
}

// Function to load the product page
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
    if(product.productTag == 'kit') {
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
    addToCartButton.onclick = () => {
        window.alert(`$${product.product_id} - $${selectedSize}`); // Temporary alert for the product id and selected size
    };

    productDesc.appendChild(addToCartButton);

    mainContent.appendChild(productDesc);
}

// Function to load the ads from the API on the website
async function loadAds() {
    const apiURLTerraform = '${api_url}'
    const apiUrl = apiURLTerraform+'/'; // apiURL based on Terraform output and the API route

    window.history.pushState({}, '', '/');
    try {
        const response = await fetch(apiUrl, {
            method: 'GET', // GET request
            headers: 
            {
                'Accept': 'application/json' // Accepting JSON response
            }
        });
    
    const ads = await response.json(); // Parsing the JSON response

    const mainContent = document.getElementById('main_content');
    mainContent.className = 'flex justify-center items-center flex-wrap w-full';
    mainContent.innerHTML = ''; // Clearing and formatting the main content

    ads.forEach(ad => { // Creating a div for each ad
        const adDiv = document.createElement('div');
        adDiv.className = 'flex flex-col items-center text-center m-10'; // Creating and formatting the div

        const img = document.createElement('img');
        img.src = `images/$${ad.ad_photo}`;
        img.alt = ad.ad_label;
        img.className = 'h-[422px] w-[352px] mb-2.5 rounded-[10%] border-2 border-black cursor-pointer'; // Creating the image element and formatting it

        adDiv.appendChild(img);

        const label = document.createElement('p');
        label.className = 'text-[26px] font-bold text-center';
        label.textContent = ad.ad_label; // Creating a label element with the ad name
        adDiv.appendChild(label);

        mainContent.appendChild(adDiv); // Add everything to the main content
    });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('ads').textContent = 'Error with fetching.'; // Error message if there is an issue with fetching
    }
}