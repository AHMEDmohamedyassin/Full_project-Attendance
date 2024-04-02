export const routes = [
    {loc : '/' , title: 'الرئيسية', nav : true , status : 'public'},
    {loc : '/about' , title: 'معلومات عنا', nav : true , status : 'public'},
    {loc : '/contact' , title: 'تواصل معنا', nav : true , status : 'public'},

    {loc : '/lectures/instructor' , title: 'المحاضرات', nav : true , status : 'instructor'},
    {loc : '/lecture/create' , title: 'محاضرة جديدة', nav : true , status : 'instructor'},
    {loc : '/info/instructor' , title: 'بيانات المحاضر', nav : true , status : 'instructor'},
    
    {loc : '/lectures/student' , title: 'المحاضرات المسجلة', nav : true , status : 'student'},
    {loc : '/qr/read' , title: 'إلتقات الكود', nav : true , status : 'student'},
    {loc : '/info/student' , title: 'بيانات الطالب', nav : true , status : 'student'},

    {loc : '/auth/login' , title: 'تسجيل الدخول' , nav: true , status : 'publicOnly'},
    {loc : '/auth/forgetpassword' , title: 'استعادة الحساب' , nav: false , status : 'publicOnly'},
    {loc : '/auth/resetpassword' , title: 'تغيير كلمة المرور' , nav: false , status : 'publicOnly'},
    {loc : '/auth/register/instructor' , title: 'إنشاء حساب محاضر' , nav:false , status : 'publicOnly'},
    {loc : '/auth/register/student' , title: 'إنشاء حساب طالب' , nav:false , status : 'publicOnly'},
]