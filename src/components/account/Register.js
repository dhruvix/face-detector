import React, { useState } from 'react';

function Register({onRouteChange,loadUser}) {
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  function onEmailChange(event){
    setEmail(event.target.value);
  }

  function onPasswordChange(event){
    setPassword(event.target.value);
  }

  function onNameChange(event){
    setName(event.target.value);
  }

  function onSubmitSignIn(){
    console.log(email,password,name);
    fetch('https://evening-anchorage-72666.herokuapp.com//register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
    .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        }
      })
  }

    return (
      <article className="br3 ba b--yellow mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 yellow">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 gold mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy gold f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba b--yellow bg-transparent hover-bg-transparent hover-yellow w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy gold f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset b--yellow ba bg-transparent hover-bg-transparent hover-yellow w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 gold" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset b--yellow ba bg-transparent hover-bg-transparent hover-yellow w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--yellow gold bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
}

export default Register;