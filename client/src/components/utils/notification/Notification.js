import React from 'react';
import Alert from "react-bootstrap/Alert";


export const showErrMsg = (msg) => {
    return (
        <Alert variant="danger" style={{ width: "35rem" }} >
            <Alert.Heading>
                {msg}
            </Alert.Heading>
        </Alert>
    )
}

export const showSuccessMsg = (msg) => {
    return (
        <Alert variant="success" style={{ width: "35rem" }} >
            <Alert.Heading>
                {msg}
            </Alert.Heading>
        </Alert>
    )
}