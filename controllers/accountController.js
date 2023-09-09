const Invoce = require("../models/invoiceModel");

exports.sumOfPrice = async (req, res) => {
    // console.log(req.params.id)
  try {
    const total = await Invoce.aggregate([
      {
        $match: { userId: req.params.id },
      },
      {
        $group: {
          _id: null,
          receivePayment: { $sum: "$receivePayment" },
          duePayment: { $sum: "$duePayment" },
          
        },
      },
    ]);
    console.log(total,"total")
    res.status(200).json({
      success: true,
      message: "sum listing successfully",
      total: total,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
