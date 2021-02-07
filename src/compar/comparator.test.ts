import { by, byKey } from "./comparator";

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

  describe("maybe number", () => {
    const input = [
      { name: "A", height: 4 },
      { name: "B" },
      { name: "C", height: 5 },
    ];
    const table = [
      ["asc", "first", ["B", "A", "C"]],
      ["asc", "last", ["A", "C", "B"]],
      ["asc", "min", ["B", "A", "C"]],
      ["asc", "max", ["A", "C", "B"]],
      ["desc", "first", ["B", "C", "A"]],
      ["desc", "last", ["C", "A", "B"]],
      ["desc", "min", ["C", "A", "B"]],
      ["desc", "max", ["B", "C", "A"]],
    ] as const;
    it.each(table)("order: %s, empty: %s", (order, empty, expected) => {
      const output = input.slice().sort(by((x) => x.height, { empty, order }));
      expect(output.map((x) => x.name)).toEqual(expected);
    });
  });
});

describe("byKey", () => {
  it("string", () => {
    const input = [{ name: "Bob" }, { name: "Alice" }, { name: "Clare" }];
    const output = input.slice().sort(byKey("name"));
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

  it("maybe number", () => {
    const input = [{ height: 10 }, { height: 30 }, {}];
    const output = input.slice().sort(byKey("height", { empty: "first" }));
    byKey("z" as const);
    expect(output).toEqual([{}, { height: 10 }, { height: 30 }]);
  });
});
