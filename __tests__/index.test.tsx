import { render, screen } from "@testing-library/react";
import Dashboard from "@/pages/index";

describe("Dashboard", () => {
  it("renders the title", () => {
    render(<Dashboard />);

    const heading = screen.getByRole("heading", {
      name: /SEARCH/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
