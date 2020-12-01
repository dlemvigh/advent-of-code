import { isFoo } from "./foo"

test('should return true given foo', () => {
  expect(isFoo("foo")).toBe(true)
})