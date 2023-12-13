import { Request, Response } from "express";

import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrdersController {
	async handle(req: Request, res: Response) {
		const listOrders = new ListOrderService();

		const order = await listOrders.execute();
		return res.json(order);
	}
}

export { ListOrdersController };
