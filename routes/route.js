const express = require("express");
const router = express.Router();
const modules = require("../modules");
const schemas = require("../schema/schema");
const { validateschema } = require("../middleware/validateschema");
router.post("/resister", validateschema(schemas.resister), modules.register);
router.get("/profile", modules.getuserdata);
module.exports = router;
