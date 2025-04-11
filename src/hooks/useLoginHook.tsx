import { useState } from "react";
import doLogin from "../api/user.service";

export const useLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const validateForm = (
        username: string,
        password: string
    ): { username?: string; password?: string } => {
        const errors: { username?: string; password?: string } = {};

        if (!username.trim()) errors.username = "Username is required";
        if (!password.trim()) errors.password = "Password is required";

        return errors;
    };

    const handleSubmit = (onSuccess: (res: any) => void) => {
        return async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const validationErrors = validateForm(username, password);
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length > 0) return;

            try {
                setLoading(true);
                setFormError(null);
                const response = await doLogin(username, password);
                onSuccess(response);
            } catch (error: any) {
                setFormError(error.message || "An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        errors,
        formError,
        loading,
        handleSubmit,
    };
};
