import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { BookOpenText } from 'lucide-react';
import { Link } from 'react-router';

export default function Home() {
    return (
        <>
            <div className="fixed top-0 w-full mt-8 flex justify-center">
                <ThemeToggle />
            </div>

            <div className="py-20 flex flex-col items-center gap-y-4 text-center">
                <span className="md:text-[180px] text-9xl [&_*]:(bg-gradient-to-t from-background text-transparent bg-clip-text font-extrabold select-none)">
                    <span className="to-#646CFF">V</span>
                    <span className="to-#3178C6">T</span>
                    <span className="to-#E36002">H</span>
                </span>

                <h2 className="text-2xl text-foreground font-800">Vite + Typescript + Hono</h2>

                <h5 className="font-light text-lg">Quite possibly the best stack for the web</h5>

                <div className="mt-4 flex gap-2 [&_button]:(w-40 rounded-full)">
                    <Link to="/login">
                        <Button variant="outline">
                            Login
                        </Button>
                    </Link>

                    <Link to="https://mrozio13pl.github.io/vth" target="_blank">
                        <Button>
                            <BookOpenText />
                            Docs
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
