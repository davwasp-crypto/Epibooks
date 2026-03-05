import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import App from './App';
import fantasyBooks from './data/fantasy.json';

describe('EpiBooks Testing Suite', () => {


    test('Verifica che il componente Welcome venga montato correttamente', () => {
        render(<App />);
        const welcomeElement = screen.getByText(/benvenuti in epibooks/i);
        expect(welcomeElement).toBeInTheDocument();
    });


    test('Verifica che vengano renderizzate tante card quanti i libri nel JSON', () => {
        render(<App />);
        const allCards = screen.getAllByRole('img');
        expect(allCards).toHaveLength(fantasyBooks.length);
    });


    test('Verifica che il componente CommentArea venga renderizzato correttamente', () => {
        render(<App />);
        const commentArea = screen.getByPlaceholderText(/scrivi qui la tua recensione/i);
        expect(commentArea).toBeInTheDocument();
    });


    test('Verifica che cliccando su un libro il suo bordo cambi colore e torni normale al secondo click', () => {
        render(<App />);
        const allCards = screen.getAllByTestId('book-card'); // Assicurati di aggiungere data-testid="book-card" nel componente SingleBook
        const firstCard = allCards[0];
        const secondCard = allCards[1];

        fireEvent.click(firstCard);
        expect(firstCard).toHaveStyle('border: 3px solid red');

        fireEvent.click(secondCard);
        expect(secondCard).toHaveStyle('border: 3px solid red');
        expect(firstCard).not.toHaveStyle('border: 3px solid red');
    });


    test('Verifica che all\'avvio non ci siano istanze di SingleComment nel DOM', () => {
        render(<App />);
        const singleComment = screen.queryByTestId('single-comment');
        expect(singleComment).not.toBeInTheDocument();
    });


    test('Verifica che cliccando su un libro vengano caricati i commenti', async () => {
        render(<App />);
        const allCards = screen.getAllByTestId('book-card');
        fireEvent.click(allCards[0]);

        const loadedComments = await screen.findAllByTestId('single-comment');
        expect(loadedComments.length).toBeGreaterThan(0);
    });
});