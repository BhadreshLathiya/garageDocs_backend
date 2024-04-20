const mongoose = require("mongoose");
const Invoice = require("../models/invoiceModel");

const priceUpdate = (data) => {
  // Calculate total service price
  const totalServicePrice = data.services.reduce(
    (total, service) => total + service.price,
    0
  );

  // Calculate total package price
  const totalPackagePrice = data.selectPackage.reduce(
    (total, package) => total + package.price,
    0
  );

  // Calculate total package price
  const totalPartsPrice = data.spareParts.reduce(
    (total, package) => total + package.price,
    0
  );

  // Calculate total price
  return totalServicePrice + totalPackagePrice + totalPartsPrice;
};
exports.createInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoice = await Invoice.create({ ...req.body, userId: id });
    const invoiceData = await Invoice.findById(invoice._id)
      .populate("repiarTag")
      .populate("services")
      .populate("spareParts")
      .populate("selectPackage");
    const data = priceUpdate(invoiceData);
    invoice.totalPayment = data;
    await invoice.save();
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
    const invoice = await Invoice.findById(id)
      .populate("repiarTag")
      .populate("services")
      .populate("spareParts")
      .populate("selectPackage");
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

    // if (
    //   invoiceData.services ||
    //   invoiceData.spareParts ||
    //   invoiceData.selectPackage
    // ) {
    //   for (const itemType of ["services", "spareParts", "selectPackage"]) {
    //     if (invoiceData[itemType]) {
    //       for (const item of invoiceData[itemType]) {
    //         const itemId = mongoose.Types.ObjectId(item._id);
    //         delete item._id; // Remove _id to avoid circular reference
    //         await Invoice.updateOne(
    //           { _id: id },
    //           { $push: { [itemType]: { $each: [{ _id: itemId, ...item }] } } }
    //         );
    //       }
    //     }
    //   }

    //   const updatedInvoice = await Invoice.findById(id);
    //   res.status(200).json({
    //     success: true,
    //     message: "Invoice updated successfully.",
    //     data: updatedInvoice,
    //   });
    // } else if (
    //   invoiceData.servicesId ||
    //   invoiceData.sparePartsId ||
    //   invoiceData.selectPackageId
    // ) {
    //   for (const itemType of ["services", "spareParts", "selectPackage"]) {
    //     if (invoiceData[`${itemType}Id`]) {
    //       const updateField = `${itemType}.$`;

    //       await Invoice.updateOne(
    //         { [`${itemType}._id`]: invoiceData[`${itemType}Id`] },
    //         {
    //           $set: {
    //             [updateField]: {
    //               [`${itemType}.Name`]: invoiceData[`${itemType}.Name`],
    //               price: invoiceData.price,
    //               tax: invoiceData.tax,
    //               Quantity: invoiceData.Quantity,
    //               discount: invoiceData.discount,
    //               total: invoiceData.total,
    //             },
    //           },
    //         }
    //       );
    //     }
    //   }

    //   const updatedInvoice = await Invoice.findById(id);
    //   res.status(200).json({
    //     success: true,
    //     message: "Invoice updated successfully.",
    //     data: updatedInvoice,
    //   });
    // } else {
    await Invoice.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    const invoiceData = await Invoice.findById(id)
      .populate("repiarTag")
      .populate("services")
      .populate("spareParts")
      .populate("selectPackage");
    const data = priceUpdate(invoiceData);
    invoiceData.totalPayment = data;
    await invoiceData.save();
    res.status(200).json({
      success: true,
      message: "Invoice updated successfully.",
      data: invoiceData,
    });
    // }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.deleteSinglePartsOrServiceFromInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoiceData = req.body;

    const updateQuery = {};

    if (invoiceData.serviceId) {
      updateQuery.$pull = {
        services: { _id: invoiceData.serviceId },
      };
    }

    if (invoiceData.sparePartsId) {
      updateQuery.$pull = {
        ...updateQuery.$pull,
        spareParts: { _id: invoiceData.sparePartsId },
      };
    }

    if (invoiceData.selectPackageId) {
      updateQuery.$pull = {
        ...updateQuery.$pull,
        selectPackage: { _id: invoiceData.selectPackageId },
      };
    }

    const data = await Invoice.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
    });

    const invoice = await Invoice.findById(id);
    res.status(200).json({
      success: true,
      message: "Invoice updated successfully.",
      data: invoice,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.allInvoiceforSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await Invoice.find({ userId: userId }).sort({ createdAt: -1 });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = data.slice(skip, skip + pageSize);
    if (page > totalPages) {
      return res.status(200).json({
        status: false,
        message: "No data found",
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
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getStatusWiseInvoiceForSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await Invoice.find({
      userId: userId,
      status: req.body.status,
    }).sort({ createdAt: -1 });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = data.slice(skip, skip + pageSize);
    if (page > totalPages) {
      return res.status(200).json({
        status: false,
        message: "No data found",
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
    res.status(400).send("Somthing went wrong.");
  }
};

exports.statusCountingInvoice = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await Invoice.find({ userId: userId });
    const createCount = data.filter((e) => e.status === "create").length;
    const workInProgressCount = data.filter(
      (e) => e.status === "workInProgress"
    ).length;
    const completedCount = data.filter((e) => e.status === "completed").length;
    res.status(200).json({
      success: true,
      message: "invoice update successfully.",
      createCount: createCount,
      workInProgressCount: workInProgressCount,
      completedCount: completedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getInvoiceBySearch = async (req, res) => {
  try {
    const id = req.params.id;
    let event = req.query.search;
    event = event.split(" ").join("").trim();

    const regEvent = new RegExp(event, "i");

    let user = await Invoice.find({
      $and: [
        {
          $or: [
            { name: regEvent },
            { vehiclePlateNumber: regEvent },
            { email: regEvent },
            { mobileNo: regEvent },
            { vehicleModel: regEvent },
          ],
        },
        { userId: id },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Event listing successful...",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};
