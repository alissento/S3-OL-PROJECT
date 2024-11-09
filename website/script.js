const firebaseConfig = {
    apiKey: "AIzaSyCDVLpCzDVNuDgjaQ3GMbjcwYtSZprxNdI",
    authDomain: "fb4u-2e88b.firebaseapp.com",
    projectId: "fb4u-2e88b",
    storageBucket: "fb4u-2e88b.firebasestorage.app",
    messagingSenderId: "969831689978",
    appId: "1:969831689978:web:1d68182bc558765be86343"
};

const app = firebase.initializeApp(firebaseConfig);

async function signIn(email, password) {
    try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        alert('Logged in successfully');
        getUserData(user.user.uid);
    } catch (error) {
        if (error.code === 'auth/invalid-login-credentials') {
            alert('Invalid email or password');
        }
        else {
            console.error('Error:', error);
        }
    }
}


async function registerIn(firstName, lastName, email, streetName, city, postalCode, country, phone, password) {
    try {
        const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = newUser.user;
        storeUserDetails(user.uid, firstName, lastName, email, streetName, city, postalCode, country, phone);
        alert('Registered successfully');
        loadLoginPage();
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Email is already in use');
        }
        else {
            console.error('Error:', error);
        }
    }
    
}

async function storeUserDetails(uid, firstName, lastName, email, streetName, city, postalCode, country, phone) {
    const requestData = {
        user_id: uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        streetName: streetName,
        city: city,
        postalCode: postalCode,
        country: country,
        phoneNumber: phone
    };

    const apiURLTerraform = '${api_url}';
    const apiUrl = apiURLTerraform+'/storeUserData';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add an authorization token if needed
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to store user details');
        }

        console.log('User details stored successfully');
    } catch (error) {
        console.error('Error storing user details:', error);
    }
}

async function getUserData(userId) {
    const apiURLTerraform = '${api_url}';
    const apiUrl = apiURLTerraform+'/getUserData';
    try {
        const response = await fetch(`$${apiUrl}?user_id=$${userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const userData = await response.json();
        console.log(userData);
        displayUserPage(userData);

    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

async function displayUserPage(userData) {

    email = userData.email;
    firstName = userData.first_name;
    lastName = userData.last_name;
    streetName = userData.street_name;
    city = userData.city;
    postalCode = userData.postal_code;
    country = userData.country;
    phoneNumber = userData.phone_number;

    const mainContent = document.getElementById('main_content');
    mainContent.innerHTML = '';
    mainContent.className = 'flex flex-col items-center text-center m-11';

    const userLabel = document.createElement('h1');
    userLabel.className = 'text-5xl font-bold text-center mb-8';
    userLabel.textContent = firstName + ' ' + lastName;
    mainContent.appendChild(userLabel);

    const emailLabel = document.createElement('p');
    emailLabel.className = 'text-3xl text-center';
    emailLabel.textContent = email;
    mainContent.appendChild(emailLabel);

    const addressLabel = document.createElement('p');
    addressLabel.className = 'text-3xl text-center';
    addressLabel.textContent = streetName + ', ' + city + ', ' + postalCode + ', ' + country;
    mainContent.appendChild(addressLabel);

    const phoneLabel = document.createElement('p');
    phoneLabel.className = 'text-3xl text-center';
    phoneLabel.textContent = phoneNumber;
    mainContent.appendChild(phoneLabel);
    
    const ordersButton = document.createElement('button');
    ordersButton.className = 'w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3';
    ordersButton.textContent = 'My orders';
    ordersButton.onclick = () => {
        alert('My orders page is under construction');
    };
    mainContent.appendChild(ordersButton);

    const changeDetailsButton = document.createElement('button');
    changeDetailsButton.className = 'w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3';
    changeDetailsButton.textContent = 'Change details';
    changeDetailsButton.onclick = () => {
        alert('Change details page is under construction');
    };
    mainContent.appendChild(changeDetailsButton);
    
    const signOutButton = document.createElement('button');
    signOutButton.className = 'w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3';
    signOutButton.textContent = 'Sign Out';
    signOutButton.onclick = () => {
        signOut();
    };
    mainContent.appendChild(signOutButton);
}

async function signOut() {
    try {
        await firebase.auth().signOut();
        alert('Signed out successfully');
        loadLoginPage();
    } catch (error) {
        console.error('Error:', error);
    }
}
// Function to load the products from the API on the website
async function loadStuff(api_route) {
    window.history.pushState({}, '', api_route);
    const apiURLTerraform = '${api_url}';
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

async function checkLogin() {
    // Explicitly check if the user is logged in
    const user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
        // User is logged in, proceed with user page
        getUserData(user.uid);
    } else {
        // User is not logged in, redirect to login page
        loadLoginPage();
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
    emailInput.type = 'email';
    emailInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    emailInput.placeholder = 'Email';
    loginForm.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    passwordInput.placeholder = 'Password';
    loginForm.appendChild(passwordInput);

    const loginButton = document.createElement('button');
    loginButton.type = 'button';
    loginButton.className = 'w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3';
    loginButton.textContent = 'Login';
    loginButton.onclick = () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!email || !password) {
            alert('Please fill in both email and password.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        signIn(email, password);
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
    emailInput.type = 'email';
    emailInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    emailInput.placeholder = 'Email';
    registerForm.appendChild(emailInput);

    const streetNameInput = document.createElement('input');
    streetNameInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    streetNameInput.placeholder = 'Street name';
    registerForm.appendChild(streetNameInput);

    const cityInput = document.createElement('input');
    cityInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    cityInput.placeholder = 'City';
    registerForm.appendChild(cityInput);

    const postalCodeInput = document.createElement('input');
    postalCodeInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    postalCodeInput.placeholder = 'Postal code';
    registerForm.appendChild(postalCodeInput);

    const countryInput = document.createElement('input');
    countryInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    countryInput.placeholder = 'Country';
    registerForm.appendChild(countryInput);

    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    phoneInput.placeholder = 'Phone number';
    registerForm.appendChild(phoneInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    passwordInput.placeholder = 'Password';
    registerForm.appendChild(passwordInput);
    
    const repeatPasswordInput = document.createElement('input');
    repeatPasswordInput.type = 'password';
    repeatPasswordInput.className = 'w-96 h-12 text-2xl border-2 border-gray-300 rounded-lg cursor-pointer mt-3 text-center';
    repeatPasswordInput.placeholder = 'Repeat password';
    registerForm.appendChild(repeatPasswordInput);

    const registerButton = document.createElement('button');
    registerButton.type = 'button';
    registerButton.className = 'w-96 h-12 text-2xl border-2 border-black rounded-lg cursor-pointer mt-3';
    registerButton.textContent = 'Register';
    registerButton.onclick = () => {
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const email = emailInput.value;
        const streetName = streetNameInput.value;
        const city = cityInput.value;
        const postalCode = postalCodeInput.value;
        const country = countryInput.value;
        const phone = phoneInput.value;
        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;

        if (!firstName || !lastName || !email || !streetName || !postalCode || !city || !country || !phone || !password || !repeatPassword) {
            alert('Please fill in all fields.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password !== repeatPassword) {
            alert('Passwords do not match.');
            return;
        }

        registerIn(firstName, lastName, email, streetName, city, postalCode, country, phone, password);
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

