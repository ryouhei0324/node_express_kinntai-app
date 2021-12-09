const express = require('express');
const router = express.Router();
const knex = require("../db/knex");


let mails=[]
router.get('/', function (req, res, next) {
    const userId = req.session.userid;
  const isAuth = Boolean(userId);
    knex("reports")
      .select("*")
      .then(function (results) {
        console.log(results);
        mails=results
        // main()
        res.render('List', {
          title: '一覧',
          comments: results.comments,
          isAuth: isAuth,
          reslut:results

        });
        
      })
    
      .catch(function (err) {
        console.error(err);
        res.render('List', {
          title: 'ToDo App',
          isAuth: isAuth,
        });
      });
  });

  router.post('/', (req, res, next) => {
 
    const id = req.body.id;
   console.log(id);
knex('reports')
.select('id')
    .where('id',id)
    .del()
   .then(function () {
    console.log('できた');
  res.redirect('/List')
})

   
    
   
  })

  // メール送信関数
const NodeMailer = require('nodemailer')
 
// メール送信関数
function sendMail (smtpData, mailData) {
 
  // SMTPサーバの情報をまとめる
  const transporter = NodeMailer.createTransport(smtpData)
 
  // メール送信
  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      // エラー処理
      console.log(error)
    } else {
      // 送信時処理
      console.log('Email sent: ' + info.response)
    }
  })
}




 
 
// メイン処理
function main() {
  // SMTP情報を格納（Gmailの場合）
  const smtpData = {
    service: 'gmail',
    auth: {
        user: 'ryouheirikuzyou@gmail.com',
        pass: 'Ryouhei00'
    }
  }
 
  // 送信内容を作成
  const mailData = {
    from: '"テストユーザ" <' + smtpData.auth.user + '>', // 送信元名
    to: 'ryouheirikuzyou@yahoo.co.jp',                         // 送信先
    subject: `${mails[0].id}`,                               // 件名
    text: 'ログインがありました',                              // 通常のメール本文
    html: `ユーザーID${mails[0].user_id}が日報を報告しました。
    報告内容${mails[0].comments}`,                       // HTMLメール
  }
 
  // メールを送信
  sendMail(smtpData, mailData)
}

module.exports = router;