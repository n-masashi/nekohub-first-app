const  express = require('express');
const  router = express.Router();
const QRCode = require('qrcode');

function checkAuth(req, res, next) {
  if (req.session && req.session.userid) {
    next();
  } else {
    res.redirect('/signin');
  }
}

router.get('/', function(req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  if (!isAuth) {
    return res.render('index', {
      title: 'NekoHub',
      isAuth: false,
    });
  }
  res.render('qrgenerator', {
    title: 'QR Generator',
    isAuth: true,
    qrCodeData: null, 
    inputText: '',
  });


});

router.post('/', checkAuth, async function(req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  if (!isAuth) {
    return res.render('index', {
      title: 'NekoHub',
      isAuth: false,
    });
  }

  const text = req.body.qrtext || '';

  try {
    const generatedQRCodeData = await QRCode.toDataURL(text);

    res.render('qrgenerator', {
      title: 'QR Generator',
      isAuth: isAuth,
      qrCodeData: generatedQRCodeData,
      inputText: text,
    });
  } catch (err) {
    console.error(err);
    res.render('qrgenerator', {
      title: 'QR Generator',
      isAuth: isAuth,
      qrCodeData: null,
      error: 'QRコードの生成に失敗しました',
      inputText: '',
    });
  }
});


module.exports = router;
