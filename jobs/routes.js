const express = require("express")
  , Arena = require("bull-arena")
  , { AuthMiddleware } = require("../middlewares/auth");

const GUIConfig = require("./gui/arena");
const router = express.Router();

router.use(
  "/",
  AuthMiddleware(),
  Arena(GUIConfig, {
    disableListen: true,
    basePath: "/jobs/myjob"
  })
);

module.exports = router;