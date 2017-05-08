const express = require('express');
const router = express.Router();

// post & reply
// default contents on board
let comments = [
{
	username: 'Joey', 
	time: '06.05.2017, 10:55',
	post: 'Wie kann man mithilfe von Javascript eine CSS-Class bearbeiten, also, dass man z.B. einigen <p> eine Class gibt und jenachdem, was man bei einem Input eingibt und man auf den Button klickt, ändert sich die color-Eigenschaft dieser Klasse?',
	replyNameInput: '',
	replyContentInput: '',
	reply: [{
		username: 'Kelvin',
		time: '06.05.2017, 10:59',
		post: 'Geht zum Beispiel mit .setAttribute("class", "deineKlasse") oder .className = "deineKlasse". Wenn du da mehrere Klassen drin stehen hast, und nur eine einzige austauschen willst, kannst du sie vorher mit .getAttribute("class") oder .className holen und dann die betreffende Klasse ersetzen.',
	}, {
		username: 'Anonymous',
		time: '06.05.2017, 11:02',
		post: 'Werbung',
	}],
}, {
	username: 'Joey', 
	time: '06.05.2017, 10:55',
	post: 'Hallo liebes Forum, ich habe folgendes Problem: Ich habe auf meiner Website ein Datumsrechner (Php) eingebunden und möchte jetzt, dass das errechnete Datum in einem Kalender angezeigt wird. Folgendes Beispiel: Datum: 01.01.2016-02.01.201 Zeitspanne: 10 Tag Ausgegebener Wert: 11.01.2016-12.01.201 Wie kann ich den ausgebennen Wert in einen Kalender einfügen, sodass die Tage 11.01.2016-12.01.2016 dort markiert werden?',
	replyNameInput: '',
	replyContentInput: '',
	reply: [{
		username: 'Kelvin',
		time: '06.05.2017, 10:59',
		post: 'Welchen Kalender verwendest Du?',
	}, {
		username: 'Joey',
		time: '06.05.2017, 11:02',
		post: 'Google',
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
