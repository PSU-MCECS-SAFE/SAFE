import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

/**
 * This is sample test file provided by the template, use it to both do your
 * own research and learn how to write tests for your specific section of the
 * project. This test will actually passed due to the import of 'App' calling
 * the template demo generate when making a new project.
 *
 * - Alex
 */

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
