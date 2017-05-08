import React from 'react';
import PropTypes from 'prop-types';
import './../css/main.css';

const { Component } = React;

class Reply extends Component {
	deleteReply() {
		const replyId = this.props.id;
		this.props.deleteReply(replyId);
	}

	render() {
		return (
			<div className='reply'>
				<div>{this.props.replyBody.username}</div>
				<div>{this.props.replyBody.time}</div>
				<div className='contentText'>{this.props.replyBody.post}</div>
				<hr />
				<div className='rmReplyBtn'>
					<button
						onClick={() => this.deleteReply()}>
						x
					</button>
				</div>
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
