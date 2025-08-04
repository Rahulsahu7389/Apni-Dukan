const express = require("express")
const authorizeRoles = require("../middlewares/roleMiddleware")
const {AddProducts, deleteOrders} = require("../controllers/managerController")
const verifyToken = require("../middlewares/authMiddleware")
const {CreateStore} = require("../controllers/managerController")
const router = express.Router();

router.post("/create-store",verifyToken,authorizeRoles("admin","manager"),CreateStore)
router.post("/add-products",verifyToken,authorizeRoles("admin","manager"),AddProducts)
router.delete("/remove-order",verifyToken,authorizeRoles("admin","manager"),deleteOrders)

module.exports = router;