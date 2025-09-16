import express from "express";
import {register, login} from '../controllers/authControllers.js'

const router = express.router()

router.post("/register", register);
router.post("/login", login);
