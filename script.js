// ================= CART =================



if (!window.cart) {
  window.cart = JSON.parse(localStorage.getItem('take-two-pro-v2-cart')) || [];
}



// إضافة منتج للكارت
function handleAddToCart(productId, name, price, img) {
    const productEl = document.getElementById(productId);
    const sizeEl = productEl.querySelector('.p-size');
    const colorEl = productEl.querySelector('.p-color');
    const size = sizeEl.value;
    const color = colorEl.value;

    if (!size || !color) {
        alert("من فضلك اختر المقاس واللون");
        return;
    }

    const existingItem = cart.find(item => item.name === name && item.size === size && item.color === color);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: Date.now(),
            name,
            price,
            img,
            size,
            color,
            quantity: 1
        });
    }
    saveCart();
    alert(`تمت إضافة ${name} إلى السلة ✅`);
}

// حفظ الكارت في localStorage وتحديث واجهة المستخدم
function saveCart() {
    localStorage.setItem("takeTwoCart", JSON.stringify(cart));
    updateCartUI();
}

// تحديث واجهة الكارت والعداد
function updateCartUI() {
    const count = document.getElementById("cartCount");
    count.innerText = cart.reduce((total, item) => total + item.quantity, 0);

    const cartBox = document.getElementById("cartItems");
    if (!cartBox) return;
    cartBox.innerHTML = "";

    let totalPrice = 0;
    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        cartBox.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <b>${item.name}</b><br>
                    Size: ${item.size} | Color: ${item.color}<br>
                    Qty: ${item.quantity}<br>
                    ${item.price * item.quantity} EGP
                     <div class="cart-content">
                     <div class="cart-content-panel">
                     <div class="cart-header">
                     <div class="cart-footer">
                      <div class="cart-footer-controls">
                      <div class="cart-total">
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>

 
 








                </div>
                <span onclick="removeItem(${index})" style="color:red;cursor:pointer;">✖</span>
            </div>
        `;
    });

    const totalEl = document.getElementById("cartTotal");
    if (totalEl) totalEl.innerText = `${totalPrice} EGP`;
}

// إزالة عنصر من السلة
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

// فتح وغلق كارت التسوق
function showCart() {
    document.getElementById('cart-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// تحميل الكارت عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
});

// ================= DARK MODE =================
const darkToggle = document.querySelector('.dark-toggle');
if (darkToggle) {
    darkToggle.onclick = () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    };
}

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

// ================= EMAILJS - CLEAN IMPLEMENTATION =================
(function(){
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init("fOAvW3cTi-eH5I8tO");
            console.log("✅ EmailJS initialized");
        } catch(e) {
            console.error("❌ EmailJS init error:", e);
        }
    } else {
        console.error("❌ EmailJS SDK not found");
    }
})();

// Clean contact form handler
function sendContactForm(formId) {
    const form = document.getElementById(formId);
    if (!form) {
        console.error('Form not found:', formId);
        return;
    }

    const formData = {
        name: form.querySelector('input[name="name"]').value,
        email: form.querySelector('input[name="email"]').value,
        message: form.querySelector('textarea[name="message"]').value
    };

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert("يرجى إدخال بريد إلكتروني صحيح");
        return;
    }

    console.log('📧 Sending contact form via EmailJS...');

    if (typeof emailjs !== 'undefined') {
        emailjs.send("service_id0xdsc", "template_4xon396", {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            reply_to: formData.email
        }, "fOAvW3cTi-eH5I8tO")
        .then((response) => {
            console.log('✅ Email sent successfully:', response);
            alert("تم إرسال رسالتك بنجاح!");
            form.reset();
        })
        .catch((error) => {
            console.error('❌ EmailJS Error:', error);
            let errorMsg = "حدث خطأ أثناء الإرسال. حاول مرة أخرى.";
            if (error.status === 400) {
                errorMsg = "خطأ في إعداد القالب. يرجى الاتصال بالدعم.";
            } else if (error.status === 401) {
                errorMsg = "خطأ في التحقق. يرجى الاتصال بالدعم.";
            }
            alert(errorMsg);
        });
    } else {
        alert("خدمة البريد غير متوفرة. يرجى تحديث الصفحة.");
    }
}

