class User {
    constructor(email, password, name = '') {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

function showTab(tab) {
    document.getElementById('register-form').style.display = tab === 0 ? 'block' : 'none';
    document.getElementById('login-form').style.display = tab === 1 ? 'block' : 'none';
}

function register() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    if (!email || !password) {
        alert('Заполните email и пароль');
        return;
    }
    const user = new User(email, password, name);
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Регистрация успешна!');
    window.location.href = 'index.html';
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    // Simple check - in real, compare with stored
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser && storedUser.email === email) {  // simplistic
        localStorage.setItem('currentUser', JSON.stringify(storedUser));
        alert('Вход выполнен!');
        window.location.href = 'index.html';
    } else {
        alert('Неверные данные');
    }
}

window.onload = () => {
    updateCartCount();
    updateUserGreeting();
    showTab(0); // default register
};