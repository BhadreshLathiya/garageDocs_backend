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
      userId: id,
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

exports.getSingleInvoiceDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const invoice = await Invoice.findById(id).populate("userId");
    res.status(200).json({
      success: true,
      message: "get single invoice detail.",
      data: invoice,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.deleteSingleInvoiceDetail = async (req, res) => {
  try {
    const id = req.params.id;
    await Invoice.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "invoice delete successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    await Invoice.findByIdAndUpdate(
      id,
      {
        $push: {
          service: {
            serviceName: req.body.serviceName,
            price: req.body.price,
            tax: req.body.tax,
            Quantity: req.body.Quantity,
            discount: req.body.discount,
            total: req.body.total,
          },
          spareParts: {
            partsName: req.body.partsName,
            price: req.body.price,
            tax: req.body.tax,
            Quantity: req.body.Quantity,
            discount: req.body.discount,
            total: req.body.total,
          },
          selectPackage: {
            packageName: req.body.packageName,
            price: req.body.price,
            tax: req.body.tax,
            Quantity: req.body.Quantity,
            discount: req.body.discount,
            total: req.body.total,
          },
        },
        vehicleType: req.body.vehicleType,
        vehicleCompany: req.body.vehicleCompany,
        vehicleModel: req.body.vehicleModel,
        kilometer: req.body.kilometer,
        fuelType: req.body.fuelType,
        fuelIndicator: req.body.fuelIndicator,
        repiarTag: req.body.repiarTags,
        isGst: req.body.isGst,
        gstNo: req.body.gstNo,
        status: req.body.status,
        totalPayment: req.body.totalPayment,
        receivePayment: req.body.receivePayment,
        duePayment: req.body.duePayment,
        isPaymentStatus: req.body.isPaymentStatus,
      },
      { new: true }
    );
    const invoice = await Invoice.findById(id);
    res.status(200).json({
      success: true,
      message: "invoice update successfully.",
      data: invoice,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.deleteSinglePartsOrServiceFromInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoiceData = req.body;
    const data = await Invoice.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          service: { _id: invoiceData.serviceId },
          spareParts: { _id: invoiceData.sparePartsId },
          selectPackage: { _id: invoiceData.selectPackageId },
        },
      },
      { new: true }
    );
    const invoice = await Invoice.findById(id);
    res.status(200).json({
      success: true,
      message: "invoice update successfully.",
      data: invoice,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};
