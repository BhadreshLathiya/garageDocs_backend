const Invoice = require("../models/invoiceModel");

exports.createInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoiceData = req.body;
    const invoice = await Invoice.create({
      mobileNo: invoiceData.mobileNo,
      name: invoiceData.name,
      email: invoiceData.email,
      taxNumber: invoiceData.taxNumber,
      address: invoiceData.address,
      remark: invoiceData.remark,
    });
    res.status(200).json({
      success: true,
      message: "invoice create successfully.",
      data: invoice,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};
