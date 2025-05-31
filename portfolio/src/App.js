import React, { useEffect } from 'react';
import BackgroundVideo from './assets/video/macbook.mp4';
import BackgroundPlaceholder from './assets/video/macbook.png';
import headerLogo from './assets/img/logo-1000px.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faCloudBolt, faSun } from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons';

import './App.css';

function App() {
    useEffect(() => {
        const sections = document.querySelectorAll('.grid-section');
        const observer = new window.IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Animation triggers only once
                    }
                });
            },
            { threshold: 0.15 }
        );
        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="App">
            <header>
                <video poster={BackgroundPlaceholder} id="bg-video" playsInline autoPlay muted loop>
                    <source src={BackgroundVideo} type="video/mp4"></source>
                </video>
                <div className="scrim"></div>
                <nav className="font-16">
                    <a href="https://github.com/jacobuid" target="_blank">Github</a>
                    <a href="https://jacobdking.blogspot.com/" target="_blank">Blog</a>
                    <a href="https://www.linkedin.com/in/jacobuid/" target="_blank">Contact</a>
                </nav>
                <h1 id="intro" className="h3">Hello, I am:</h1>
                <img id="header-logo" src={headerLogo} alt="Jacob King Web Developer and Designer" />
            </header>
            <main>
                <div class="grid-container">
                    <section class="grid-section section-a">
                        <h2>
                            <FontAwesomeIcon icon={faCode} beat />
                            Frontend Coding
                        </h2>
                        <p>
                            With over 10 years of experience, 
                            I am fluent in HTML, CSS, and JavaScript, 
                            crafting seamless user experiences with a 
                            touch of creativity and a lot of precision. 
                            From structuring content to styling pixels 
                            and scripting interactivity, I turn design 
                            ideas into responsive, accessible, high-performance 
                            web pages.
                        </p>
                    </section>
                    <section class="grid-section section-b">
                        <h2>
                            <FontAwesomeIcon icon={faJs} beat />
                            JavaScript Frameworks
                        </h2>
                        <p>I have extensive experience building web applications with modern frameworks such as <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a> &amp; <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>, <a href="https://angular.io/" target="_blank" rel="noopener noreferrer">Angular</a>, and <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue.js</a>. My background also includes working with legacy technologies like <a href="https://jquery.com/" target="_blank" rel="noopener noreferrer">jQuery</a>, <a href="https://dojotoolkit.org/" target="_blank" rel="noopener noreferrer">Dojo Toolkit</a>, and <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">BootstrapJS</a>, which gives me a strong foundation for modernizing and refactoring older codebases to meet today’s standards.</p>
                    </section>
                </div>
                <div class="grid-container">
                    <section class="grid-section section-a">
                        <h2>
                            <FontAwesomeIcon icon={faSun} beat />
                            Strength
                        </h2>
                        <p>
                            I am a collaborative team player who enjoys working with 
                            others to achieve shared goals. But, I am also resourceful 
                            and self-reliant, I actively seek out solutions and am always 
                            willing to lend a hand to colleagues. My friendly and approachable 
                            nature helps foster a positive work environment, and I am committed 
                            to continuously learning and improving my understanding of 
                            code and best practices.
                        </p>
                    </section>
                    <section class="grid-section section-b">
                        <h2>
                            <FontAwesomeIcon icon={faCloudBolt} beat />
                            Weakness
                        </h2>
                        <p>
                            While I excel at frontend development and crafting engaging 
                            user interfaces, I have limited experience working with middleware 
                            services and databases. My skills complement backend developers 
                            very well, as I focus on building robust and polished client-side 
                            experiences. I know just enough about backend technologies for 
                            prototyping, but I rely on collaboration with backend experts 
                            for production-ready solutions.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default App;
