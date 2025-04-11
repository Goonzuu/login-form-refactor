import { render, screen, fireEvent } from "@testing-library/react";
import LoginScreen from "./LoginScreen";
import doLogin from "../../api/user.service";

jest.mock("../../api/user.service");

describe("LoginScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("mostrar error si hay empty fields", async () => {
        render(<LoginScreen />);

        const submitBtn = screen.getByRole("button", { name: /login/i });
        fireEvent.click(submitBtn);

        expect(await screen.findByText("Username is required")).toBeInTheDocument();
        expect(await screen.findByText("Password is required")).toBeInTheDocument();
    });

    test("mensaje success cuando doLogin resuelve", async () => {
        (doLogin as jest.Mock).mockResolvedValueOnce("Login successful");

        render(<LoginScreen />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "admin" },
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "1234" },
        });

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        expect(await screen.findByText("Successfully logged!")).toBeInTheDocument();
    });

    test("ensaje de error si doLogin falla", async () => {
        (doLogin as jest.Mock).mockRejectedValueOnce(new Error("Invalid credentials"));

        render(<LoginScreen />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "wronguser" },
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "wrongpass" },
        });

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    });
});