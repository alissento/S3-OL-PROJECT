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
    loginLink.onclick = () => loadLoginPage();
    registerForm.appendChild(loginLink);
    
    mainContent.appendChild(registerForm);
}