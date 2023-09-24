import { describe, afterEach, it, vi, expect } from "vitest";
import fs from "fs";
import { getMetaData } from "./posts";
import path from "path";

describe("getMetaData", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should return posts meta data", () => {
    //@ts-ignore
    vi.spyOn(fs, "readdirSync").mockImplementation(() => ["TESTFILE.md"]);

    const result = getMetaData(path.join(process.cwd(), "scripts/TESTFILE.md"));

    expect(result).to.be.an("Object");
    expect(result).to.have.keys("title", "date");
    expect(result.title).toBe("Test Title");
    expect(result.date).toBe("2001-08-12");
  });
});
