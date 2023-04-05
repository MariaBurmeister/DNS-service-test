import { log } from "./logger";

export const connect = async () => {
  setTimeout(() => {}, 2000);
  try {
    await setTimeout(() => {}, 2000);
  } catch (e) {
    log.error("Could not connect to db");
    process.exit(1);
  } finally {
    log.info("DB connected");
  }
};
