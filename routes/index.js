var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localStategy = require('passport-local')
const upload = require('./multer')

passport.use(new localStategy(userModel.authenticate()))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/register', function(req, res){
  res.render('register')
})
router.post('/fileupload', isLoggedIn, upload.single('image'),function(req, res){
res.send('uploadded')
})
router.get('/profile', isLoggedIn,function(req, res){
  res.render('profile')
})


router.post('/register', function(req, res,next){
const data = new userModel({
username:req.body.username,
email:req.body.email,
contact:req.body.contact
})
userModel.register(data, req.body.password)
.then(function(){
  passport.authenticate('local')(req,res, function(){
    res.redirect('/profile')
  })
})
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: "/",
successRedirect: "/profile"
}),function(req, res){
  res.render('profile')
});

router.get('/logout',(req,res,next) =>{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req, res, next) {
  // Assuming Passport.js authentication
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
module.exports = router;
