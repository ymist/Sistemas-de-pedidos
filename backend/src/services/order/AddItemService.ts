import prismaClient from "../../prisma";

interface ItemRequest {
	amount: number;
	order_id: string;
	product_id: string;
}

class AddItemService {
	async execute({ amount, order_id, product_id }: ItemRequest) {
		const items = await prismaClient.item.create({
			data: {
				amount,
				order_id: order_id,
				product_id: product_id,
			},
		});
		return items;
	}
}

export { AddItemService };
