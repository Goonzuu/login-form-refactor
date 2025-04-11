import CustomInput from "../../components/CustomInput/CustomInput";
import { useLoginForm } from "../../hooks/useLoginHook";
import "./styles.css";

const LoginScreen = () => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        errors,
        formError,
        loading,
        handleSubmit,
        successMessage,
    } = useLoginForm();

    const onSubmit = handleSubmit((res) => console.log("Logged!", res));

    return (
        <div className="login-page">
            <form className="login_form" onSubmit={onSubmit}>
                <h2 className="login-title">Login to your account</h2>
                {formError && (
                    <p className="form-error-message" role="alert">
                        {formError}
                    </p>
                )}
                {successMessage && (
                    <p className="success-message" role="status">
                        {successMessage}
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
                    disabled={loading}
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
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginScreen;