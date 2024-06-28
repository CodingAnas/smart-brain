import React from 'react'
import './Linkform.css'

const Linkform = ({onInput, onSubmit}) => {

	return(
		<div className="w-60 center">
			<p>{'Enter Link to Image'}</p>
			<div className="form pa4 br3 shadow-5 center">
				<input className="w-70" type="text" onChange={onInput}/>
				<button style={{cursor:'pointer'}}className="w-30 bg-light-purple grow" onClick={onSubmit}>Detect</button>
			</div>
		</div>
	);
}

export default Linkform;