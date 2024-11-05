import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
// import { ModeContext } from '../contexts/MainContext';

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { authService } from '../services/token';

import * as Yup from 'yup';

import '../styles/FormLogin.css';

const API = import.meta.env.VITE_API;

export default function FormLogin({ isVisible }) {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required('El nombre de usuario es obligatorio.'),
        password: Yup.string()
            .required('La contraseña es obligatoria.'),
    });
    return (
        <div className="d-flex justify-content-center align-items-center min-h-screen" style={{paddingRight: '200px'}}>
            <Card className="w-full md:w-30rem shadow" style={{ backgroundColor: 'rgba(0, 0, 0, 0.587)'}}> 
                <h1 className="text-white text-center main-font-titles mb-4">Inicia Sesión</h1>
                <Divider className="mb-4" />
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting, setStatus }) => {
                        setLoading(true);
                        setStatus(null);

                        setTimeout(() => {
                            setLoading(false);
                            setSubmitting(false);  
                            (async () => {
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

                            })();
                        }, 2000);

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
                                        className={errors.username && touched.username ? 'p-invalid w-full custom-inputs' : 'w-full custom-inputs text-white'}
                                    />
                                    <label htmlFor="username">Nombre de Usuario</label>
                                </span>
                                {errors.username && touched.username && <Message severity="contrast text-danger p-0" text={errors.username} />}

                                <span className="p-float-label mt-2">
                                    <InputText
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        toggleMask
                                        className={errors.password && touched.password ? 'p-invalid w-full custom-inputs' : 'w-full custom-inputs text-white'}
                                        feedback={false}
                                    />
                                    <label htmlFor="password">Contraseña</label>
                                </span>
                                {errors.password && touched.password && <Message severity="contrast text-danger p-0" text={errors.password} />}
                                {error && (
                                    <Message 
                                        severity="contrast text-danger p-0" 
                                        text={error}
                                        className="mt-1"
                                    />
                                )}

                                <div className='d-flex flex-column justify-content-center align-items-center mt-2'>
                                    <Button
                                        severity="primary"
                                        type='submit'
                                        label="Iniciar Sesión"
                                        icon="pi pi-sign-in"
                                        loading={loading || isSubmitting}
                                        onClick={handleSubmit} 
                                        className="p-button-outlined rounded text-white w-full mt-2"
                                    />
                                    <a
                                        label="Registrarse"
                                        icon="pi pi-user-plus"
                                        onClick={() => isVisible()}
                                        className="redirect-register-form text-white text-decoration-none w-full md:w-auto mt-4 md:mt-0"
                                    >
                                        No tengo cuenta. Registrarme
                                    </a>    
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
}