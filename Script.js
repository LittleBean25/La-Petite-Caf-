function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        alert('Login successful!');
        // Add login functionality here
    } else {
        alert('Please fill in all fields.');
    }
}