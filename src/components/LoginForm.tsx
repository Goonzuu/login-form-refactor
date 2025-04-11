import { useState } from "react";
import "../styles/styles.css";

const LoginForm = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});


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


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateForm(username, password);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

    };


    return (
        <form className="login_form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={errors.username ? "error" : ""}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "error" : ""}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
