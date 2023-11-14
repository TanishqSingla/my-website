import { describe, it, expect } from "vitest";
import { getMetaData } from "./posts";
import path from "path";

describe("getMetaData", () => {
	it("should return posts meta data", () => {
		const result = getMetaData(path.join(process.cwd(), "scripts/TESTFILE.md"));

		expect(result).to.be.an("Object");
		expect(result).to.have.keys("title", "date");
		expect(result.title).toBe("Test Title");
		expect(result.date).toBe("2001-08-12");
	});
});
