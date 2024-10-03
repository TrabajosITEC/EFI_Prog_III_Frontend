import { Formik, Form } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import * as Yup from 'yup';

export default function FormLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Debe ingresar un nombre de usuario')
            .test(
                'checkUser',
                'El nombre de usuario no existe',
                function(value) {
                    const ListadoUsuarios = usuariosRegistrados.map( usuario => usuario.user);
                    if (ListadoUsuarios.includes(value)){
                        return true
                    } else {
                        return false
                    }           
                }
            ),
        passWord: Yup.string()
            .required('La contraseña es obligatoria')
            .test(
                'checkPassword',
                'La contraseña es incorrecta',
                function(value) {
                    const usuario = usuariosRegistrados.find(usuario => usuario.user === userActive)
                    if (!usuario){
                        return false
                    }
                    else if (value === usuario.password){
                        return true
                    } else  {
                        return false
                    }
                }
            ),

    });

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-blue-50">
            <Card className="w-full md:w-30rem shadow-8">
                <h1 className="text-center text-primary mb-4">Iniciar Sesión</h1>
                <Divider className="mb-4" />
                <Formik
                    initialValues={{ userName: '', passWord: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            setSubmitting(false);  
                            setUserActive(values.userName)              
                            navigate("/home");
                        }, 2000);
                    }}
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
                                        feedback={false}
                                    />
                                    <label htmlFor="passWord">Contraseña</label>
                                </span>
                                {errors.passWord && touched.passWord && <Message severity="error" text={errors.passWord} />}

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