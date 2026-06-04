import Order from "../models/Order.model.js";
import { sendEmail } from "../services/sendEmail.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "tiarasbreadhub@gmail.com";

// POST /api/v1/checkout/place-order
export const placeOrder = async (req, res) => {
  try {
    const {
      items,
      customer,
      subtotal,
      total,
      paymentMethod,
      paymentReference,
    } = req.body;

    if (!items?.length)
      return res.status(400).json({ message: "Cart is empty" });

    if (
      !customer?.firstName ||
      !customer?.lastName ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.streetAddress ||
      !customer?.city ||
      !customer?.postcode
    )
      return res
        .status(400)
        .json({ message: "Missing required billing fields" });

    if (!paymentMethod)
      return res.status(400).json({ message: "Payment method is required" });

    if (!paymentReference)
      return res.status(400).json({ message: "Payment reference is required" });

    const orderItems = items.map((item) => ({
      product: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      country: customer.country || "Estonia",
      streetAddress: customer.streetAddress,
      postcode: customer.postcode,
      city: customer.city,
      additionalInfo: customer.additionalInfo || "",
      user: req.user?._id || null,
      items: orderItems,
      subtotal,
      shippingCost: 0,
      total,
      paymentMethod,
      paymentReference,
      paymentStatus: "pending",
    });

    try {
      await sendEmail({
        to: ADMIN_EMAIL,
        replyTo: order.email,
        subject: `${order.firstName} ${order.lastName} just placed an order`,
        html: `
        <h1>New Order Received</h1>
        <p><strong>Customer:</strong> ${order.firstName} ${order.lastName}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Total:</strong> €${order.total}</p>
        <p><strong>Payment method:</strong> ${order.paymentMethod}</p>
        <p><strong>Payment reference:</strong> ${order.paymentReference}</p>
        <p><strong>Items:</strong> ${order.items
          .map((i) => `${i.name} x${i.quantity}`)
          .join(", ")}</p>
        <a href='https://tiarasbread.netlify.app/admin'>View order in admin</a>
      `,
      });
    } catch (err) {
      console.error("Order notification email failed:", err.message);
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
};
