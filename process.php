<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    // أرسل بريداً (يحتاج إعداد mail function)
    mail("kennvy.2008@gmail.com", "رسالة من الموقع", "الاسم: $name\nالبريد: $email\nالرسالة: $message");
    echo "تم إرسال الرسالة بنجاح!";
}
?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "kennvy.2008@gmail.com";
    $subject = "رسالة من موقع Take Two";
    $body = "الاسم: $name\nالبريد: $email\nالرسالة: $message";
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "تم إرسال الرسالة بنجاح!";
    } else {
        echo "حدث خطأ في الإرسال.";
    }
}
?>






<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $to = "YOUR_GMAIL@gmail.com"; // ← حط جيميلك هنا
  $subject = "رسالة جديدة من موقعك Take Two";
  $body = "الاسم: $name\nالبريد: $email\n\nالرسالة:\n$message";
  $headers = "From: $email";

  if (mail($to, $subject, $body, $headers)) {
    echo "تم إرسال الرسالة بنجاح!";
  } else {
    echo "حدث خطأ أثناء إرسال الرسالة.";
  }
}
?>










<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php'; // بعد تثبيت PHPMailer عبر Composer

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $mail = new PHPMailer(true);
  try {
    // إعدادات SMTP Gmail (استخدم App Password)
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'YOUR_GMAIL@gmail.com';
    $mail->Password = 'YOUR_APP_PASSWORD';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('YOUR_GMAIL@gmail.com', 'Take Two Site');
    $mail->addAddress('TARGET_GMAIL@gmail.com'); // المكان اللي توصله الرسائل
    $mail->addReplyTo($email, $name);

    $mail->isHTML(false);
    $mail->Subject = 'رسالة من موقعك: ' . $name;
    $mail->Body = "الاسم: $name\nالبريد: $email\n\n$message";

    $mail->send();
    echo 'تم الإرسال';
  } catch (Exception $e) {
    echo "خطأ في الإرسال: {$mail->ErrorInfo}";
  }
}
?>

 


