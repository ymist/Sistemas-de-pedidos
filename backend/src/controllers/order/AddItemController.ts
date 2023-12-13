import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
	async handle(req: Request, res: Response) {
		const { amount, order_id, product_id } = req.body;

		const addItem = new AddItemService();

		const item = await addItem.execute({
			amount,
			order_id,
			product_id,
		});
		return res.json(item);
	}
}

export { AddItemController };
