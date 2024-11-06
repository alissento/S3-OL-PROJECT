// TODO make this shit work somehow, maybe move to js sdk instead of amplify or learn some finally some js framework
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: '${aws_region}',
    userPoolId: '${user_pool_id}',
    userPoolWebClientId: '${app_client_id}',
  },
});

async function handleRegister(event) {
    event.preventDefault();
    const firstName = document.querySelector('input[placeholder="First name"]').value;
    const lastName = document.querySelector('input[placeholder="Last name"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const address = document.querySelector('input[placeholder="Address"]').value;
    const phone = document.querySelector('input[placeholder="Phone number"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const repeatPassword = document.querySelector('input[placeholder="Repeat password"]').value;

    if (password !== repeatPassword) {
        window.alert('Passwords do not match!');
        return;
    }

    try {
        const { user } = await Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                given_name: firstName,
                family_name: lastName,
                address: address,
                phone_number: phone
            }
        });
        console.log('User registered:', user);
        window.alert('Registration successful!');
    } catch (error) {
        console.error('Error registering:', error);
        window.alert('Error registering: ' + error.message);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    try {
        const user = await Auth.signIn(email, password);
        console.log('Logged in:', user);
        window.alert('Login successful!');
    } catch (error) {
        console.error('Error logging in:', error);
        window.alert('Error logging in: ' + error.message);
    }
}

document.querySelector('form').addEventListener('submit', (event) => {
    if (event.target.querySelector('button').textContent === 'Register') {
        handleRegister(event);
    } else if (event.target.querySelector('button').textContent === 'Login') {
        handleLogin(event);
    }
});

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

async function loadLoginPage() {
    const mainContent = document.getElementById('main_content');
    mainContent.innerHTML = '';
    mainContent.className = 'flex flex-col items-center text-center m-11';
    
    const loginLabel = document.createElement('h1');
    loginLabel.className = 'text-5xl font-bold text-center mb-8';
    loginLabel.textContent = 'Login Page';
    mainContent.appendChild(loginLabel);

    const loginForm = document.createElement('form');
    loginForm.className = 'flex flex-col items-center text-center m-8';
    const emailInput = document.createElement('input');
    emailInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    emailInput.placeholder = 'Email';
    loginForm.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    passwordInput.placeholder = 'Password';
    loginForm.appendChild(passwordInput);

    const loginButton = document.createElement('button');
    loginButton.className = 'w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3';
    loginButton.textContent = 'Login';
    loginButton.onclick = () => {
        window.alert('Login splaceholder');
    };
    loginForm.appendChild(loginButton);

    const registerLink = document.createElement('p');
    registerLink.className = 'text-4xl mt-16 cursor-pointer';
    registerLink.textContent = 'No account? Register here!';
    registerLink.onclick = () => {
        loadRegisterPage();
    };
    loginForm.appendChild(registerLink);
    
    mainContent.appendChild(loginForm);
}

async function loadRegisterPage() {
    const mainContent = document.getElementById('main_content');
    mainContent.innerHTML = '';
    mainContent.className = 'flex flex-col items-center text-center m-11';
    
    const registerLabel = document.createElement('h1');
    registerLabel.className = 'text-5xl font-bold text-center mb-8';
    registerLabel.textContent = 'Register Page';
    mainContent.appendChild(registerLabel);

    const registerForm = document.createElement('form');
    registerForm.className = 'flex flex-col items-center text-center m-8';

    const firstNameInput = document.createElement('input');
    firstNameInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    firstNameInput.placeholder = 'First name';
    registerForm.appendChild(firstNameInput);

    const lastNameInput = document.createElement('input');
    lastNameInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    lastNameInput.placeholder = 'Last name';
    registerForm.appendChild(lastNameInput);

    const emailInput = document.createElement('input');
    emailInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    emailInput.placeholder = 'Email';
    registerForm.appendChild(emailInput);

    const addressInput = document.createElement('input');
    addressInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    addressInput.placeholder = 'Address';
    registerForm.appendChild(addressInput);

    const phoneInput = document.createElement('input');
    phoneInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    phoneInput.placeholder = 'Phone number';
    registerForm.appendChild(phoneInput);

    const passwordInput = document.createElement('input');
    passwordInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    passwordInput.placeholder = 'Password';
    registerForm.appendChild(passwordInput);
    
    const repeatPasswordInput = document.createElement('input');
    repeatPasswordInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    repeatPasswordInput.placeholder = 'Repeat password';
    registerForm.appendChild(repeatPasswordInput);

    const registerButton = document.createElement('button');
    registerButton.className = 'w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3';
    registerButton.textContent = 'Register';
    registerButton.onclick = () => {
        window.alert('Registration placeholder');
    };
    registerForm.appendChild(registerButton); 

    const loginLink = document.createElement('p');
    loginLink.className = 'text-4xl mt-16 cursor-pointer';
    loginLink.textContent = 'Already have an account? Login here!';
    loginLink.onclick = () => {
        loadLoginPage();
    };
    registerForm.appendChild(loginLink);
    
    mainContent.appendChild(registerForm);
}

