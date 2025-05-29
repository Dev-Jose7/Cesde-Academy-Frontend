import { useUser, Usuario } from '../../context/UserContext'; 
import SignIn from './SignIn';

export default function SignInWrapper() {
  const { setUsuario } = useUser();

  const handleLogin = (usuario: Usuario) => {
    setUsuario(usuario);
  };

  return <SignIn onLogin={handleLogin} />;
}
