import * as React from 'react';

export const EmailTemplate = ({name, email, tel, message}) => (
    <div>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Tel: {tel}</p>
        <p>Message: {message}</p>
    </div>
);
