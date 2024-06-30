import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '../util/container';
import Logo from '../util/logo';
import Link from 'next/link';
import ThemeSwitch from '../util/icons/theme-switch';

export const Header = ({ data }) => {
    const router = useRouter();
    const [prefix, setPrefix] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        if (window && window.location.pathname.startsWith('/admin')) {
            setPrefix('/admin');
        }
    }, []);

    useEffect(() => {
        const savedTheme = window.localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkTheme(true);
            document.body.classList.add('dark-theme');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
    };

    useEffect(() => {
        const themeClass = isDarkTheme ? 'dark-theme' : '';
        document.body.classList.toggle('dark-theme', isDarkTheme);
        window.localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    return (
        <header className={`site-header ${!router.query.hasOwnProperty('fromHome') ? 'fadeInDown' : ''}`}>
            <Container size="custom" className="container-fluid container-md">
                <div className="d-flex">
                    <a className="logo" href="/">
                        <Logo />
                    </a>
                    <div id="availability_notice" className={"d-none"}>
                        <p>I am currently unavailable until 20th June 2024</p>
                    </div>
                    <div className="site-nav d-flex align-items-center ms-auto">
                        <nav className="site-nav-menu d-none d-sm-block">
                            <ul className="menu d-flex mb-0 p-0">
                                {data.nav &&
                                    data.nav.map((item, i) => {
                                        const activeItem =
                                            item?.href === ''
                                                ? router?.asPath === '/'
                                                : router?.asPath.includes(item.href);
                                        return (
                                            <li
                                                key={`${item.label}-${i}`}
                                                className={`${activeItem ? 'active' : ''}`}
                                            >
                                                <Link href={`${prefix}/${item.href}`} passHref>
                                                    <a className={`${activeItem ? 'active' : ''}`}>
                                                        {item.label}
                                                    </a>
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                            <span className="site-menu-active-bar"></span>
                        </nav>
                        <a href="#contact" className="site-header__contact-btn">
                            Contact
                        </a>
                    </div>
                    <button id="theme_switch" onClick={toggleTheme}>
                        <ThemeSwitch />
                    </button>
                </div>
            </Container>
        </header>
    );
};
