import { render, screen } from "@testing-library/react";
import HomePage from "./index.page";

describe("Home page", () => {
  const setup = () => {
    render(<HomePage />);
  };

  describe("layout", () => {
    it("has matrix canvas in the document", () => {
      setup();
      const canvas = screen.queryByTestId("canvas_matrix");
      expect(canvas).toBeInTheDocument();
    });
  });
});
