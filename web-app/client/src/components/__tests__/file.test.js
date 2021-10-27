import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer'
import About from '../About';

afterEach(() => {
    cleanup();
});

test('should render non-completed todo', () => {
    const todo = { id: 1, title: 'wash dishes', completed: false };
    render(<About todo={todo} />);
    const todoElement = screen.getByTestId('todo-1');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('title-1');
});

test('should render completed todo', () => {
    const todo = { id: 2, title: 'wash car', completed: true };
    render(<About todo={todo} />);
    const todoElement = screen.getByTestId('todo-2');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('title-2');
});

test('matches snapshot', () => {
    const todo = { id: 2, title: 'wash car', completed: true };
    const tree = renderer.create(<About todo={todo}/>).toJSON();
    // console.log(tree);
    expect(tree).toMatchSnapshot();
});



// expect(todoElement).not.toContainHTML('<strike>');

// test('test', () => {
//     expect(true).toBe(true);
// })

// npm i --save-dev @testing-library/react react-test-render
// https://www.youtube.com/watch?v=ML5egqL3YFE