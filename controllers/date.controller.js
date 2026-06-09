import DeliveryDate from "../models/Date.model.js";

export const updateDate = async (req, res)=> {
    const {deliveryDate} = req.body
    if (!deliveryDate) {
        return res.status(400).json({ message: "Delivery Date is required" });
    }
    try {
        const updatedDate = await DeliveryDate.findOneAndUpdate(
            {},
            { deliveryDate },
            { returnDocument: 'after', upsert: true }
          );
          
            return res.status(200).json({
              success: true,
              data: updatedDate,
            });
      } catch (error) {
        console.error("Creation error:", error); 
        return res.status(500).json({ message: "Something went wrong" });
      }
}

export const getDate = async (req, res)=> {
    try {
        const date= await DeliveryDate.find();
        const updatedDate = date[0]
        return res.status(200).json({
          success: true,
          data: updatedDate,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message || "Failed to fetch date",
        });
      }
}