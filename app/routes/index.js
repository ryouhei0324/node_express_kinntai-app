const express = require('express');
const router = express.Router();
const knex = require("../db/knex");

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
const isAuth = Boolean(userId);
console.log(isAuth);
  res.render('index', {
    title: userId,
    isAuth: isAuth,
  });
});





    router.post('/', function (req, res, next) {
        const userId = req.session.userid;
const comment = req.body.comment;
const day = req.body.reportDate
const start = req.body.startTime
const end = req.body.endTime
const isAuth = Boolean(userId);
console.log(day);
        knex('reports')
          .insert({user_id: userId, comments: comment, Date:day, startTime:start,endTime:end})
          .then(function () {
              console.log('できた');
            res.redirect('/List')
          })
          .catch(function (err) {
            console.error(err);
            res.render('index', {
              title: 'ToDo App',
              isAuth: isAuth,
            });
          });
      });


router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));
// router.use('/mail', require('./mail'));
// router.use('/top', require('./top'));
router.use('/List', require('./List'));


module.exports = router;