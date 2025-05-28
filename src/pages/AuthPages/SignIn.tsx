import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta';
import logoCesde from '../../assets/Images/logo-Cesde-2023.svg';
import logoCesde2 from '../../assets/Images/logo-cesde-2.png';
import './Login.css';

type FormData = {
  cedula: string;
  contrasena: string;
};

type Usuario = {
  cedula: string;
  contrasena: string;
  nombre: string;
  tipo: "ESTUDIANTE" | "DOCENTE";
};

type SignInProps = {
  onLogin: (nombre: string) => void;
};

const usuariosMock: Usuario[] = [
  {
    cedula: "8543683603",
    contrasena: "FeMa8543",
    nombre: "Fernando Martínez",
    tipo: "ESTUDIANTE",
  },
  {
    cedula: "8429142591",
    contrasena: "HeEs8429",
    nombre: "Helena Alejandra Escobar",
    tipo: "DOCENTE",
  },
];

export default function SignIn({ onLogin }: SignInProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onsubmited: SubmitHandler<FormData> = async (data) => {
    // Busca usuario en mock
    const user = usuariosMock.find(
      (u) => u.cedula === data.cedula && u.contrasena === data.contrasena
    );

    if (user) {
      // Guardar usuario en localStorage (sin token porque no hay backend)
      localStorage.setItem("usuario", JSON.stringify(user));

      onLogin(user.nombre);
      navigate("/dashboard");
    } else {
      alert("Cédula o contraseña incorrecta");
    }
  };

  return (
    <>
      <PageMeta
        title="Inicio de sesión | Cesde Academy"
        description="Accede a la plataforma Cesde Academy con tu cédula y contraseña"
      />

      <div className="login-wrapper">
        <div className="login-left">
          <img src={logoCesde2} alt="Logo CESDE" className="login-left-logo" />
          <h2 className="login-left-title">Bienvenido a Cesde Academy</h2>
          <p className="login-left-text">
            La plataforma donde desarrollas tu potencial, accedes a contenido exclusivo y gestionas tu proceso académico de manera dinámica. Conoce notas, actividades, horarios y programaciones.
          </p>
        </div>

        <div className="login-right">
          <div className="login-card">
            <div className="text-center mb-4">
              <img src={logoCesde} alt="Logo CESDE" className="login-logo" />
              <h4 className="login-title">Iniciar sesión</h4>
            </div>

            <form onSubmit={handleSubmit(onsubmited)}>
              <div className="form-group">
                <label htmlFor="cedula">Cédula</label>
                <input
                  type="text"
                  id="cedula"
                  className="form-control"
                  {...register("cedula", { required: "Este campo es obligatorio" })}
                />
                {errors.cedula && <p className="error">{errors.cedula.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="contrasena">Contraseña</label>
                <input
                  type="password"
                  id="contrasena"
                  className="form-control"
                  {...register("contrasena", { required: "Este campo es obligatorio" })}
                />
                {errors.contrasena && <p className="error">{errors.contrasena.message}</p>}
              </div>

              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="check1" />
                <label className="form-check-label" htmlFor="check1">Recordarme</label>
              </div>

              <button type="submit" className="btn login-button mb-3">Ingresar</button>

              <div className="text-center mb-3">
                <p className="forgot-password text-muted">¿Olvidaste tu contraseña?</p>
              </div>

              <button className="btn btn-microsoft" type="button">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                  alt="Microsoft Logo"
                  className="microsoft-logo"
                />
                <span>Iniciar con Microsoft</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
