import React from 'react';
import BackgroundVideo from './assets/video/macbook.mp4';
import BackgroundPlaceholder from './assets/video/macbook.png';
import headerLogo from './assets/img/logo-1000px.png';

import './App.css';

function App() {
    return (
        <div className="App">
            <header>
                <video poster={BackgroundPlaceholder} id="bg-video" playsInline autoPlay muted loop>
                    <source src={BackgroundVideo} type="video/mp4"></source>
                </video>
                <div className="scrim"></div>
                <nav className="font-16">
                    <a href="#about">About</a>
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
                        <h2>Section A</h2>
                        <p>This is the first section.</p>
                    </section>
                    <section class="grid-section section-b">
                        <h2>Section B</h2>
                        <p>This is the second section.</p>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default App;
