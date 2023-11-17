/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.list);
router.route("/:date")
router.route("/new")
router.route("/:reservation_id/seat")
router.route("/:reservation_id/edit")
router.route("/:reservation_id/status")




module.exports = router;
