import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/client";
import { SignInButton } from ".";

process.env.DISABLE_MOCKED_WARNING = "true";

jest.mock("next-auth/client");
const useSessionMocked = mocked(useSession);

describe(":: components :: SignInButton", () => {
  it("renders correctly when user is not authenticated", () => {
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Entrar com Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
