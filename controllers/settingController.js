const Setting = require("../models/settingsModel");

exports.addSetting = async (req, res) => {
  try {
    const find = await Setting.findOne();

    if (!find) {
      const data = await Setting.create({
        trialDays: req.body.trialDays,
      });
      res.status(200).send({
        success: true,
        message: "settings create successfully",
        user: data,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "setting already exists",
      });
    }
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.editSetting = async (req, res) => {
  try {
    const data = await Setting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      userFindAndModify: true,
    });
    res.status(200).send({
      success: true,
      message: "settings update successfully",
      user: data,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.deleteSetting = async (req, res) => {
  try {
    await Setting.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "settings deleted successfully",
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getSetting = async (req, res) => {
  try {
    const data= await Setting.find({});
    res.status(200).send({
      success: true,
      message: "setting listing successfully",
      data:data
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "something went wrong",
    });
  }
};
