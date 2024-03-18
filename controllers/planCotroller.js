const Subscription = require("../models/plan.js");

// insert subscrition plan
exports.insertSubscription = async (req, res) => {
  try {
    const { ammount, duration, description } = req.body;
    // console.log({user})

    const dataFind = await Subscription.find({ ammount: ammount });
    if (dataFind.length === 1) {
      return res.status(200).json({
        success: false,
        message: "subscription plan already exist",
      });
    }
    const sniper = await Subscription.create({
      duration: duration,
      ammount: ammount,
      description: description,
    });
    res.status(200).json({
      success: true,
      message: "subscription plan added succesfully...",
      data: sniper,
    });
    console.log(sniper, "insert Subscripation plan");
  } catch (error) {
    res.status(400).send(error);
  }
};

// delete subscription plan
exports.deleteplan = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "subscription plan delete succesfully...",
    });
    console.log("Delete Subscripation plan");
  } catch (error) {
    res.status(400).send(error);
  }
};

// get all plan
exports.allPlan = async (req, res) => {
  try {
    const plans = await Subscription.find({});
    console.log(plans, "plans");
    res.status(200).json({
      success: true,
      message: "subscription plan listing succesfully...",
      data: plans,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

//update plan
exports.updateplan = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Subscription.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "subscription plan listing succesfully...",
      data: data,
    });
    console.log(data, "update Plan in subscripation");
  } catch (error) {
    res.status(400).send(error);
  }
};

// searchn subscription
exports.getplanBySearch = async (req, res) => {
  try {
    let ammount = req.query.search;
    ammount = ammount.split(" ").join("").trim();
    // console.log(ammount)
    const regfirsname = new RegExp(ammount, "i"); //this is for we serch meet or Meet or MEET all are same
    // console.log(regfirsname);
    let user = await Subscription.find({ ammount: regfirsname });
    // console.log(user);
    res.status(200).send({
      message: "subscription listing successfully.....",
      data: user,
    });
    console.log(user, "get plan by search ");
  } catch (error) {
    res.send("error");
  }
};
