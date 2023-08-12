const Invoice = require("../models/invoiceModel");

exports.createInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoiceData = req.body;
    const invoice = await Invoice.create({
      mobileNo: invoiceData.mobileNo,
      name: invoiceData.name,
      email: invoiceData.email,
      gstNo: invoiceData.gstNo,
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

// exports.updateInvoice = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const invoiceData = req.body;
//     if (
//       invoiceData.services ||
//       invoiceData.spareParts ||
//       invoiceData.selectPackage
//     ) {
//       if (invoiceData.services) {
//         for (let i = 0; i < invoiceData.services.length; i++) {
//           var invoice = await Invoice.findByIdAndUpdate(
//             id,
//             {
//               $push: {
//                 services: {
//                   serviceName: invoiceData.services[i].serviceName,
//                   price: invoiceData.services[i].price,
//                   tax: invoiceData.services[i].tax,
//                   Quantity: invoiceData.services[i].Quantity,
//                   discount: invoiceData.services[i].discount,
//                   total: invoiceData.services[i].total,
//                 },
//               },
//             },
//             {
//               new: true,
//               runValidators: true,
//               userFindAndModify: false,
//             }
//           );
//         }
//         res.status(200).json({
//           success: true,
//           message: "invoice update successfully.",
//           data: invoice,
//         });
//       }
//       if (invoiceData.spareParts) {
//         for (let i = 0; i < invoiceData.spareParts.length; i++) {
//           var invoice = await Invoice.findByIdAndUpdate(
//             id,
//             {
//               $push: {
//                 spareParts: {
//                   partsName: invoiceData.spareParts[i].partsName,
//                   price: invoiceData.spareParts[i].price,
//                   tax: invoiceData.spareParts[i].tax,
//                   Quantity: invoiceData.spareParts[i].Quantity,
//                   discount: invoiceData.spareParts[i].discount,
//                   total: invoiceData.spareParts[i].total,
//                 },
//               },
//             },
//             {
//               new: true,
//               runValidators: true,
//               userFindAndModify: false,
//             }
//           );
//         }
//         res.status(200).json({
//           success: true,
//           message: "invoice update successfully.",
//           data: invoice,
//         });
//       }
//       if (invoiceData.selectPackage) {
//         for (let i = 0; i < invoiceData.selectPackage.length; i++) {
//           var invoice = await Invoice.findByIdAndUpdate(
//             id,
//             {
//               $push: {
//                 selectPackage: {
//                   packageName: invoiceData.selectPackage[i].packageName,
//                   price: invoiceData.selectPackage[i].price,
//                   tax: invoiceData.selectPackage[i].tax,
//                   Quantity: invoiceData.selectPackage[i].Quantity,
//                   discount: invoiceData.selectPackage[i].discount,
//                   total: invoiceData.selectPackage[i].total,
//                 },
//               },
//             },
//             {
//               new: true,
//               runValidators: true,
//               userFindAndModify: false,
//             }
//           );
//         }
//         res.status(200).json({
//           success: true,
//           message: "invoice update successfully.",
//           data: invoice,
//         });
//       }
//     } else if (
//       invoiceData.serviceId ||
//       invoiceData.sparePartsId ||
//       invoiceData.selectPackageId
//     ) {
//       if (invoiceData.serviceId) {
//         const invoice = Invoice.updateOne(
//           { "services._id": invoiceData.serviceId },
//           {
//             $set: {
//               "services.$.serivceName": invoiceData.serviceName,
//               "services.$.price": invoiceData.price,
//               "services.$.tax": invoiceData.tax,
//               "services.$.Quantity": invoiceData.Quantity,
//               "services.$.discount": invoiceData.discount,
//               "services.$.total": invoiceData.total,
//             },
//           },

//           { new: true, runValidators: true, userFindAndModify: false }
//         );

//         res.status(200).json({
//           success: true,
//           message: "invoice update successfully.",
//           data: invoice,
//         });
//       }

//       if (invoiceData.sparePartsId) {
//         const invoice = Invoice.updateOne(
//           { "spareParts._id": invoiceData.sparePartsId },
//           {
//             $set: {
//               "spareParts.$.partsName": invoiceData.partsName,
//               "spareParts.$.price": invoiceData.price,
//               "spareParts.$.tax": invoiceData.tax,
//               "spareParts.$.Quantity": invoiceData.Quantity,
//               "spareParts.$.discount": invoiceData.discount,
//               "spareParts.$.total": invoiceData.total,
//             },
//           },

//           { new: true, runValidators: true, userFindAndModify: false }
//         );

//         res.status(200).json({
//           success: true,
//           message: "invoice update successfully.",
//           data: invoice,
//         });
//       }

//       if (invoiceData.selectPackageId) {
//         const invoice = Invoice.updateOne(
//           { "selectPackage._id": invoiceData.selectPackageId },
//           {
//             $set: {
//               "selectPackage.$.packageName": invoiceData.packageName,
//               "selectPackage.$.price": invoiceData.price,
//               "selectPackage.$.tax": invoiceData.tax,
//               "selectPackage.$.Quantity": invoiceData.Quantity,
//               "selectPackage.$.discount": invoiceData.discount,
//               "selectPackage.$.total": invoiceData.total,
//             },
//           },

//           { new: true, runValidators: true, userFindAndModify: false }
//         );

//         res.status(200).json({
//           success: true,
//           message: "invoice update successfully.",
//           data: invoice,
//         });
//       }
//     } else {
//       const invoice = await Invoice.findByIdAndUpdate(id, invoiceData, {
//         new: true,
//         runValidators: true,
//         userFindAndModify: false,
//       });
//       res.status(200).json({
//         success: true,
//         message: "invoice update successfully.",
//         data: invoice,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Somthing went wrong.");
//   }
// };

exports.updateInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoiceData = req.body;

    if (
      invoiceData.services ||
      invoiceData.spareParts ||
      invoiceData.selectPackage
    ) {
      for (const itemType of ["services", "spareParts", "selectPackage"]) {
        if (invoiceData[itemType]) {
          for (const item of invoiceData[itemType]) {
            const itemId = mongoose.Types.ObjectId(item._id);
            delete item._id; // Remove _id to avoid circular reference
            await Invoice.updateOne(
              { _id: id },
              { $push: { [itemType]: { $each: [{ _id: itemId, ...item }] } } }
            );
          }
        }
      }

      const updatedInvoice = await Invoice.findById(id);
      res.status(200).json({
        success: true,
        message: "Invoice updated successfully.",
        data: updatedInvoice,
      });
    } else if (
      invoiceData.servicesId ||
      invoiceData.sparePartsId ||
      invoiceData.selectPackageId
    ) {
      for (const itemType of ["services", "spareParts", "selectPackage"]) {
        console.log(invoiceData);
        if (invoiceData[`${itemType}Id`]) {
          const updateField = `${itemType}.$`;

          await Invoice.updateOne(
            { [`${itemType}._id`]: invoiceData[`${itemType}Id`] },
            {
              $set: {
                [updateField]: {
                  serviceName: invoiceData.serviceName,
                  price: invoiceData.price,
                  tax: invoiceData.tax,
                  Quantity: invoiceData.Quantity,
                  discount: invoiceData.discount,
                  total: invoiceData.total,
                },
              },
            }
          );
        }
      }

      const updatedInvoice = await Invoice.findById(id);
      res.status(200).json({
        success: true,
        message: "Invoice updated successfully.",
        data: updatedInvoice,
      });
    } else {
      const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoiceData, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        message: "Invoice updated successfully.",
        data: updatedInvoice,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
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
          services: { _id: invoiceData.serviceId },
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
