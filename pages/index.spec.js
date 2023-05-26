import { render, screen } from "@testing-library/react";
import HomePage from "./index.page";

describe("home page", () => {
  it("title", () => {
    render(<HomePage />);

    const heading = screen.queryByText(
      "Discover and deploy boilerplate example Next.js projects."
    );

    expect(heading).toBeInTheDocument();
  });
});
