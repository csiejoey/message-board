import React from 'react';
import PropTypes from 'prop-types';
import Reply from './Reply';
import Input from './Input';

const { Component } = React;

class Post extends Component {
	deletePost() {
		const postId = this.props.id;
		this.props.deletePost(postId);
	}

	deleteReply(replyId) {
		const postId = this.props.id;
		this.props.deleteReply(postId, replyId);
	}

	render() {
		// const len = this.props.postBody.reply.length;
		// const replyArr = Array(len).fill().map((x, i) => i);
		// const replyObj = this.props.postBody.reply;

		const replyArr = this.props.postBody.reply;
		// console.log('replyArr: ', replyArr);
		return (
			<div>
				<div>
					<div>{this.props.postBody.username}</div>
					<div>{this.props.postBody.time}</div>
					<div>{this.props.postBody.post}</div>
					<button
						onClick={() => this.deletePost()}>
						deletePost
					</button>
				</div>
					
				{replyArr.map((x, i) =>
					<Reply 
						id={i}
						key={`reply-${i}`}
						replyBody={x}
						deleteReply={replyId => this.deleteReply(replyId)}
					/>,
				)}

				<Input
					username={this.props.postBody.replyNameInput}
					content={this.props.postBody.replyContentInput}
					editPostName={replyName => this.props.editReplyName(this.props.id, replyName)}
					editPostContent={replyContent => this.props.editReplyContent(this.props.id, replyContent)}
					sendContent={() => this.props.sendReply(this.props.id)}
				/>
			</div>
		)
	}
}

Post.propTypes = {
	id: PropTypes.number.isRequired,
	postBody: PropTypes.shape({
		username: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired,
		post: PropTypes.string.isRequired,
		replyNameInput: PropTypes.string.isRequired,
		replyContentInput: PropTypes.string.isRequired,
		reply: PropTypes.arrayOf(
			PropTypes.shape({
				username: PropTypes.string.isRequired,
				time: PropTypes.string.isRequired,
				post: PropTypes.string.isRequired,
			}).isRequired,
		).isRequired,
	}).isRequired,
	editReplyName: PropTypes.func,
	editReplyContent: PropTypes.func,
	sendReply: PropTypes.func,
	deletePost: PropTypes.func,
	deleteReply: PropTypes.func,
}

Post.defaultProps = {
	postBody: {
		replyNameInput: '',
		replyContentInput: '',
	}
}

export default Post;
