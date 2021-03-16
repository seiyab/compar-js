import { byKey } from "./comparator";
import { flow } from "./combinator";

describe("flow", () => {
  const input = [
    { id: 0, name: "Bob", age: 30 },
    { id: 1, name: "Alice", age: 20 },
    { id: 2, name: "Clare", age: 30 },
    { id: 3, name: "Bob", age: 20 },
    { id: 4, name: "Clare", age: 30 },
  ];

  it("multiple", () => {
    const output = input
      .slice()
      .sort(flow(byKey("name"), byKey("age"), byKey("id")));
    expect(output).toEqual([
      { id: 1, name: "Alice", age: 20 },
      { id: 3, name: "Bob", age: 20 },
      { id: 0, name: "Bob", age: 30 },
      { id: 2, name: "Clare", age: 30 },
      { id: 4, name: "Clare", age: 30 },
    ]);
  });

  it("single (it doesn't make sense. only for test.)", () => {
    const output = input.slice().sort(flow(byKey("name")));

    expect(output[0].name).toBe("Alice");
    expect(output[1].name).toBe("Bob");
    expect(output[2].name).toBe("Bob");
    expect(output[3].name).toBe("Clare");
    expect(output[4].name).toBe("Clare");
  });
});
