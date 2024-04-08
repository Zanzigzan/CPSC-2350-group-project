import { describe, it, expect } from "vitest";
import {render, screen} from '../utils/test.utils';
import MainPageModal from "./MainPageModal";

describe('App', ()=>{
    it('Check if the entire modal with all its parts renders', () => {
        render(<MainPageModal />);
        const modal = screen.getByText('Fluentify')
        expect(logo).toBeInTheDocument();
    });
});