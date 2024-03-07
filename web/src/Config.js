export const routes = [
    {loc : '/' , title: 'الرئيسية'},
    {loc : '/about' , title: 'معلومات عنا'},
    {loc : '/contact' , title: 'تواصل معنا'},

    {loc : '/lectures/instructor' , title: 'المحاضرات'},
    {loc : '/details' , title: 'بيانات المحاضرة'},
    {loc : '/info/instructor' , title: 'بيانات المحاضر'},
    
    {loc : '/lectures/student' , title: 'المحاضرات المسجلة'},
    {loc : '/qr/read' , title: 'إلتقات الكود'},
    {loc : '/info/student' , title: 'بيانات الطالب'},

    {loc : '/auth/register/instructor' , title: 'إنشاء حساب محاضر' , nav:false},
    {loc : '/auth/register/student' , title: 'إنشاء حساب طالب' , nav:false},
    {loc : '/auth/login' , title: 'تسجيل الدخول'},
    {loc : '/auth/forgetpassword' , title: 'نسيت كلمة المرور' , nav:false},
  ]