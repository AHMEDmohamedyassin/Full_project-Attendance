<html dir="rlt" lang="ar">
    <head>
        <style>
            .main{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
            .title {
                font-weight: 900;
                font-size: 20px;
                color: #4767ee;
                margin: 0 0 20px 0 ;
            }
            .text {
                font-weight: 700;
                font-size: 20px;
                margin: 20px;
                color: #444
            }
            img{
                width: 80%;
                aspect-ratio: 1;
                margin: 20px;
                max-width: 130px;
            }
            .button{
                color: white;
                background-color: #4767ee;
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 20px;
                text-decoration: none;
            }
            .contact{
                direction: rtl;
                border-top: 1px solid gray;
                padding-top: 32px;
                margin-top: 32px;
                display: flex;
                flex-direction: column;
            }
            .contact_text{
                color: gray;
                font-size: 16px;
                font-weight: 500;
            }
            a{
                color: gray;
                font-weight: 700;
                margin:12px ;
                font-size: 20px;
            }
        </style>

        <title>{{$subject}}</title>
    </head>
    <body>
        <div class="main">
            <h1 class="title">AttendedMe.com</h1>
            <img src="https://attendedme.com/logo/logo.svg" />
            <h1 class="text">لإعادة تعيين كلمة المرور</h1>
            <a class="button" href="{{$url}}">اضغط هنا</a>
        </div>

        <div class="contact">
            <p class="contact_text">يمكنك التواصل معنا علي الأرقام التالية هاتفيا أو علي الواتساب أو عن طريق البريد الإليكتروني</p>
            <ul>
                <li><a href='tel:01066404523'>01066404523</a></li>
                <li><a href='tel:01551302003'>01551302003</a></li>
                <li><a href='mailto:AttendedMe@hotmail.com'>AttendedMe@hotmail.com</a></li>
            </ul>
        </div>
    </body>
</html>