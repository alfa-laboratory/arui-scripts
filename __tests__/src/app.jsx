import React from 'react';
import image from './clock.svg';
import { isSmaller } from './utils';

<<<<<<< HEAD
import { Icon } from './Icon';

import styles from './css-module.pcss';
=======
import styles from './app.module.css';
>>>>>>> 10131390defbdba00d404beda4c2864621fc5cf4
import './style.css';

export class App extends React.Component {
    state = {
        clickCount: 0
    };

    render() {
        return (
            <div className={ styles.root }>
                <h2>
                    Hello, arui-scripts!
                </h2>
                <Icon />

                Check hot-loader: <br />
                Button is clicked { this.state.clickCount } times
                Clicked more than 10 times? <br />
                { isSmaller(this.state.clickCount, 10) }

                <button
                    className='btn'
                    onClick={ () => this.setState({ clickCount: this.state.clickCount + 1 }) }
                >
                    Up!
                    <img src={ image } className='icon' />
                </button>
            </div>
        )
    }
}
