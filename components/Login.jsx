import { Formik, Form } from 'formik';
import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { ModeContext } from '../contexts/MainContext';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import * as Yup from 'yup';

const API = import.meta.env.VITE_API;

export default function FormLogin() {
    // const { userActive, setUserActive } = useContext(ModeContext);
    // const usuariosRegistrados = JSON.parse(localStorage.getItem('listausuarios')) || [];
  //   const usuariosRegistrados = async () => await fetch(`${API}/user`, {
  //     method: "GET",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  // });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required('Debe ingresar un nombre de usuario')
            // .test(
            //     'checkUser',
            //     'El nombre de usuario no existe',
            //     function(value) {
            //         const ListadoUsuarios = usuariosRegistrados.map( usuario => usuario.userName);
            //         if (ListadoUsuarios.includes(value)){
            //             setUserActive(value)
            //             return true
            //         } else {
            //             return false
            //         }           
            //     }
            // )
            ,
        password: Yup.string()
            .required('La contraseña es obligatoria')
            // .test(
            //     'checkPassword',
            //     'La contraseña es incorrecta',
            //     function(value) {
            //         const usuario = usuariosRegistrados.find(usuario => usuario.user === userActive)
            //         if (!usuario){
            //             return false
            //         }
            //         else if (value === usuario.password){
            //             return true
            //         } else  {
            //             return false
            //         }
            //     }
            // )
            ,
    });
    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-blue-50">
            <Card className="w-full md:w-30rem shadow-8">
                <h1 className="text-center text-primary mb-4">Iniciar Sesión</h1>
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
                                        throw new Error(data);
                                    }
                                    console.log("Registro exitoso. Datos del usuario:", data);
                                    navigate("/home",  { state: { userActive : values.username } });

                                } catch (error) {
                                    console.error("Error de registro:", error);
                                    setStatus(`Error: ${error.message}`);
                                    setError(error.message)
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
                                <span className="p-float-label">
                                    <InputText
                                        id="username"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.username && touched.username ? 'p-invalid w-full' : 'w-full'}
                                    />
                                    <label htmlFor="username">Nombre de Usuario</label>
                                </span>
                                {errors.username && touched.username && <Message severity="error" text={errors.username} />}

                                <span className="p-float-label">
                                    <Password
                                        id="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        toggleMask
                                        className={errors.password && touched.password ? 'p-invalid w-full' : 'w-full'}
                                        feedback={false}
                                    />
                                    <label htmlFor="password">Contraseña</label>
                                </span>
                                {errors.password && touched.password && <Message severity="error" text={errors.password} />}
                                {error && (
                                    <Message 
                                        severity="error" 
                                        text={error}
                                        className="mt-3"
                                    />
                                )}

                                <div className='flex justify-content-between align-items-center mt-4'>
                                    <Button
                                        severity="primary"
                                        type='submit'
                                        label="Iniciar Sesión"
                                        icon="pi pi-sign-in"
                                        loading={loading || isSubmitting}
                                        onClick={handleSubmit} 
                                        className="w-full md:w-auto"
                                    />
                                    <Button
                                        label="Registrarse"
                                        icon="pi pi-user-plus"
                                        onClick={() => {navigate("/register")}}
                                        className="p-button-outlined w-full md:w-auto mt-2 md:mt-0"
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
}