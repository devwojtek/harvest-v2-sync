const express = require("express")
  , Arena = require("bull-arena")
  , { AuthMiddleware } = require("../middlewares/auth");

const GUIConfig = require("./gui/arena");
const router = express.Router();

const arenaConfig = Arena(GUIConfig, {
  basePath: "/",
  disableListen: true,
});

router.use(
  "/:userId",
  // AuthMiddleware(),
  arenaConfig
);

module.exports = router;
