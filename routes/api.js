const express = require('express');
const router = express.Router();

// post & reply
// default contents on board
let comments = [
{
	username: 'postuser1', 
	time: '06.05.2017, 10:55',
	post: 'test',
	replyNameInput: '',
	replyContentInput: '',
	reply: [{
		username: 'replyuser1',
		time: '06.05.2017, 10:59',
		post: 'zzz',
	}, {
		username: 'replyuser2',
		time: '06.05.2017, 11:02',
		post: 'eeee',
	}],
}, {
	username: 'postuser2', 
	time: '06.05.2017, 10:55',
	post: 'ayy',
	replyNameInput: '',
	replyContentInput: '',
	reply: [{
		username: 'replyuser3',
		time: '06.05.2017, 10:59',
		post: 'yo',
	}, {
		username: 'replyuser4',
		time: '06.05.2017, 11:02',
		post: 'n',
	}],
}];

router.get('/', (req, res) => {
	res.json(comments);
});

router.post('/post', (req, res) => {
	const postContent = req.body;
	const t = new Date();
	const time = `${(t.getDate() > 10) ? '' : '0'}${t.getDate()}.${(t.getMonth() + 1 > 10) ? '' : '0'}${t.getMonth() + 1}.${t.getFullYear()}, ${(t.getHours() > 10) ? '' : '0'}${t.getHours()}:${(t.getMinutes() > 10) ? '' : '0'}${t.getMinutes()}`;
	const newComment = {
		// can i add id when render-mapping? 
		username: postContent.usernameInput,
		time,
		post: postContent.contentInput,
		reply: [],
	}
	comments = comments.concat(newComment);
	// should i use send or json? if i json, then i needn't parse??
	res.json(comments);
});

router.post('/reply/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);	// 十進位
	const replyContent = req.body;
	const t = new Date();
	const time = `${(t.getDate() > 10) ? '' : '0'}${t.getDate()}.${(t.getMonth() + 1 > 10) ? '' : '0'}${t.getMonth() + 1}.${t.getFullYear()}, ${(t.getHours() > 10) ? '' : '0'}${t.getHours()}:${(t.getMinutes() > 10) ? '' : '0'}${t.getMinutes()}`;
	const newReply = {
		username: replyContent.replyNameInput,
		time,
		post: replyContent.replyContentInput,
	}
	comments[id].reply = comments[id].reply.concat(newReply);
	res.json(newReply);
});

router.post('/rmpost/:postid', (req, res) => {
	const id = parseInt(req.params.postid, 10);
	comments.splice(id, 1);
	res.json(comments);
});

router.post('/rmreply/:postid/:replyid', (req, res) => {
	const postId = parseInt(req.params.postid, 10);
	const replyId = parseInt(req.params.replyid, 10);
	comments[postId].reply.splice(replyId, 1);
	res.json(comments);
})

module.exports = router;
