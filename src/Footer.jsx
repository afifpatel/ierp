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
                                <a href="http://afifpatel.website/">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/afifpatel/">
                                   LinkedIn
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p className="copyright pull-right" >
                        &copy; {(new Date()).getFullYear()} Afif Patel. All Rights Reserved.</p>
                </Grid>
            </footer>
		);
	}
}

export default Footer;






