import { Formik, Form } from 'formik';
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ModeContext } from "../contexts/MainContext";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import * as Yup from 'yup';

const API = import.meta.env.VITE_API;

export default function FormRegister() {

    const { userActive, setUserActive } = useContext(ModeContext);
    // eslint-disable-next-line no-unused-vars
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Debe ingresar un nombre de usuario')
            .test(
                'len',
                'El nombre de usuario debe tener entre 3 y 15 caracteres (sin contar espacios)',
                function (value) {
                    if (!value) return false;
                    const trimmedValue = value.replace(/\s+/g, '');
                    return trimmedValue.length >= 3 && trimmedValue.length <= 15;
                }
            ),
        // .test(
        //     'checkUser',
        //     'El nombre de usuario ya se encuentra registrado',
        //     function(value) {
        //         const ListadoUsuarios = usuariosRegistrados.map( usuario => usuario.user);
        //         if (ListadoUsuarios.includes(value)){
        //             return false
        //         } else {
        //             return true
        //         }           
        //     }
        // ),
        passWord: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*\d).{1,8}$/,
                'La contraseña debe tener al menos una mayúscula, al menos un número y como máximo 8 caracteres'
            )
            .required('La contraseña es obligatoria'),
        email: Yup.string().email('Correo electrónico inválido')
            .required('Requerido')
        // .test(
        //     'checkMail',
        //     'El correo electronico esta vinculado a otro usuario',
        //     function(value) {
        //         const ListadoUsuarios = usuariosRegistrados.map( usuario => usuario.email);
        //         if (ListadoUsuarios.includes(value)){
        //             return false
        //         } else {
        //             return true
        //         }           
        //     }
        // ),
    });

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-blue-50">
            <Card className="w-full md:w-30rem shadow-8">
                <h1 className="text-center text-primary mb-4">Formulario de Registro</h1>
                <Divider className="mb-4" />
                <Formik
                    initialValues={{
                        userName: '',
                        passWord: '',
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
                                    throw new Error(errorData.message || "Error en el registro");
                                }

                                const userData = await response.json();
                                console.log("Registro exitoso. Datos del usuario:", userData);

                                // Navegar a la página de inicio con los datos del usuario
                                setUserActive(userData.userName) 
                                navigate("/home", { state: {userActive} });
                            } catch (error) {
                                console.error("Error de registro:", error);
                                setStatus(`Error: ${error.message}`);
                            } finally {
                                setLoading(false);
                                setSubmitting(false);
                            }
                        })();
                    }}
                // onSubmit={(values, { setSubmitting }) => {
                //     setLoading(true);
                //     setTimeout( async () => {
                //         setLoading(false);
                //         setSubmitting(false);                
                //         await fetch(`${API}/user`, { 
                //             method: "POST",
                //             headers: {
                //               "Content-Type": "application/json",
                //             },
                //             body: JSON.stringify(values),
                //           });
                //         navigate("/home");
                //     }, 2000);
                // }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
                        <Form>
                            <div className="flex flex-column gap-4">
                                <span className="p-float-label">
                                    <InputText
                                        id="userName"
                                        name="userName"
                                        value={values.userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.userName && touched.userName ? 'p-invalid w-full' : 'w-full'}
                                    />
                                    <label htmlFor="userName">Nombre de Usuario</label>
                                </span>
                                {errors.userName && touched.userName && <Message severity="error" text={errors.userName} />}

                                <span className="p-float-label">
                                    <Password
                                        id="passWord"
                                        name="passWord"
                                        value={values.passWord}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        toggleMask
                                        className={errors.passWord && touched.passWord ? 'p-invalid w-full' : 'w-full'}
                                        feedback={true}
                                        promptLabel="Ingrese una contraseña"
                                        strongLabel="Seguridad Fuerte"
                                        mediumLabel="Seguridad Media"
                                        weakLabel="Seguridad Baja"
                                    />
                                    <label htmlFor="passWord">Contraseña</label>
                                </span>
                                {errors.passWord && touched.passWord && <Message severity="error" text={errors.passWord} />}

                                <span className="p-float-label">
                                    <InputText
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.email && touched.email ? 'p-invalid w-full' : 'w-full'}
                                    />
                                    <label htmlFor="email">Correo Electrónico</label>
                                </span>
                                {errors.email && touched.email && <Message severity="error" text={errors.email} />}
                                {status && <Message severity="error" text={status} />}
                                <Button
                                    type='submit'
                                    label="Registrarse"
                                    icon="pi pi-user-plus"
                                    loading={loading || isSubmitting}
                                    onClick={handleSubmit}
                                    className="w-full mt-4"
                                />
                                <Button
                                    label="Volver a inicio"
                                    icon="pi pi-home"
                                    onClick={() => navigate("/")}
                                    className="p-button-outlined w-full md:w-auto mt-2 md:mt-0"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
}