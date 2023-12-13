import { Router, Request, Response } from "express";
import multer from "multer";

//--USER
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

//--CATEGORY
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

//--PRODUCTS
import { CreateProductController } from "./controllers/products/CreateProductController";
import { ListByCategoryController } from "./controllers/products/ListByCategoryController";

//-- ORDERS
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { AddItemController } from "./controllers/order/AddItemController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";

//Middlewares
import { isAuthenticaded } from "./middlewares/isAuthenticated";
import uploadConfig from "./config/multer";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// -- Rotas User --
router.post("/users", new CreateUserController().handle);

router.post("/login", new AuthUserController().handle);

router.get("/userinfo", isAuthenticaded, new DetailUserController().handle);

//---- ROTAS CATEGORY

router.post("/category", isAuthenticaded, new CreateCategoryController().handle);
router.get("/category", isAuthenticaded, new ListCategoryController().handle);

//-- ROTAS PRODUCTS
router.post("/product", isAuthenticaded, upload.single("file"), new CreateProductController().handle);
router.get("/category/products", isAuthenticaded, new ListByCategoryController().handle);

//-- ROTAS ORDERS
router.post("/order", isAuthenticaded, new CreateOrderController().handle);
router.delete("/order", isAuthenticaded, new RemoveOrderController().handle);

router.post("/order/add", isAuthenticaded, new AddItemController().handle);
router.delete("/order/remove", isAuthenticaded, new RemoveItemController().handle);

router.put("/order/send", isAuthenticaded, new SendOrderController().handle);
router.get("/order/open", isAuthenticaded, new ListOrdersController().handle);
router.get("/order/detail", isAuthenticaded, new DetailOrderController().handle);
router.put("/order/close", isAuthenticaded, new FinishOrderController().handle);

export { router };
