import React from 'react';

function Register({onRouteChange}) {
  
  function onSubmitSignIn() {
          onRouteChange('home');
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
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy gold f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset b--yellow ba bg-transparent hover-bg-transparent hover-yellow w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 gold" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset b--yellow ba bg-transparent hover-bg-transparent hover-yellow w-100"
                  type="password"
                  name="password"
                  id="password"
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