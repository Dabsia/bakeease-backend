import mongoose from "mongoose";

const deliveryDateSchema = new mongoose.Schema({
    deliveryDate: {
        type: Date,
        default: Date.now,
      }
})

const DeliveryDate = mongoose.model("DeliveryDate", deliveryDateSchema)

export default DeliveryDate