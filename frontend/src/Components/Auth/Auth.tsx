import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import imagotipo from '../../Media/imagotipo.png'
import { Formik } from 'formik';
import { FaBug, FaLock, FaUser } from 'react-icons/fa';
import * as yup from 'yup'
import AuthContext from '../../auth/context';
import apiAuth from '../../api/apiAuth';
import storage from '../../auth/storage';

let schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(8)

});

export default function Auth() {
    const authContext = useContext(AuthContext);

    const [loginFailed, setLoginFailed ] = useState(false);
    const [error, setError ] = useState<string>("");

    const styles = {

        container : {

            height: "100vh",
            width: "100%",
            padding: 0,
            margin: 0,
            overflow: "hidden",
            justifyContent: "stretch"

        } as React.CSSProperties,
        containerLeft: {
            backgroundColor: "#082AB9"
        } as React.CSSProperties,
        input : {
            
            padding:  "0px 18px" ,
            borderRadius: 10,
            backgroundColor: "#2a2e38",
            color: "white",
            border: 0,
            elevation: 0,
            WebkitTextFillColor: "white"


        } as React.CSSProperties,
        insideInput: {

            padding:  "12px 0px" ,
            borderRadius: 10,
            backgroundColor: "#2a2e38",
            color: "white",
            border: 0,
            elevation: 0,
            WebkitTextFillColor: "white",
            outline: "none",

        } as React.CSSProperties,
        logIn : {
            padding: 8,
            borderRadius: 10,
            backgroundColor: "#082AB9",
            color: "white",
            marginTop: 15,
            fontSize: 15, 
            fontWeight:  700,
        } as React.CSSProperties,

        register : {
            padding: 7,
            borderRadius: 10,
            border: "4px #082AB9 solid",
            color: "white",
            marginTop: 15,
            fontSize: 15, 
            fontWeight:  700,
        } as React.CSSProperties


    }
    const handleSubmit = async (values : any) => {
        const result = await apiAuth.login(values.username, values.password);

        console.log(result)

        if(!result.ok) {
            setError("Contraseña o usuario equivocados.")
            setLoginFailed(true);
            return;
        }else{ 

            setLoginFailed(false);

            authContext.setUser(result.data.access_token);
            storage.setUser(result.data.access_token);
        }
    }




    return (
        <div className="container-fluid p-0 m-0">
            <Row style={styles.container}>

                <Col className="p-0 align-items-center d-flex flex-column justify-content-center">

                    <div className="d-flex flex-column justify-content-center w-100 p-3" style={{maxWidth: 500}}>

                        <div className="d-flex justify-content-center mb-5 pb-5">
                            <img width = {300} src={imagotipo}></img>
                        </div>
                        <Formik validationSchema={schema} initialValues={{username : "", password : ""}} onSubmit={(data) => handleSubmit(data)}>

                            {

                                ({handleChange, handleSubmit, handleBlur, errors, setFieldTouched}) => (
                                    <>
                                        <div className="d-flex w-100 align-items-center" style={styles.input}>
                                            <FaUser size={22}></FaUser>
                                            <input name="username" onChange={handleChange} style={styles.insideInput} className="w-100 ml-4" placeholder="Nombre de usuario" onBlur={() => setFieldTouched("username")}></input>
                                        </div>


                                        {errors.username ? <p className="text-danger p-0 text-left mt-2 mb-0"><FaBug></FaBug> {errors.username}</p> : null}

                                        <div className="d-flex w-100 align-items-center mt-3" style={styles.input}>
                                            <FaLock size={22}></FaLock>
                                            <input type="password" name="password" onChange={handleChange} style={styles.insideInput} className="w-100 ml-4" placeholder="Nombre de usuario" onBlur={() => setFieldTouched("password")} ></input>
                                            
                                        </div>

                                        {errors.password ? <p className="text-danger p-0 text-left mt-2 mb-0"><FaBug></FaBug> {errors.password}</p> : null}


                                        <div style={styles.logIn} onClick={() => handleSubmit()}>

                                            <h5  style={{fontWeight: 700, marginTop: 5}}>Log In</h5>

                                        </div>

                                        {error ? <p className="text-danger p-0 text-left mt-2 mb-0"><FaBug></FaBug> {error}</p> : null}

                                        <div style={{color : "white"}} className="mt-3">¿No tienes cuenta?</div>

                                        <div style={styles.register}>

                                            <h5 style={{fontWeight: 700, marginTop: 5}}>Registrate</h5>

                                        </div>
                                    </>

                                )

                            }

                        </Formik>

                    </div>
                
                </Col>
                
                <Col style={styles.containerLeft}  className="p-0 d-md-block d-none">
                
                hello
                
                </Col>

            </Row>
        </div>
    )
}
