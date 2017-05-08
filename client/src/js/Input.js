import React from 'react';
import PropTypes from 'prop-types';
import './../css/main.css';

function Input(props) {
	return (
		<div className='input'>
			<textarea
				placeholder='Benutzername: '
				cols='18'
				value={props.username}
				onChange={e => props.editPostName(e.target.value)}
			/>
			<textarea
				placeholder='Beitrag: '
				cols='60'
				value={props.content}
				onChange={e => props.editPostContent(e.target.value)}
			/>
			<div
				className='inputBtn'
				onClick={() => props.sendContent()}>
				schicken
			</div>
		</div>
	)
}

Input.propTypes = {
	username: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	editPostName: PropTypes.func,
	editPostContent: PropTypes.func,
	sendContent: PropTypes.func,
}

Input.defaultProps = {
	username: '',
	content: '',
}

export default Input;
