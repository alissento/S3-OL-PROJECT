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


async function signOut() {
    try {
        await firebase.auth().signOut();
        alert('Signed out successfully');
        loadLoginPage();
    } catch (error) {
        console.error('Error:', error);
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

async function addToCart(product_id, size) {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert('Please log in to add items to your cart.');
        return;
    }

    const apiURLTerraform = '${api_url}';
    const apiUrl = apiURLTerraform+'/addToCart';

    const requestData = {
        user_id: user.uid,
        product_id: product_id,
        size: size
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to add item to cart');
        }

        alert('Item added to cart successfully');
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}

async function loadCart() {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert('Please log in to view your cart.');
        return;
    }

    const apiURLTerraform = '${api_url}';
    const apiUrl = apiURLTerraform+'/loadCart';

    try {
        const response = await fetch(`$${apiUrl}?user_id=$${user.uid}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }

        const cartItems = await response.json();

        if (cartItems.length <= 0) {
            alert('Your cart is empty');
            return;
        }
        
        displayCart(cartItems, user.uid);

    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}

async function clearCart(user_id) {
    const apiURLTerraform = '${api_url}';
    const apiUrl = apiURLTerraform+'/clearCart';

    const requestData = {
        user_id: user_id,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to clear cart');
        }

        alert('Cart cleared successfully');
        loadAds();
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}
