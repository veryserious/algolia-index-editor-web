import { renderHook, act } from "@testing-library/react";
import { ModalProvider, useModal } from "./ModalProvider";

// TODO: Add component test for Modal to ensure that Modal is rendered when toggling modal state

test("Test useModal hook", () => {
  const wrapper = ({ children }) => <ModalProvider>{children}</ModalProvider>;
  const { result } = renderHook(() => useModal(), { wrapper });
  expect(result.current.open).toBe(false);
  act(() => result.current.toggle());
  expect(result.current.open).toBe(true);
});
