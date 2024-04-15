// export const routes = [
//     {loc : '/' , title: 'الرئيسية', nav : true , status : 'public'},
//     {loc : '/about' , title: 'معلومات عنا', nav : true , status : 'publicOnly'},
//     {loc : '/contact' , title: 'تواصل معنا', nav : true , status : 'publicOnly'},

//     {loc : '/lectures/instructor' , title: 'المحاضرات', nav : true , status : 'instructor'},
//     {loc : '/lecture/create' , title: 'محاضرة جديدة', nav : true , status : 'instructor'},
//     {loc : '/info/instructor' , title: 'بيانات المحاضر', nav : true , status : 'instructor'},
    
//     {loc : '/lectures/student' , title: 'المحاضرات المسجلة', nav : true , status : 'student'},
//     {loc : '/qr/read' , title: 'إلتقات الكود', nav : true , status : 'student'},
//     {loc : '/info/student' , title: 'بيانات الطالب', nav : true , status : 'student'},

//     {loc : '/auth/login' , title: 'تسجيل الدخول' , nav: true , status : 'publicOnly'},
//     {loc : '/auth/forgetpassword' , title: 'استعادة الحساب' , nav: false , status : 'publicOnly'},
//     {loc : '/auth/resetpassword' , title: 'تغيير كلمة المرور' , nav: false , status : 'publicOnly'},
//     {loc : '/auth/register/instructor' , title: 'إنشاء حساب محاضر' , nav:false , status : 'publicOnly'},
//     {loc : '/auth/register/student' , title: 'إنشاء حساب طالب' , nav:false , status : 'publicOnly'},
// ]

export const routes = [
    {loc : '/' , title: 'الرئيسية', footer : 'public' , nav : 'public'},
    {loc : '/about' , title: 'معلومات عنا', footer : 'public' , nav : 'publicOnly'},
    {loc : '/contact' , title: 'تواصل معنا', footer : 'public' , nav : 'publicOnly'},

    {loc : '/lectures/instructor' , title: 'المحاضرات', footer : 'instructor' , nav : 'instructor'},
    {loc : '/lecture/create' , title: 'محاضرة جديدة', footer : 'instructor' , nav : 'instructor'},
    {loc : '/info/instructor' , title: 'بيانات المحاضر', footer : 'instructor' , nav : 'instructor'},
    
    {loc : '/lectures/student' , title: 'المحاضرات المسجلة', footer : 'student' , nav : 'student'},
    {loc : '/qr/read' , title: 'إلتقات الكود', footer : 'student' , nav : 'student'},
    {loc : '/info/student' , title: 'بيانات الطالب', footer : 'student' , nav : 'student'},

    {loc : '/auth/login' , title: 'تسجيل الدخول' , footer : 'publicOnly' , nav : 'publicOnly'},
    {loc : '/auth/forgetpassword' , title: 'استعادة الحساب' , footer : false , nav : false},
    {loc : '/auth/resetpassword' , title: 'تغيير كلمة المرور' , footer : false , nav : false},
    {loc : '/auth/register/instructor' , title: 'إنشاء حساب محاضر' , footer :'publicOnly' , nav : false},
    {loc : '/auth/register/student' , title: 'إنشاء حساب طالب' , footer :'publicOnly' , nav : false},
]