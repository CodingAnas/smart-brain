import React, { Component } from 'react'

class Signin extends Component{
	constructor(props)
	{
		super(props);
		this.state = {
			email:'',
			password:'',
		}
	}

	onChangePassword = (event) =>{
		this.setState({password: event.target.value})
	}

	onChangeEmail = (event) =>{
		this.setState({email: event.target.value})
	}

	onSubmitSign = () =>{
		fetch('http://localhost:3000/signin',
		{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
			.then(res => res.json())
			.then(user => {
				if(user.id)
				{
					this.props.loadUser(user);	
					this.props.onRouteChange('home');
				}
			})
	}

	render(){
		return(
			<div className="pt4">
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw8 shadow-5 center">
					<main className=" pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input
					        	onChange = {this.onChangeEmail} 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="email" 
						        name="email-address"  
						        id="email-address"
						        required 
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
					        	onChange = {this.onChangePassword}
						        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="password" 
						        name="password"  
						        id="password"
						        required 
					        />
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
					      	onClick={this.onSubmitSign}
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Sign in" 
					      />
					    </div>
					  </div>
					</main>	
				</article>
			</div>
		);
	}
}

export default Signin;