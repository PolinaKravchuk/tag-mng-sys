import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("renders 'Get started by editing' message", async () => {
  render(<Home />);
  const homeTitleEl = await screen.findByTestId("homeTitle");
  expect(homeTitleEl).toBeInTheDocument();
});
