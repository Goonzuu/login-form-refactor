import { useState } from "react";
import "./styles.css";
import doLogin from "../../api/user.service";
import CustomInput from "../../components/CustomInput/CustomInput";

const LoginScreen = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);

    const validateForm = (
        username: string,
        password: string
    ): { username?: string; password?: string } => {
        const errors: { username?: string; password?: string } = {};

        if (!username.trim()) {
            errors.username = "Username is required";
        }

        if (!password.trim()) {
            errors.password = "Password is required";
        }

        return errors;
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateForm(username, password);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            setLoading(true);
            setFormError(null);

            const response = await doLogin(username, password);
            console.log(response);
        } catch (error: any) {
            console.error("Login failed:", error);
            setFormError(error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };



    return (
        <form className="login_form" onSubmit={handleSubmit}>
            {formError && (
                <p className="form-error-message" role="alert">
                    {formError}
                </p>
            )}
            <CustomInput
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                name="username"
                label="Username"
                error={Boolean(errors.username)}
                errorMessage={errors.username}
            />

            <CustomInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                name="password"
                label="Password"
                error={Boolean(errors.password)}
                errorMessage={errors.password}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>

        </form>
    );
};

export default LoginScreen;
