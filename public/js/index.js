
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const loginFormData = new FormData(loginForm);
    const loginPayload = Object.fromEntries(loginFormData);
    fetch("/api/sessions/login", {
      method: "post",
      body: JSON.stringify(loginPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => window.location.href = '/profile');
    loginForm.reset();
  })

  registerForm?.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const registerFormData = new FormData(registerForm);
    const registerPayload = Object.fromEntries(registerFormData);
    fetch("/api/sessions/register", {
      method: "post",
      body: JSON.stringify(registerPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => window.location.href = '/profile');
    registerForm.reset();
  });
  
  const logout = () => {
    window.location.href = '/api/sessions/logout';
  };
