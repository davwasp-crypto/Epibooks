import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import fantasy from '../data/fantasy.json'; // Assicurati di avere i dati qui!
import CommentArea from './CommentArea';

const BookDetails = () => {
    const { asin } = useParams();
    const book = fantasy.find((b) => b.asin === asin);

    if (!book) return <h2 className="text-center">Libro non trovato!</h2>;

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Img src={book.img} />
                        <Card.Body><Card.Title>{book.title}</Card.Title></Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <CommentArea asin={asin} />
                </Col>
            </Row>
        </Container>
    );
};
export default BookDetails;