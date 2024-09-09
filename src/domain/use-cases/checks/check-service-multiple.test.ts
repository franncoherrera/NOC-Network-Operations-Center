import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("CheckServiceMultiple UseCase", () => {
  const mockRepository = [
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
  ];

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    mockRepository,
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const wasOk = await checkService.execute("https://google.com");
    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    for (const mockRepositoryItem of mockRepository) {
      expect(mockRepositoryItem.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity)
      );
    }
  });

  test("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkService.execute(
      "https://goasdfasdfasdfasdogle.com"
    );

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    for (const mockRepositoryItem of mockRepository) {
      expect(mockRepositoryItem.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity)
      );
    }
  });
});
