import { render } from "@testing-library/react";
import Dashboard from "../pages/index";

it("renders homepage unchanged", () => {
  const { container } = render(<Dashboard />);
  expect(container).toMatchSnapshot();
});
