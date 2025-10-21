// سلة تسوق بسيطة
let cart = [];
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    alert(`${productName} تم إضافته إلى السلة. المجموع: ${cart.length} منتج`);
}
// أضف زر "أضف إلى السلة" في كل منتج في HTML، مثل:
// <button onclick="addToCart('النصف كيلو الأسود', 200)">أضف إلى السلة</button>


const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.post('/contact', (req, res) => {
    // معالجة البيانات هنا
    console.log(req.body);
    res.send('تم الإرسال!');
});
app.listen(3000, () => console.log('الخادم يعمل على 3000'));

emailjs.send('service_exbkmqp', 'template_l0ddljn', formData, 'dfZYpkEXbWo4AGWv3')








































































