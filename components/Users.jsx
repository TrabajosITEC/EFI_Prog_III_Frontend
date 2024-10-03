import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

const API =  import.meta.env.VITE_API;

const Users = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [InitialName, setInitialName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [id, setId] = useState("");

  const nameInput = useRef(null);

  const [loading, setLoading] = useState(false);

  let [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/users/${id}`);
    const data = await res.json();
    console.log(data.name)
    setEditing(true);
    console.log(editing)
    setId(id);
    setName(data.name);
    console.log(InitialName)
    setInitialName(data.name)
    console.log(InitialName)
    setEmail(data.email);
    setPassword(data.password);
    // nameInput.current.focus();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
      <Formik
          enableReinitialize={true}
          initialValues={{
              name: InitialName,
              email: '',
              password: '',
          }}
          // validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
              setLoading(true);
              setTimeout(async () => {
                  setLoading(false);
                  setSubmitting(false);  
                  console.log(editing)                              
                  if (!editing) {
                    
                    const res = await fetch(`${API}/users`, { 
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                    });
                    
                  } else {
                    console.log("hola3")  
                    const res = await fetch(`${API}/users/${id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                    });
                  
                    setEditing(false);
                    setId("");
                  }
                  await getUsers();
            
                  nameInput.current.focus();
                  

              }, 2000);
          }}
      >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
              <Form>
                  <div className="flex flex-column gap-4">
                      <span className="p-float-label">
                          <InputText
                              id="name"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.name && touched.name ? 'p-invalid w-full' : 'w-full'}
                          />
                          <label htmlFor="name">Nombre de Usuario</label>
                      </span>
                      {errors.name && touched.name && <Message severity="error" text={errors.name} />}

                      <span className="p-float-label">
                          <Password
                              id="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              toggleMask
                              className={errors.password && touched.password ? 'p-invalid w-full' : 'w-full'}
                              feedback={true}
                              promptLabel = "Ingrese una contraseña"
                              strongLabel = "Seguridad Fuerte"
                              mediumLabel = "Seguridad Media"
                              weakLabel = "Seguridad Baja"
                          />
                          <label htmlFor="password">Contraseña</label>
                      </span>
                      {errors.password && touched.password && <Message severity="error" text={errors.password} />}

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

                      <Button
                          type='submit'
                          label="Crear"
                          icon="pi pi-user-plus"
                          loading={loading || isSubmitting}
                          onClick={handleSubmit}
                          className="w-full mt-4"
                      />
                  </div>
              </Form>
          )}
      </Formik>
      </div>
      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={(e) => editUser(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;