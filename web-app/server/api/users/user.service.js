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
          data.departmentId,
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
};