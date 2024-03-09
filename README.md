"# Full_project-Attendance" 


user_table : 
name
email 
pass
role (boolean) : admin = 0 , instructor = 1 , student = 2 
json_data -> json (Bn , sec , code , group )
phone
collage_id
info_file


lectuers_table : 
user_id : instructor 
title 
expire_date : stop accepting students
qr_file
student_count : count of student


collages_table : 
ar_title: 
en_title: 
slug :
ar_university
en_university


attendence table ; 
user_id
lecture_id

/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*

relations : 
    user -> lecture (one to many)
    user -> lecture (many to many)
    user -> collage (one to many)
