async function loadStuff(product_tag) {
    // window.history.pushState({}, '', api_route);
    const apiURLTerraform = 'api.nknez.tech';;
    const apiUrl = apiURLTerraform+'/loadProducts' // apiURL based on Terraform output and the API route
    try {
        const response = await fetch(`$${apiUrl}?product_tag=$${product_tag}`, {
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