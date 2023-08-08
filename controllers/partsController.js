const Part = require("../models/partModel");
const PartDetail = require("../models/partDetailModel");

exports.addPart = async (req, res) => {
  try {
    const id = req.params.id;
    const part = await Part.create({
      partName: req.body.partName,
      userType: req.body.userType,
      userId: id,
    });
    res.status(200).json({
      success: true,
      message: "part add successfully",
      data: part,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.addPartDetailByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const partDetail = await PartDetail.create({
      partName: req.body.partName,
      partType: req.body.partType,
      partNumber: req.body.partNumber,
      partPurchasePrice: req.body.partPurchasePrice,
      partSalePrice: req.body.partSalePrice,
      inStock: req.body.inStock,
      minStock: req.body.minStock,
      rack: req.body.rack,
      hsn: req.body.hsn,
      shopName: req.body.shopName,
      workShopName: req.body.workShopName,
      workShopAddress: req.body.workShopAddress,
      discription: req.body.discription,
      partId: req.body.partId,
      userId: userId,
    });
    res.status(200).json({
      success: true,
      message: "part detail add successfully",
      data: partDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getAllPartForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userPart = await Part.find({ userType: 2, userId: userId });
    const adminPart = await Part.find({ userType: 1 });
    const totalPart = [...userPart, ...adminPart];
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = totalPart.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = totalPart.slice(skip, skip + pageSize);

    if (page > totalPages) {
      return res.status(404).json({
        status: "failed",
        massage: "No data found",
      });
    }
    if (totalPart.length === 0) {
      res
        .status(200)
        .json({ message: "No part find.", data: [], success: false });
    } else {
      res.status(200).json({
        status: true,
        message: "Get all user part.",
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

exports.getAllPartForAdmin = async (req, res) => {
  try {
    const adminPart = await Part.find({ userType: 1 });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = adminPart.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = adminPart.slice(skip, skip + pageSize);

    if (page > totalPages) {
      return res.status(404).json({
        status: "failed",
        massage: "No data found",
      });
    }
    if (adminPart.length === 0) {
      res
        .status(200)
        .json({ message: "No part find.", data: [], success: false });
    } else {
      res.status(200).json({
        status: true,
        message: "Get all user part.",
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

exports.getSinglePart = async (req, res) => {
  try {
    const id = req.params.id;
    const part = await Part.findById(id);
    res.status(200).json({
      status: true,
      message: "Get single Part.",
      data: part,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getSinglePartDetailByUser = async (req, res) => {
  try {
    const partId = req.params.id;
    const userId = req.body.userId;
    const partDetail = await PartDetail.findOne({
      partId: partId,
      userId: userId,
    });
    if (partDetail) {
      res.status(200).json({
        status: true,
        message: "Get single part detail.",
        data: partDetail,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "not found part detail.",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.updateSinglePartDetailByUser = async (req, res) => {
  try {
    const id = req.params.id;
    await PartDetail.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const partDetail = await PartDetail.findById(id);
    res.status(200).json({
      status: true,
      message: "update single part detail.",
      data: partDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.updateSinglePartByAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    await Part.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const part = await Part.findById(id);
    res.status(200).json({
      status: true,
      message: "update single part detail.",
      data: part,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.deleteSinglePartDetailInPartDetail = async (req, res) => {
  try {
    const id = req.params.id;
    await PartDetail.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "delete single part detail.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.deleteSinglePartInPart = async (req, res) => {
  try {
    const id = req.params.id;
    await Part.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "delete single part detail.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};
