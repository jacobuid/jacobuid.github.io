import React, { useState, useEffect } from 'react';
import { Modal, Trigger } from './components/Modal';
import BackgroundVideo from './assets/video/macbook.mp4';
import BackgroundPlaceholder from './assets/video/macbook.png';
import headerLogo from './assets/img/logo-1000px.png';
import htmlGif from './assets/gif/html.gif';
import { getSVG } from './assets/svg/svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faCloudBolt, faSun, faTerminal, faDesktop, faMobileButton } from '@fortawesome/free-solid-svg-icons';
import { faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons'

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

    const [HTMLModalOpen, setHTMLModalOpen] = useState(false);

    return (
        <div className="App">
            <header>
                <video poster={BackgroundPlaceholder} id="bg-video" playsInline autoPlay muted loop>
                    <source src={BackgroundVideo} type="video/mp4"></source>
                </video>
                <div className="scrim"></div>
                <nav className="font-16">
                    <a href="https://github.com/jacobuid" target="_blank" rel="noreferrer">Github</a>
                    <a href="https://jacobdking.blogspot.com/" target="_blank" rel="noreferrer">Blog</a>
                    <a href="https://www.linkedin.com/in/jacobuid/" target="_blank" rel="noreferrer">Contact</a>
                </nav>
                <h1 id="intro" className="h3">Hello, I am:</h1>
                <img id="header-logo" src={headerLogo} alt="Jacob King Web Developer and Designer" />
            </header>
            <main>
                <h1 className="h1">
                    <FontAwesomeIcon icon={faTerminal} fade />
                    $ Coding Experience
                </h1>
                <div className="grid-container">
                    <section className="grid-section">
                        
                        <h2>
                            <FontAwesomeIcon icon={faCode} beat />
                            Frontend Coding
                        </h2>
                        <p>
                            With over 10 years of experience, 
                            I am fluent in <a href="https://www.w3schools.com/html/html_intro.asp" target="_blank" rel="noopener noreferrer">HTML</a>, <a href="https://www.w3schools.com/css/css_intro.asp" target="_blank" rel="noopener noreferrer">CSS</a>, and JavaScript, 
                            crafting seamless user experiences with a 
                            touch of creativity and a lot of precision. 
                            From structuring content to styling pixels 
                            and scripting interactivity, I turn design 
                            ideas into responsive, accessible, high-performance 
                            web pages.
                        </p>
                        <div className="grid-icons">
                            <Trigger onOpen={() => setHTMLModalOpen(true)}>
                                <img className='card' src={getSVG('html')} alt="HTML 5 Logo" />
                            </Trigger>
                        </div>
                    </section>
                    <section className="grid-section">
                        <h2>
                            <FontAwesomeIcon icon={faJs} beat />
                            JavaScript Frameworks
                        </h2>
                        <p>I have extensive experience building web applications with modern frameworks such as <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a> &amp; <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>, <a href="https://angular.io/" target="_blank" rel="noopener noreferrer">Angular</a>, and <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue.js</a>. My background also includes working with legacy technologies like <a href="https://jquery.com/" target="_blank" rel="noopener noreferrer">jQuery</a>, <a href="https://dojotoolkit.org/" target="_blank" rel="noopener noreferrer">Dojo Toolkit</a>, and <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">BootstrapJS</a>, which gives me a strong foundation for modernizing and refactoring older codebases to meet today’s standards.</p>
                    </section>
                </div>
                <div className="grid-container">
                    <section className="grid-section">
                        <h2>
                            <FontAwesomeIcon icon={faDesktop} beat />
                            Workspace Management
                        </h2>
                        <p>
                            I use <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git</a> for version control to efficiently manage and track changes across all my project files, ensuring a smooth and collaborative workflow. For package management, I rely on <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">npm</a> to install and maintain dependencies. My development environment includes <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> and <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express</a> for running local servers, and I often use tools like <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer">JSONPlaceholder</a> to quickly prototype APIs and endpoints during the early stages of a project. This setup allows me to iterate rapidly and maintain a clean, organized codebase.
                        </p>
                    </section>
                    <section className="grid-section">
                        <h2>
                            <FontAwesomeIcon icon={faMobileButton} beat />
                            Responsive Design
                        </h2>
                        <p>
                            I have extensive experience using Adobe products such 
                            as <a href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noopener noreferrer">Photoshop</a> 
                            and <a href="https://www.adobe.com/products/illustrator.html" target="_blank" rel="noopener noreferrer">Illustrator</a> 
                            to create and refine visual assets for the web. In addition, 
                            I have worked with modern design tools 
                            like <a href="https://www.sketch.com/" target="_blank" rel="noopener noreferrer">Sketch</a> 
                            and <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer">Figma</a>, 
                            which help bridge the gap between design and front-end development. 
                            I am skilled at developing for all screen sizes—mobile, tablet, 
                            and desktop—by utilizing <a href="https://developer.mozilla.org/en-US/docs/Glossary/Mobile_First" target="_blank" rel="noopener noreferrer">mobile-first</a>
                            , <a href="https://www.w3schools.com/html/html_responsive.asp" target="_blank" rel="noopener noreferrer">responsive design</a> 
                            principles to ensure a seamless user experience across devices.
                        </p>
                    </section>
                </div>
                <div className="grid-container">
                    <section className="grid-section">
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
                    <section className="grid-section">
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
            <Modal open={HTMLModalOpen} onClose={() => setHTMLModalOpen(false)}>
                <h2>
                    <FontAwesomeIcon icon={faHtml5} beat />
                    HTML Markup
                </h2>
                <p>With over 15 years of experience using <a href="https://www.w3schools.com/html/html_intro.asp" target="_blank" rel="noopener noreferrer">HTML</a>, I have developed a deep understanding of web markup and best practices. I am highly skilled at identifying, debugging, and resolving any issues that arise, ensuring that web pages are both functional, standards-compliant, and accessible. I pay close attention to accessibility, writing code that works well with screen readers and meets contrast requirements, so all users can have a positive experience. My extensive background allows me to quickly troubleshoot problems and implement effective solutions, resulting in reliable and well-structured websites.</p>
                <img className='gif-right' src={htmlGif} alt="HTML Example" />
            </Modal>
        </div>
    );
}

export default App;
