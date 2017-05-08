import React from 'react';
import Post from './Post';
import Input from './Input';
import './../css/main.css';

const { Component } = React;

class Forum extends Component {
	constructor() {
		super();
		this.state = {
			comments: [],
			usernameInput: '',
			contentInput: '',
		}
	}

	componentDidMount() {
		fetch('/api')
			.then(res => res.json())
			.then(defaultComments => {
				let comments = defaultComments;
				comments = comments.map(comment => {
					// try: can i simply reset 'comment'?
					const newComment = comment;
					newComment.replyNameInput = '';
					newComment.replyContentInput = '';
					return newComment;
				});
				return this.setState({ comments });
			})
			.catch(err => console.error(err));
	}

	sendPost() {
		const { usernameInput, contentInput } = this.state;
		const t = new Date();
		const time = `${(t.getDate() > 10) ? '' : '0'}${t.getDate()}.${(t.getMonth() + 1 > 10) ? '' : '0'}${t.getMonth() + 1}.${t.getFullYear()}, ${(t.getHours() > 10) ? '' : '0'}${t.getHours()}:${(t.getMinutes() > 10) ? '' : '0'}${t.getMinutes()}`;
		fetch('/api/post', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			// why stringify
			body: JSON.stringify({
				usernameInput,
				contentInput,
				time,
			}),
		})
		.then(res => res.json())
		.then(newComment => {
			const comments = newComment;
			this.setState({
				comments,
				usernameInput: '',
				contentInput: '',
				replyNameInput: '',
				replyContentInput: '',
			});
		})
		.catch(err => console.error(err));
	}

	sendReply(postId) {
		const { comments } = this.state;
		const replyNameInput = comments[postId].replyNameInput;
		const replyContentInput = comments[postId].replyContentInput;
		const t = new Date();
		const time = `${(t.getDate() > 10) ? '' : '0'}${t.getDate()}.${(t.getMonth() + 1 > 10) ? '' : '0'}${t.getMonth() + 1}.${t.getFullYear()}, ${(t.getHours() > 10) ? '' : '0'}${t.getHours()}:${(t.getMinutes() > 10) ? '' : '0'}${t.getMinutes()}`;
		fetch(`/api/reply/${postId}`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				replyNameInput,
				replyContentInput,
				time,
			}),
		})
		.then(res => res.json())
		.then(newReply => {
			comments[postId].reply = comments[postId].reply.concat(newReply);
			comments[postId].replyNameInput = '';
			comments[postId].replyContentInput = '';
			this.setState({
				comments,
			});
		})
		.catch(err => console.error(err));
	}

	deletePost(postId) {
		fetch(`/api/rmpost/${postId}`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
		.then(res => res.json())
		.then(newComment => {
			const comments = newComment;
			this.setState({
				comments,
			});
		})
		.catch(err => console.error(err));
	}

	deleteReply(postId, replyId) {
		fetch(`/api/rmreply/${postId}/${replyId}`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
		.then(res => res.json())
		.then(newComment => {
			const comments = newComment;
			this.setState({
				comments,
			});
		})
		.catch(err => console.error(err));
	}

	editPostName(postName) {
		const usernameInput = postName;
		this.setState({
			usernameInput,
		});
	}

	editPostContent(postContent) {
		const contentInput = postContent;
		this.setState({
			contentInput,
		});
	}

	editReplyName(postId, replyName) {
		const { comments } = this.state;
		comments[postId].replyNameInput = replyName;
		this.setState({
			comments,
		});
	}

	editReplyContent(postId, replyContent) {
		const { comments } = this.state;
		comments[postId].replyContentInput = replyContent;
		this.setState({
			comments,
		});
	}

	forum() {
		// const len = this.state.comments.length;
		// const postArr = Array(len).fill().map((x, i) => i);
		// const postObj = JSON.parse(this.state.comments);

		// if i don't fill()?
		const postArr = this.state.comments;
		// console.log('postArr: ', postArr);
		return (
			<div>
				{postArr.map((x, i) =>
					<Post
						id={i}
						key={`post-${i}`}
						postBody={x}
						editReplyName={(postId, replyName) => this.editReplyName(postId, replyName)}
						editReplyContent={(postId, replyContent) => this.editReplyContent(postId, replyContent)}
						sendReply={postId => this.sendReply(postId)}
						deletePost={postId => this.deletePost(postId)}
						deleteReply={(postId, replyId) => this.deleteReply(postId, replyId)}
					/>)
				}
				<div className='newPost'>neu Diskussion</div>
				<Input
					username={this.state.usernameInput}
					content={this.state.contentInput}
					editPostName={postName => this.editPostName(postName)}
					editPostContent={postContent => this.editPostContent(postContent)}
					sendContent={() => this.sendPost()}
				/>
			</div>
		)
	}

	render() {
		return (
			<div className='forumContainer'>
				<div className='forum'>
				<div className='title'>das Forum</div>
					{this.forum()}
				</div>
			</div>
		)
	}
}

export default Forum;
