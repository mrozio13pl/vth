import { Link } from 'react-router';
import { Button } from './ui/button';
import { ThemeToggle } from './ui/theme-toggle';
import { GITHUB } from '@/lib/constants';

export function Navbar() {
    return (
        <div className="fixed top-4 w-full flex items-center z-30 px-8">
            <div className="flex-1 justify-start" />

            <div className="flex justify-center items-center flex-1">
                <div className="flex rounded-full shadow-lg bg-background/50 backdrop-blur-xl py-2 px-4 [&_button]:rounded-full hover:[&_button]:text-primary gap-2">
                    <Link to={{ pathname: 'docs' }}>
                        <Button variant="ghost">
                            Docs
                        </Button>
                    </Link>
                    <Link to={GITHUB}>
                        <Button variant="ghost">
                            Github
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex justify-end">
                <ThemeToggle className="shadow-lg" />
            </div>
        </div>
    );
}
