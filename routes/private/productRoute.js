import express from 'express'

const productRouter = express.Router()

productRouter.get("/product-list", getListProduct)
productRouter.get("/:id", getProductItem)
productRouter.post("/", createNewProduct)
productRouter.put("/:id", updateProduct )
productRouter.delete("/:id", deleteProduct)