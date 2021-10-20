const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
      pool.query(
        `insert into employees(fullName, email, password, mobile, city, gender, department, hireDate, isPermanent) 
                  values(?,?,?,?,?,?,?,?,?)`,
        [
          data.fullName,
          data.email,
          data.password,
          data.mobile,
          data.city,
          data.gender,
          data.department,
          data.hireDate,
          data.isPermanent
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from employees where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getUsers: callBack => {
        pool.query(
          `select id,fullName,email,password,mobile,city,gender,department,hireDate,isPermanent  from employees`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getUserByUserId: (id, callBack) => {
        pool.query(
          `select id,fullName,email,password,mobile,city,gender,department,hireDate,isPermanent from employees where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      updateUser: (data, callBack) => {
        pool.query(
          `update employees set fullName=?, email=?, password=?, mobile=?, city=?, gender=?, department=?, hireDate=?, isPermanent=? where id = ?`,
          [
            data.fullName,
            data.email,
            data.password,
            data.mobile,
            data.city,
            data.gender,
            data.department,
            data.hireDate,
            data.isPermanent,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      deleteUser: (id, callBack) => {
        pool.query(
          `select id from employees where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            if(results[0]) {
              pool.query(`delete from employees where id = ?`,[id])
            }
            return callBack(null, results[0]);
          }
        );
      },
};