import React, {useEffect, useState} from 'react'
import {Container} from "../util/container";

export const Footer = ({ data, icon, rawData }) => {

    const [year, setYear] = useState(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className={`site-footer bg-gradient-to-br`}>
            <Container className="container-fluid container-md" size="custom">
                <div className="d-sm-flex">
                    <ul className="footer-links">
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Terms of use</a></li>
                        <li><a href="#">Terms & conditions</a></li>
                    </ul>
                    <p className="legal">&copy; Shaun Lippitt {year} - All Rights Reserved</p>
                </div>
            </Container>
        </footer>
    )
}
