const express = require("express")
const authorizeRoles = require("../middlewares/roleMiddleware")
const verifyToken = require("../middlewares/authMiddleware")
const {browseStore} = require("../controllers/browseController")
const {getProducts} = require("../controllers/browseController")
const {getCheckout} = require("../controllers/browseController")
const {getOrders} = require("../controllers/browseController")
const router = express.Router();

//users
router.get("/browse",verifyToken,authorizeRoles("admin","manager","user"),browseStore)
router.get("/get-product",verifyToken,authorizeRoles("admin","manager","user"),getProducts)
router.post("/checkout",verifyToken,authorizeRoles("admin","manager","user"),getCheckout)
router.get("/get-orders",verifyToken,authorizeRoles("admin","manager","user"),getOrders)

module.exports = router;