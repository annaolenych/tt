import React, { useState } from 'react';
import './LoginForm.css';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Додайте логіку авторизації тут, наприклад, відправка запиту на сервер
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" className="input-field" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" className="input-field" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );

};

export default LoginForm;