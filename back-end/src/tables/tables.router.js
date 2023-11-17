const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/").get(controller.list);
router.route("/new")
router.route("/:table_id/seat")

module.exports = router;