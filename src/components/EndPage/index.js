import React from 'react';

// import { Container } from './styles';
import './styles.css'
import githubLogo from '../../images/social/github.png'

const Endpage = () => {

    return(
        <> 
            <div className="social">
                <a href="https://www.github.com/peterhttps">
                    <img src={githubLogo} alt="github" className="github"/>
                </a>
                
            </div>
            
        </>
    );

};

export default Endpage;
