const Employee = require("../models/employeeModel");

exports.createEmployee = async (req, res) => {
  try {
    const find = await Employee.findOne({ phoneNo: req.body.phoneNo });
    const employeeId = Math.floor(10000000 + Math.random() * 90000000);
    const createAmployee = await Employee.create({
        garageId:req.body.garageId,
        name:req.body.name,
        email:req.body.email,
        
    })

    if (find) {
      res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }
    const data = await Employee.create(req.body);
  } catch (error) {}
};
