const router = require("express").Router();

const cardController = require("../controllers/cardController");

//Setting routes (/api/card)
router.get("/search", cardController.search);

module.exports = router;
