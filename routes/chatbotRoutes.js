const express = require("express");
const {
  Connect_Dialog,
  CreateIntent,
  ListIntent,
  ListTraningPhase,
  CreateAgent,
  UpdateIntent,
  DeleteIntent,
  // DetectIntent,
} = require("../controllers/chatbotController");
const {
  CreateEntity,
  listEntityTypesAsync,
  checkBatchDeleteEntitiesProgress,
} = require("../controllers/entityController");
const { handleWebhook } = require("../controllers/webhook");
const router = express.Router();
router.post("/text", Connect_Dialog);
router.post("/createIntent", CreateIntent);
router.get("/listIntents", ListIntent);
router.get("/listTraningPhase/:id", ListTraningPhase);

router.post("/createAgent", CreateAgent);
router.put("/updateIntent/:id", UpdateIntent);
router.delete("deleteIntent/:id", DeleteIntent);

router.post("/handleWebhook", handleWebhook);
router.post("/createEntity", CreateEntity);
router.get("/listEntityTypesAsync", listEntityTypesAsync);
router.delete(
  "/checkBatchDeleteEntitiesProgress",
  checkBatchDeleteEntitiesProgress
);

module.exports = router;
