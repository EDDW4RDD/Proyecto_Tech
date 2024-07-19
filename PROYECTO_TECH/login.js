document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        const Users = JSON.parse(localStorage.getItem('users')) || []
        const validUser = Users.find(user => user.email === email && user.password === password)
        if (!validUser) {
            return alert('Datos INCORRECTOS !!')
        }
        alert(`Ingreso exitoso, BIENVENIDO ${validUser.name} !!`)
        localStorage.setItem('login_success', JSON.stringify(validUser))
        window.location.href = 'Index.html'
    })

    const loggedInUser = JSON.parse(localStorage.getItem('login_success'))
    if (loggedInUser) {
        const welcomeMessage = document.querySelector('#welcome-message')
        const userNameElement = document.querySelector('#user-name')
        const loginLink = document.querySelector('#login-link')

        userNameElement.textContent = loggedInUser.name
        welcomeMessage.style.display = 'block'
        loginLink.style.display = 'none'
    }
})
