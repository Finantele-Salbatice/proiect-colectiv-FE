import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div controlId="email" bsSize="large">
          <label>Email</label>
          <input
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div controlId="password" bsSize="large">
          <label>Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className="buttonLogin">
            <button block bsSize="large" disabled={!validateForm()} type="submit">
            Login
            </button>
        </div>
        <div class="forgotPass">
			<a class="txt1" href="#">
				Forgot Password?
			</a>
		</div>
      </form>
    </div>
  );
}