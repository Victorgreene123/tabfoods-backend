import ordermodel from "../models/orders";

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