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
    registerLink.onclick = () => loadRegisterPage();
    loginForm.appendChild(registerLink);
    
    mainContent.appendChild(loginForm);
}