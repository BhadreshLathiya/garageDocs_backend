const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.phoneNumberVerified = async (req, res) => {
  try {
    const userFind = await User.findOne({
      mobileNo: req.body.mobileNo,
      countryCode: req.body.countryCode,
    });
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    if (userFind) {
      const user = await User.findByIdAndUpdate(userFind._id, { otp: 1111 }); // Use the generated OTP
      res.status(200).json({
        success: true,
        message: "Otp Sent successfully",
        data: user,
      });
    } else {
      const user = await User.create({
        mobileNo: req.body.mobileNo,
        countryCode: req.body.countryCode,
        otp: 1111,
        // deviceToken: req.body.deviceToken,
      });
      res.status(200).json({
        success: true,
        message: "Otp Sent successfully",
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.otpVerifiedUser = async (req, res) => {
  try {
    const userFind = await User.findOne({
      mobileNo: req.body.mobileNo,
      countryCode: req.body.countryCode,
      otp: req.body.otp,
    });

    if (userFind) {
      res.status(200).json({
        success: true,
        message: "Otp Verified.",
        data: userFind,
      });
    } else {
      res.status(200).json({
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.userRegister = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  try {
    const userData = req.body;
    let emailCheck = await User.findOne({ email: userData.email });
    if (emailCheck) {
      return res.status(200).json({
        success: false,
        message: "User exists with this E-mail.",
      });
    } else {
      const userFind = await User.findOne({
        mobileNo: userData.mobileNo,
        countryCode: userData.countryCode,
      });

      if (userFind) {
        const user = await User.findByIdAndUpdate(userFind._id, {
          workShopName: userData.workShopName,
          ownerName: userData.ownerName,
          email: userData.email,
          password: await bcrypt.hash(password, salt),
          workShopAddress: userData.workShopAddress,
          isRegister: 1,
        });
        if (req.file) user.image = req.file.path;
        token = user.getJWTToken();
        user.token = token;
        await user.save();
        res.status(200).json({
          success: true,
          message: "user register successfully",
          data: newUser,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User not register this number.",
          data: [],
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getSingleUserDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "user Detail get successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getSingleUserDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id).populate("familyId");
    res.status(200).json({
      success: true,
      message: "user Detail get successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateSingleUserDetail = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.file && req.body) {
      info = { ...req.body, image: req.file.path };
      let userData = await User.findById(id);
      fs.unlink(userData.image, function (err) {
        if (err && err.code == "ENOENT") {
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });
      await User.findByIdAndUpdate(id, info, {
        new: true,
        runValidators: true,
        userFindAndModify: true,
      });
      const data = await User.findById(id);
      res
        .status(200)
        .json({ data: data, message: "Updated user", success: true });
    } else if (req.files && !req.body) {
      let userData = await User.findById(id);
      fs.unlink(userData.image, function (err) {
        if (err && err.code == "ENOENT") {
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });
      info = { image: req.file.path };

      await User.findByIdAndUpdate(id, info, {
        new: true,
        runValidators: true,
        userFindAndModify: true,
      });
      const data = await User.findById(id);
      res
        .status(200)
        .json({ data: data, message: "Updated user", success: true });
    } else {
      await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        userFindAndModify: true,
      });
      const data = await User.findById(id);
      res
        .status(200)
        .json({ data: data, message: "Updated user", success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const data = await User.find();
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
        message: "Get all User.",
        count: result.length,
        page,
        totalPages,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

exports.deleteSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted User", success: true });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};

exports.logOutUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    data.token = null;
    await data.save();
    res.status(200).json({
      success: true,
      message: "user log out.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};
