import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SingleBook = ({ book }) => {
    const navigate = useNavigate();

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={book.img} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate">{book.title}</Card.Title>
                <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => navigate(`/details/${book.asin}`)}
                >
                    Vedi Dettagli
                </Button>
            </Card.Body>
        </Card>
    );
};

export default SingleBook;