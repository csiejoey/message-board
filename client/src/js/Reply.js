import React from 'react';
import PropTypes from 'prop-types';

const { Component } = React;

class Reply extends Component {
	deleteReply() {
		const replyId = this.props.id;
		this.props.deleteReply(replyId);
	}

	render() {
		return (
			<div>
				<div>{this.props.replyBody.username}</div>
				<div>{this.props.replyBody.time}</div>
				<div>{this.props.replyBody.post}</div>
				<button
					onClick={() => this.deleteReply()}>
					deleteReply
				</button>
			</div>
		)
	}
}

Reply.propTypes = {
	replyBody: PropTypes.shape({
		username: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired,
		post: PropTypes.string.isRequired,
	}).isRequired,
	id: PropTypes.number.isRequired,
	deleteReply: PropTypes.func,
}

export default Reply;
