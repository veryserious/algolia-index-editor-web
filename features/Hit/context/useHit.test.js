import { renderHook, act } from "@testing-library/react";
import { HitProvider, useHit } from "./HitProvider";

// TODO: Add more tests and separate into different test for each function within the hook for better coverage

const mockHit = {
  objectID: "1234",
  name: "test",
  description: "test description",
  image: "https://cdn.fake.com/1.jpg",
  price: 1,
  rating: 1,
  category: "test",
};

test("Check useHit hook", () => {
  const wrapper = ({ children }) => <HitProvider>{children}</HitProvider>;
  const { result } = renderHook(() => useHit(), { wrapper });
  act(() => result.current.setActiveHit(mockHit));
  act(() => result.current.updatePendingHits(mockHit));
  act(() => result.current.updateDeletedHits(mockHit));
  expect(result.current.pendingHits[0]).toBe(mockHit.objectID);
  expect(result.current.deletedHits[0]).toBe(mockHit.objectID);
  expect(result.current.hit).toStrictEqual(mockHit);
});
