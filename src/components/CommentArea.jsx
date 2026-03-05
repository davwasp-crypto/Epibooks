import { useState, useEffect } from 'react'
import { ListGroup, Form, Button, Spinner, Alert } from 'react-bootstrap'

//  https://strive.school/studentlogin
const MY_TOKEN = 'INSERISCI_QUI_IL_TUO_TOKEN'
const API_URL = 'https://striveschool-api.herokuapp.com/api/comments'

const CommentArea = ({ asin }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [newComment, setNewComment] = useState({
        comment: '',
        rate: '1',
        elementId: asin,
    })


    const fetchComments = async () => {
        setIsLoading(true)
        try {
            let response = await fetch(`${API_URL}/${asin}`, {
                headers: {
                    Authorization: `Bearer ${MY_TOKEN}`,
                },
            })
            if (response.ok) {
                let data = await response.json()
                setComments(data)
                setIsError(false)
            } else {
                setIsError(true)
            }
        } catch (error) {
            console.error(error)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [asin])


    const sendComment = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({ ...newComment, elementId: asin }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${MY_TOKEN}`,
                },
            })
            if (response.ok) {
                alert('Recensione inviata!')
                setNewComment({ comment: '', rate: '1', elementId: asin })
                fetchComments()
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="mt-4 text-dark">
            <h4>Recensioni</h4>

            {isLoading && <Spinner animation="border" variant="primary" />}
            {isError && <Alert variant="danger">Errore nel caricamento commenti</Alert>}

            <ListGroup className="mb-3">
                {comments.map((c) => (
                    <ListGroup.Item key={c._id}>
                        <strong>{c.rate}/5</strong> - {c.comment}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Form per nuovo commento */}
            <Form onSubmit={sendComment} className="border p-3 bg-light">
                <Form.Group className="mb-2">
                    <Form.Label>Lascia una recensione</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Scrivi qui..."
                        value={newComment.comment}
                        onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Voto</Form.Label>
                    <Form.Select
                        value={newComment.rate}
                        onChange={(e) => setNewComment({ ...newComment, rate: e.target.value })}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="success" type="submit">Invia</Button>
            </Form>
        </div>
    )
}

export default CommentArea