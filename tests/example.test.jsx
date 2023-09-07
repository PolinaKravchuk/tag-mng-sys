import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

test("renders 'Welcome' message", () => {
  render(<Home />);
  const element = screen.getByRole("welcome");
  expect(element).toBeInTheDocument();
});
