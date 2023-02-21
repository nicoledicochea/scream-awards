const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");

router.put("/addFave", movieController.addFave);
router.get("/", movieController.getMovies);
router.get("/wrong", movieController.getWrong);
router.get("/ranking", movieController.getRanking);
router.put("/updateVote/:id", movieController.updateVote);

module.exports = router;
