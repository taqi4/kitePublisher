var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ejs = require('ejs');
var path = require('path');
// ejs.renderFile(__dirname + "../views/mail.ejs", { name: 'taqi' }, function (err, data) {
//   if (err) {
//       console.log(err);
//   } else {
//       var mainOptions = {
//           from: 'mohammedtaqijigar@gmail.com',
//           to: 'ztaqi668@gmail.com',
//           cc:'hkjigar3@gmail.com',
//           subject: 'Account Activated server genrated',
//           html: data
//       }}});
//       transporter.sendMail(mailOptions,(err,data)=>{
//         if(err) console.log(err);
//         else console.log("message sent");
//       });
      

/* GET home page. */
router.get('/',  async (req, res, next)=> {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.EMAIL,
      pass:process.env.PASSWORD
    }
  });
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });
  
  const data = await   ejs.renderFile(path.join(__dirname , "../views","/mail.ejs"), { name: 'taqi' });
  console.log(data);
  var mailOptions = {
    from: 'mohammedtaqijigar@gmail.com',
    to: 'ztaqi668@gmail.com',
    cc:'hkjigar3@gmail.com',
    subject: 'Account Activated',
    attachments :[
      {filename : "picture.jpeg" , path:"./picture.jpeg"}
    ],
    html: data
  };
  


await transporter.sendMail(mailOptions,(err,data)=>{
  if(err) console.log(err);
  else console.log("message sent");
});
res.render('index', { title: 'Taqi' });
});

router.get('/kiteConnect',authenticateUser,renderKite);

async function authenticateUser(req,res,next){
  const authenticated = true;
  console.log(req.cookies);
  if(authenticated)
    next();
  else
    res.status(401).send("Please authenticate.");
}
async function renderKite(req,res){
  const response = `<!DOCTYPE html>
  <html>
    <head>
      <title>Tactic</title>
    </head>
    <body>
    <button
      href="#"
      data-kite="ejrvoxa4gw8ny5pi"
      data-exchange="NSE"
      data-tradingsymbol="SBIN"
      data-transaction_type="BUY"
      data-quantity="1"
      data-order_type="MARKET"
      >
        Buy SBI stock (Market)
    </button>
    <button
    href="#"
    data-kite="ejrvoxa4gw8ny5pi"
    data-exchange="NSE"
    data-tradingsymbol="SBIN"
    data-transaction_type="BUY"
    data-quantity="1"
    data-order_type="LIMIT"
    >
      Buy SBI stock (Limit)
    </button><button
    href="#"
    data-kite="ejrvoxa4gw8ny5pi"
    data-exchange="NSE"
    data-tradingsymbol="SBIN"
    data-transaction_type="BUY"
    data-quantity="1"
    data-order_type="SL"
    >
      Buy SBI stock (SL)
  </button><button
  href="#"
  data-kite="ejrvoxa4gw8ny5pi"
  data-exchange="NSE"
  data-tradingsymbol="SBIN"
  data-transaction_type="BUY"
  data-quantity="1"
  data-order_type="SL-M"
  >
    Buy SBI stock (SL-m)
  </button><button
  href="#"
  data-kite="ejrvoxa4gw8ny5pi"
  data-exchange="NSE"
  data-tradingsymbol="SBIN"
  data-transaction_type="SELL"
  data-quantity="1"
  data-order_type="MARKET"
  >
    SELL SBI stock (sell market)
  </button><button
  href="#"
  data-kite="ejrvoxa4gw8ny5pi"
  data-exchange="NSE"
  data-tradingsymbol="SBIN"
  data-transaction_type="SELL"
  data-quantity="1"
  data-order_type="LIMIT"
  >
    SELL SBI stock (Limit)
  </button><button
  href="#"
  data-kite="ejrvoxa4gw8ny5pi"
  data-exchange="NSE"
  data-tradingsymbol="SBIN"
  data-transaction_type="SELL"
  data-quantity="1"
  data-order_type="SL"
  >
    SELL SBI stock (SL)
</button><button
href="#"
data-kite="ejrvoxa4gw8ny5pi"
data-exchange="NSE"
data-tradingsymbol="SBIN"
data-transaction_type="SELL"
data-quantity="1"
data-order_type="SL-M"
>
  SELL SBI stock (SL-m)
</button>
      <script src="https://kite.trade/publisher.js?v=3"></script>
    </body>
  </html>`  
  res.send(response);
}

module.exports = router;
