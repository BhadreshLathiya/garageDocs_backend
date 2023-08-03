const Service = require("../models/serviceModel");

exports.addServiceforSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const serviceData = req.body;
    const service = await Service.create({
      serviceName: serviceData.serviceName,
      servicePrice: serviceData.servicePrice,
      userId: id,
    });
    res.status(200).json({
      success: true,
      message: "service added successfully",
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getAllServiceforSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Service.find({ userId: id });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = data.slice(skip, skip + pageSize);
    if (page > totalPages) {
      return res.status(404).json({
        status: "failed",
        massage: "No data found",
      });
    }
    if (data.length === 0) {
      res
        .status(200)
        .json({ message: "No job find.", data: [], success: false });
    } else {
      res.status(200).json({
        status: true,
        message: "Get all Service.",
        count: result.length,
        page,
        totalPages,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getSingleServiceDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Service.findById(id);
    res.status(200).json({
      success: true,
      message: "get single service detail for single user successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateSingleServiceDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Service.findByIdAndUpdate(id, req.body);
    const data = await Service.findById(id);
    res.status(200).json({
      success: true,
      message: "update single service detail for single user successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.deleteSingleServiceDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Service.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "delete single service detail for single user successfully",
      data: [],
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

