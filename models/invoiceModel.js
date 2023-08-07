const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  mobileNo: {
    type: String,
  }, 
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  taxNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  chassisNumber: {
    type: String,
  },
  engineNumber: {
    type: String,
  },
  remark: {
    type: String,
  },
  vehicleType: {
    type: String,
  },
  vehicleCompany: {
    type: String,
  },
  vehicleModel: {
    type: String,
  },
  kilometer: {
    type: String,
  },
  fuelType: {
    type: String,
  },
  fuelIndicator: {
    type: String,
  },
  repiarTag: {
    type: Array,
  },
  services: [
    {
      serviceName: {
        type: String,
      },
      price: {
        type: Number,
      },
      tax: {
        type: Number,
      },
      Quantity: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      total: {
        type: Number,
      },
    },
  ],
  spareParts: [
    {
      partsName: {
        type: String,
      },
      price: {
        type: Number,
      },
      tax: {
        type: Number,
      },
      Quantity: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      total: {
        type: Number,
      },
    },
  ],
  selectPackage: [
    {
      packageName: {
        type: String,
      },
      price: {
        type: Number,
      },
      tax: {
        type: Number,
      },
      Quantity: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      total: {
        type: Number,
      },
    },
  ],
  isGst: {
    type: Boolean,
  },
  gstNo: {
    type: String,
  },
  status: {
    type: String,
  },
  totalPayment: {
    type: Number,
  },
  receivePayment: {
    type: Number,
  },
  duePayment: {
    type: Number,
  },
  isPaymentStatus: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
invoiceSchema.set("timestamps", true);
module.exports = mongoose.model("Invoice", invoiceSchema);
