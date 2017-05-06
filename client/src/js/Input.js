import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
	return (
		<div>
			<input
				placeholder='username: '
				value={props.username}
				onChange={e => props.editPostName(e.target.value)}
			/>
			<input
				placeholder='content: '
				value={props.content}
				onChange={e => props.editPostContent(e.target.value)}
			/>
			<button
				onClick={() => props.sendContent()}>
				send
			</button>
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
