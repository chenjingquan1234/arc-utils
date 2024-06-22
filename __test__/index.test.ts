import { is } from "../packages/index";
describe("isNull", () => {
  it("should return true if the value is null", () => {
    // const result = a(null);
    const result = is.isEmptyVal(null);
    expect(result).toBe(true);
  });

  it("should return false if the value is not null", () => {
    const result = is.aaa("11");
    expect(result).toBe("11");
  });
});
