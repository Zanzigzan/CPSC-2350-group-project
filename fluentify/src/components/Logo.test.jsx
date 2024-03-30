import { describe, it, expect } from "vitest";
import {render, screen} from '../utils/test.utils';
import Logo from './Logo'

describe('App', ()=>{
    it('Check if logo appears', () => {
        render(<Logo />);
        const logo = screen.getByText('Fluentify')
        expect(logo).toBeInTheDocument();
    });
});