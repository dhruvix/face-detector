import React, { useState,useContext } from 'react';
import { AppContext } from '../../App';
import {setUser, setRoute, setSignIn} from '../../global/Reducer';

function Signin() {

  const app = useContext(AppContext);
  const [signInPassword, setPassword] = useState('');
  const [signInEmail, setEmail] = useState('');

  function onEmailChange(event){
    setEmail(event.target.value);
  }

  function onPasswordChange(event){
    setPassword(event.target.value);
  }

  function onSubmitSignIn(){
    console.log(signInEmail);
    console.log("App",app);
    fetch('https://evening-anchorage-72666.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.id){
        app.dispatch(setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }));
        app.dispatch(setRoute('home'));
        app.dispatch(setSignIn());
      }
      else{
        alert("couldn't sign in");
      }
    })
  }

    return (
      <article className="br3 ba b--yellow mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 yellow">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 gold mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy gold f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset b--yellow ba bg-transparent hover-yellow w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy gold f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba b--yellow bg-transparent hover-yellow w-100"
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
                className="b ph3 pv2 input-reset ba gold b--yellow bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => app.dispatch(setRoute('register'))} className="f6 link dim gold db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
}

export default Signin;
