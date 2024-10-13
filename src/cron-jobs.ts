// import cron from "node-cron";
// import { sendEmail } from "./email.service";
// import { getAllUsers } from "./user.service";

// // this is for test
// cron.schedule("* * * * *", async () => {
//   console.log("Running job every minute...");

//   const users = await getAllUsers();

//   for (const user of users) {
//     await sendEmail(
//       user.email,
//       "Check out new products!",
//       "Hi! Check out the latest products on our website."
//     );
//   }

//   console.log("Emails sent to all users.");
// });
// ///////////////////////////////////////////////
// // Schedule a job to run every Monday at 9 AM
// cron.schedule("0 9 * * 1", async () => {
//   console.log("Running weekly email job...");

//   const users = await getAllUsers();

//   for (const user of users) {
//     await sendEmail(
//       user.email,
//       "Check out new products!",
//       "Hi! Check out the latest products on our website."
//     );
//   }

//   console.log("Weekly emails sent to all users.");
// });
