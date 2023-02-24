import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className='Header'>
                <a href="https://solar.htw-berlin.de" target="_blank" rel="noopener noreferrer">
                    <img src="https://solar.htw-berlin.de/wp-content/uploads/logo-forschungsgruppe-solarspeichersysteme-8.svg" alt="HTW Berlin" /> {/*TODO Sourc für SVG in Projektordner speicher um abhängikeit zu reduzieren */}
                </a>
            </div>
        )
    }
}

export default Header;