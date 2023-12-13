import { Request, Response } from "express";

import { DetailOrderSerivce } from "../../services/order/DetailOrderService";

class DetailOrderController {
	async handle(req: Request, res: Response) {
		const order_id = req.query.order_id as string;

		const detailOrder = new DetailOrderSerivce();

		const order = await detailOrder.execute({
			order_id,
		});
		return res.json(order);
	}
}

export { DetailOrderController };
