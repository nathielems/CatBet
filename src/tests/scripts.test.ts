const controller = require("../controllers/catBet.controller")

test(controller.get, async () => {
  
  const data = await controller.get()
  expect(data).toBeTruthy();
});