import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (
            <footer className="footer">
                <Grid>
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a href="/">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                   Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p className="copyright pull-right">
                        &copy; {(new Date()).getFullYear()} <a href="https://www.linkedin.com/in/afifpatel/">Afif Patel</a>, a product by Salalah International Connections Co.
                    </p>
                </Grid>
            </footer>
		);
	}
}

export default Footer;






