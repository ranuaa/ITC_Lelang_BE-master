
const express = require("express");
const router = express.Router();

const {createBid, getBids, getBidById} = require("../controllers/BidLelang");

router.post("/", createBid);