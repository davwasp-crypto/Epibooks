import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Container className="text-center mt-5">
            <h1>404 - Pagina non trovata!</h1>
            <Button variant="primary" onClick={() => navigate('/')}>Torna in Home</Button>
        </Container>
    );
};
export default NotFound;