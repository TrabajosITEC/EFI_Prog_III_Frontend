import { Formik, Form } from 'formik';
import { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import * as Yup from 'yup';
import { authService } from '../services/token';
const API = import.meta.env.VITE_API;

export default function FormRegister({ isVisible }) {

    const [error, setError] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required('El nombre de usuario es obligatorio.')
            .test(
                'len',
                'El nombre de usuario debe tener entre 3 y 15 caracteres (sin contar espacios)',
                function (value) {
                    if (!value) return false;
                    const trimmedValue = value.replace(/\s+/g, '');
                    return trimmedValue.length >= 3 && trimmedValue.length <= 15;
                }
            ),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*\d).{1,8}$/,
                'La contraseña debe tener al menos una mayúscula, al menos un número y como máximo 8 caracteres'
            )
            .required('La contraseña es obligatoria.'),
        email: Yup.string().email('Correo electrónico inválido.')
            .required('El correo electrónico es obligatorio.')
    });

    return (
        <div className="d-flex justify-content-center align-items-center min-h-screen" style={{ paddingRight: '200px' }}>
            <Card className="w-full md:w-30rem shadow-8" style={{ backgroundColor: 'rgba(0, 0, 0, 0.587)' }}>
                <h1 className="text-center text-white mb-4 main-font-titles">Crea tu cuenta</h1>
                <Divider className="mb-4" />
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        email: '',
                        role: 'gamer',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting, setStatus }) => {
                        setLoading(true);
                        setStatus(null); // Limpiar cualquier estado previo

                        (async () => {
                            try {
                                console.log("Intentando registrar con los valores:", values);

                                const response = await fetch(`${API}/user`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(values),
                                });

                                console.log("Estado de la respuesta:", response.status);

                                if (!response.ok) {
                                    const errorData = await response.json();
                                    throw new Error(errorData);
                                }

                                const userData = await response.json();
                                console.log("Registro exitoso. Datos del usuario:", userData);

                                try {
                                    console.log("Intentando registrar con los valores:", values);
    
                                    const response = await fetch(`${API}/login`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(values),
                                    });

                                    const data = await response.json();
                                    if (!response.ok) {
                                        authService.removeToken();
                                        throw new Error(data);
                                    }
                                    
                                    authService.setToken(data.token)

                                    console.log("Registro exitoso. Datos del usuario:", data);
                                    navigate("/");
                                    // navigate("/home",  { state: { userActive : values.username } });

                                } catch (error) {
                                    console.error("Error de registro:", error);
                                    setStatus(`Error: ${error.message}`);
                                    setError(error.message);
                                } finally {
                                    setLoading(false);
                                    setSubmitting(false);
                                }
                            } catch (error) {
                                console.error("Error de registro:", error.message);

                                setError(error.message)
                            } finally {
                                setLoading(false);
                                setSubmitting(false);
                            }
                        })();
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
                        <Form>
                            <div className="flex flex-column gap-4">
                                <span className="p-float-label mt-3">
                                    <InputText
                                        id="username"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.username && touched.username ? 'p-invalid w-full custom-inputs text-white' : 'w-full custom-inputs text-white'}
                                    />
                                    <label htmlFor="username">Nombre de Usuario</label>
                                </span>
                                {errors.username && touched.username && <Message severity="contrast text-danger p-0" text={errors.username} />}

                                <span className="p-float-label mt-2">
                                    <InputText
                                        type='password'
                                        id="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        toggleMask
                                        className={errors.password && touched.password ? 'p-invalid w-full custom-inputs text-white' : 'w-full custom-inputs text-white'}
                                        feedback={true}
                                    />
                                    <label htmlFor="password">Contraseña</label>
                                </span>
                                {errors.password && touched.password && <Message severity="contrast text-danger p-0" text={errors.password} />}

                                <span className="p-float-label mt-2">
                                    <InputText
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.email && touched.email ? 'p-invalid w-full custom-inputs text-white' : 'w-full custom-inputs text-white'}
                                    />
                                    <label htmlFor="email">Correo Electrónico</label>
                                </span>
                                {errors.email && touched.email && <Message severity="contrast text-danger p-0" text={errors.email} />}
                                {status && <Message severity="contrast text-danger p-0" text={status} />}
                                <Button
                                    type='submit'
                                    label="Registrarse"
                                    icon="pi pi-user-plus"
                                    loading={loading || isSubmitting}
                                    onClick={handleSubmit}
                                    className="p-button-outlined text-white rounded w-full mt-4 rounded"
                                />
                                <a
                                    label="Volver a inicio"
                                    icon="pi pi-home"
                                    onClick={() => isVisible()}
                                    className="text-center redirect-register-form text-white text-decoration-none w-full md:w-auto mt-1 md:mt-0"
                                >
                                    Ya tengo cuenta. Iniciar Sesión
                                </a>
                                    {error && (
                                    <Message 
                                        severity="contrast text-danger p-0" 
                                        text={error}
                                        className="mt-3"
                                    />
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
}