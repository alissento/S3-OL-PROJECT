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

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const img = document.createElement('img');
        img.src = `images/$${product.photoID}`;
        img.alt = product.teamLabel;
        img.onclick = () => loadProductPage(product.product_id);

        productDiv.appendChild(img);

        const label = document.createElement('p');
        label.className = 'teamLabel';
        label.textContent = product.teamLabel;
        productDiv.appendChild(label);

        const price = document.createElement('p');
        price.className = 'priceLabel';
        price.textContent = `$${product.price}€`;
        productDiv.appendChild(price);
        mainContent.appendChild(productDiv);
    });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('main_content').textContent = 'Error with fetching.';
    }
}

async function loadProductPage(product_id) {
    window.alert(product_id);
}