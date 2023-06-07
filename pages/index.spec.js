import { fireEvent, render, screen } from "@testing-library/react";
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

  describe("interactions", () => {
    describe("Animated Cursor Component", () => {
      it("should active when mousedown", async () => {
        setup();
        const canvas = screen.queryByTestId("canvas_matrix");
        await fireEvent.mouseDown(canvas);
        const cursorOuter = screen.queryByTestId("cursorOuter");
        const cursorInner = screen.queryByTestId("cursorInner");

        expect(cursorOuter).toHaveStyle("transform: scale(5); opacity: 1;");
        expect(cursorInner).toHaveStyle("transform: scale(0.7); opacity: 1;");
      });
    });
  });
});
