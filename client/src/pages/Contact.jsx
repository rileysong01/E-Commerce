import { Container, Row, Col } from 'react-bootstrap'
import CategoryMenu from '../components/CategoryMenu';
import SearchBar from '../components/SearchBar';
import Announcements from '../components/Announcements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    const iconStyle = {
        fontSize: '80px',
        paddingRight: '30px',
        paddingLeft: '30px'
    };

    return (
        <Container fluid>
            <Row>
                <Col lg={9}>
                    <CategoryMenu isOnSearchPage={true} />
                </Col>
                <Col lg={3}>
                    <SearchBar />
                </Col>
            </Row>
            <Row>
                <Announcements />
            </Row>
            <Row>
                <div style={{ padding: '3%', textAlign: 'center' }}>
                    <h3>Contacts</h3>
                    <p>Please reach out with all questions and concerns at the links below</p>
                    <div className="social-links">
                        <div className="social-links">
                            <a href="https://github.com/rileysong01" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} className="fa-icon" style={{...iconStyle, color: '#cdb4db'}} />
                            </a>
                            <a href="https://www.linkedin.com/in/rui-lin-song-124486278/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} className="fa-icon" style={{...iconStyle, color: '#cdb4db'}} />
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '3%', textAlign: 'center' }}>
                    <h3 style={{ textAlign: 'center' }}>About This App</h3>
                    <p style={{ marginTop: '2%' }}>This application was built as the final group project for the University of Toronto Full Stack Coding bootcamp to demonstrate our knowledge of MERN Stack applications. I continued working on this project past the course, adding new features and reworking existing ones with the goal of transforming it into a fully operational and appealing E-Commerce application.

                    </p>
                    <br />
                    <p>
                        Shoutout to Priti Vania and Max Walent for their contributions to this project during the course.
                    </p>
                </div>


            </Row>
        </Container>
    )

}

export default Contact;
// emailer ?