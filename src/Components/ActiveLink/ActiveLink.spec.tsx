import { render } from "@testing-library/react";
import { ActiveLink } from ".";

process.env.DISABLE_MOCKED_WARNING = "true";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe(":: components :: ActiveLink", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );

    expect(getByText("Home")).toBeInTheDocument();
  });

  it("adds active class if the link as currently active", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );

    expect(getByText("Home")).toHaveClass("active");
  });
});
