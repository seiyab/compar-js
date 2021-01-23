import { by } from "./comparator";

describe("by", () => {
  it("string", () => {
    const input = [{ name: "Bob" }, { name: "Alice" }, { name: "Clare" }];
    const output = input.slice().sort(by((x) => x.name));
    expect(output).toEqual([
      { name: "Alice" },
      { name: "Bob" },
      { name: "Clare" },
    ]);
  });

  it("number", () => {
    const input = [...Array(4).keys()];
    const output = input.slice().sort(by((x) => x - 2 * (x % 2) * x));
    expect(output).toEqual([3, 1, 0, 2]);
  });
});
