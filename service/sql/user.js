var studentSQL={
  insert:'insert into tb_student(appid,name,avatar) values(?,?,?)',
  queryAll:'select * from tb_student',
  getStudentByAppId:'select * from tb_student where appid = ?'
}

module.exports=studentSQL;