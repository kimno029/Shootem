var express = require('express');
var router = express.Router();

var todoItems = [
	{id: 1, desc: 'foo'},
	{id: 2, desc: 'bas'},
	{id: 3, desc: 'bar'}
];
router.get('/', function (req, res){
	// res.send('Hello express!: ' + req.);
	res.render('index',{
		title:'Index title',
		items: todoItems
	});
});

// router.get('/add', function(req, res) {
// 	var newItem = req.body.in1;
// 	if (newItem) {
// 		todoItems.push({
// 			id: todoItems.length + 1,
// 			desc: newItem
// 		});
// 	}
// 	res.redirect('/');
// });

module.exports = router;