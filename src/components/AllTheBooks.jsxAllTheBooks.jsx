import { Container, Row, Col } from 'react-bootstrap';
import fantasy from '../data/fantasy.json';
import SingleBook from './SingleBook';

const AllTheBooks = () => {
    return (
        <Container>
            <Row className="g-3 mt-3">
                {fantasy.map((b) => (
                    <Col xs={12} md={4} lg={3} key={b.asin}>
                        <SingleBook book={b} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AllTheBooks;