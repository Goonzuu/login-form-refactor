# LoginForm Refactor Challenge

Proyecto creado con el fin de trabajar sobre la logica del formulario Login.

## Tecnologías
- React 18
- TypeScript
- React Testing Library + Jest

## Caracteristicas
- Formulario con validaciones de campos requeridos.
- Tipado completo con TypeScript.
- Tests unitarios y de integración.

## Instalación y uso
```bash
npm install
npm start
```
## Tests
Los tests implementados buscan garantizar el correcto funcionamiento del sistema en dos niveles complementarios: logica y experiencia del usuario. Testear tanto el hook personalizado (useLoginForm) como el componente LoginScreen es clave para asegurarme de cubrir la lógica, los flujos de error/success, y cómo se refleja esto en la interfaz..
```bash
npm test
```

## Codigo original sin refactor

```jsx
import { useCallback, useEffect, useState } from "react";
import doLogin from '../api/user.service'; // doLogin returns a Promise
import './styles.css';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });

  useEffect(() => {
    setErrors({ username: !username, password: !password });
  }, [username, setErrors]);

  const onSubmit = useCallback(() => {
    setLoading(true);
    if (!username || !password) {
      setErrors({ username: !username, password: !password });
      setLoading(false);
    }

    doLogin(username, password);
    setLoading(false);
  }, [setErrors, setLoading]);

  return (
    <form className="login_form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit">{loading ? "Loading" : "Login"}</button>
    </form>
  );
};

export default LoginForm;
```

## Funcion de agrupamiento por mes/año
Para el ejericio se creó una funcion que se encuentra en la ubicacion `src/utils/groupExerciseFunction.ts`

## Ejecucion en consola:

```bash
 npm run group-test
