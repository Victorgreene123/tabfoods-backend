import ordermodel from "../models/orders.js";

// Controller to add a new order
export const addOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order created', order: savedOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Controller to get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await ordermodel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to update order details
export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await ordermodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Order updated', order: updatedOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to cancel an order
export const cancelOrder = async (req, res) => {
    try {
        const canceledOrder = await ordermodel.findByIdAndUpdate(req.params.id, { status: 'canceled' }, { new: true });
        res.status(200).json({ message: 'Order canceled', order: canceledOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};