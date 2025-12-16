import { describe, it, expect } from "vitest";
import { simpleILP, simpleILP1D, simpleILP2D } from "./ilp";

describe("ILP Module", () => {
    it("simple test", () => {
        expect(simpleILP()).toBe(14400);
    })

    it("simple 1D test", () => {
        expect(simpleILP1D()).toBe(20);
    })

    it("simple 2D test", () => {
        expect(simpleILP2D()).toBe(15);
    })
})