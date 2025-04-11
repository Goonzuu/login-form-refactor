const doLogin = (username: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "1234") {
          resolve("Login successful");
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };
  
  export default doLogin;
  