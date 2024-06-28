import React from 'react'

const Navigation = ({onRouteChange, isSignedIn}) => {
	return(isSignedIn === true ?
		(<div>
			<nav style={{display:'flex', justifyContent:'flex-end', paddingRight:'3px'}}>
				<p 
				onClick={() => onRouteChange('signout')} 
				style={{cursor:'pointer', marginRight: "5"}}
				className="f3 grow underline"
				>Sign Out</p>
			</nav>
		</div>
		) :
		(
		<nav style={{display:'flex', justifyContent:'flex-end',paddingRight:'5px'}}>
			<p 
			onClick={() => onRouteChange('signin')} 
			style={{cursor:'pointer', paddingRight:'25px'}}
			className="f3 grow underline"
			>Sign In</p>
			<p 
			onClick={() => onRouteChange('register')} 
			style={{cursor:'pointer', marginRight: "5"}}
			className="f3 grow underline"
			>Register</p>
		</nav>
		)
	);
}

export default Navigation;