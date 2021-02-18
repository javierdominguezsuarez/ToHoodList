import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import imagotipo from '../../Media/imagotipo.png'
import { Formik, useFormikContext } from 'formik';
import { FaBug, FaInbox, FaLock, FaMailBulk, FaMailchimp, FaUser } from 'react-icons/fa';
import * as Yup from 'yup'
import AuthContext from '../../auth/context';
import apiAuth from '../../api/apiAuth';
import storage from '../../auth/storage';

let schema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email(),
    password : Yup.string().required().min(8).max(20),
    password_again: Yup.string().required().when("password", {
        is: (val : any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
        )
    }),
    first_name: Yup.string().required(),
    last_name : Yup.string().required(),

});



interface IInput{

    name : string,
    placeholder : string,
    icon : any,
    type : string

}


function FormikInput({name, placeholder, icon, type} : IInput){

    const formik = useFormikContext<any>();


    const styles = {
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

        } as React.CSSProperties
    }

    return (

        <>
            <div className="d-flex w-100 align-items-center mt-3" style={styles.input}>

                {icon}
                <input type={type} name={name} onChange={formik.handleChange} style={styles.insideInput} className="w-100 ml-4" placeholder={placeholder} ></input>
                
            </div>

            {formik.errors[name] ? <p className="text-danger p-0 text-left mt-2 mb-0"><FaBug></FaBug> {formik.errors[name]}</p> : null}
        </>
    )

}

export default function Register() {
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
            padding: 8,
            borderRadius: 10,
            backgroundColor: "#082AB9",
            color: "white",
            marginTop: 15,
            fontSize: 15, 
            fontWeight:  700,
        } as React.CSSProperties


    }
    const JustHandleSubmit = async (values : any) => {
        const result = await apiAuth.register(values);

        if(!result.ok) {
            setError("Ha habido un fallo vuelve a intentarlo mas tarde.")
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

{/*                         'username', 'password', 'password_again', 'email', 'first_name', 'last_name' */}
                        <Formik validationSchema={schema} initialValues={{username : "", password : "", password_again: "", email: "", first_name: "", last_name: ""}} onSubmit={(data) => JustHandleSubmit(data)}>

                            {

                                ({ handleSubmit}) => (

                                    <>
                                        <Row>
                                            <Col>
                                                <FormikInput placeholder="Name" name="first_name" type="text" icon = {<FaUser></FaUser>}></FormikInput>
                                            </Col>
                                            <Col className="pl-0">
                                                <FormikInput placeholder="surname" name="last_name" type="text" icon = {<FaUser></FaUser>}></FormikInput>
                                            </Col>
                                        </Row>

                                        <FormikInput placeholder="username" name="username" type="text" icon = {<FaMailBulk></FaMailBulk>}></FormikInput>
                                        <FormikInput placeholder="email" name="email" type="email" icon = {<FaMailBulk></FaMailBulk>}></FormikInput>
                                        <FormikInput placeholder="password" name="password" type="password" icon = {<FaLock></FaLock>}></FormikInput>
                                        <FormikInput placeholder="repeat password" name="password_again" type="password" icon = {<FaLock></FaLock>}></FormikInput>



                                        {error ? <p className="text-danger p-0 text-left mt-2 mb-0"><FaBug></FaBug> {error}</p> : null}



                                        <div style={styles.register} onClick={() => { handleSubmit();}}>

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
