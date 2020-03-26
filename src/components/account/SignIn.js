import React from 'react';

function Signin({onRouteChange}) {
  
  function onSubmitSignIn() {
          onRouteChange('home');
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
                  className="pa2 input-reset b--yellow ba bg-transparent hover-bg-black hover-yellow w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy gold f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba b--yellow bg-transparent hover-bg-black hover-yellow w-100"
                  type="password"
                  name="password"
                  id="password"
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
              <p  onClick={() => onRouteChange('register')} className="f6 link dim gold db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
}

export default Signin;