import React from 'react'

const Rank = ({name, entries}) => {
	return(
		<div>
			<div className="white f3">
				<p style={{margin:"0"}}>{`Hey ${name} your Rank is....`}</p>
			</div>
			<div className="white f1">
				<p style={{margin:"0"}}>{`${entries}`}</p>
			</div>
		</div> 
	);
}

export default Rank;