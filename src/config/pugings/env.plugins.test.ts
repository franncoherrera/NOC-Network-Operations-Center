import { envs } from "./env.plugins";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "franncoherrera2011@gmail.com",
      MAILER_SECRET_KEY: "uxsdtwvjrnrlonci",
      PROD: false,
      MONGO_URL: "mongodb://franco:123456@localhost:27017/",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "franco",
      MONGO_PASS: "123456",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";
    try {
      await import("./env.plugins");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
