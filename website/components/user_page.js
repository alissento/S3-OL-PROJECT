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
    signOutButton.onclick = () => signOut();
    
    mainContent.appendChild(signOutButton);
}