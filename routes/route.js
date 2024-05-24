const express = require("express");
const router = express.Router();
const modules = require("../modules");
const schemas = require("../schema/schema");
const verifyToken = require("../middleware/verifyToken");
const { validateschema } = require("../middleware/validateschema");

// router.post("/register", validateschema(schemas.resister), modules.register);

// router.get("/profile", verifyToken, modules.getuserdata);
// router.post("/login", modules.login);
// router.get("/logout", verifyToken, modules.logout);
// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const modules = require('../modules');
// const validateschema = require('../middleware/validateschema');
// const verifyToken = require('../middleware/verifyToken');
// const schemas = require('../schemas');

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       pincode:
 *         type: string
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - User
 *     description: Register a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             pincode:
 *               type: number
 *             addr:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/register", validateschema(schemas.resister), modules.register);

/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *       - User
 *     description: Get user data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/profile", verifyToken, modules.getuserdata);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     description: Login a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: credentials
 *         description: User login credentials
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/login", modules.login);

/**
 * @swagger
 * /logout:
 *   get:
 *     tags:
 *       - User
 *     description: Logout a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/logout", verifyToken, modules.logout);

module.exports = router;
