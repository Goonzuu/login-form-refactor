import { renderHook, act } from "@testing-library/react";
import { useLoginForm } from "./useLoginForm";
import doLogin from "../api/user.service";

jest.mock("../api/user.service");

describe("useLoginForm", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test("retorna errores si los campos están vacíos", async () => {
      const { result } = renderHook(() => useLoginForm());
  
      await act(async () => {
        await result.current.handleSubmit(() => {})({ preventDefault: () => {} } as any);
      });
  
      expect(result.current.errors).toEqual({
        username: "Username is required",
        password: "Password is required",
      });
  
      expect(doLogin).not.toHaveBeenCalled();
    });
  
    test("llama a doLogin si los campos son válidos", async () => {
      (doLogin as jest.Mock).mockResolvedValue("Login successful");
  
      const { result } = renderHook(() => useLoginForm());
  
      act(() => {
        result.current.setUsername("admin");
        result.current.setPassword("1234");
      });
  
      await act(async () => {
        await result.current.handleSubmit(() => {})({ preventDefault: () => {} } as any);
      });
  
      expect(doLogin).toHaveBeenCalledWith("admin", "1234");
      expect(result.current.successMessage).toBe("Successfully logged!");
      expect(result.current.formError).toBe(null);
    });
  });