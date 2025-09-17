import { IconCloud } from '@/components/cloud';
import { Navbar } from '@/components/navbar';
import { Shaders } from '@/components/ui/asb';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/ui/feature-grid';
import { MockupCode, MockupCodeLine } from '@/components/ui/mockup-code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GITHUB } from '@/lib/constants';
import { SiBetterauth, SiBetterauthHex, SiEslint, SiEslintHex, SiGithub, SiHono, SiHonoHex, SiLucide, SiLucideHex, SiReact, SiReactHex, SiReactrouterHex, SiShadcnui, SiSharp, SiSharpHex, SiSqlite, SiSqliteHex, SiTailwindcss, SiTailwindcssHex, SiVite, SiViteHex } from '@icons-pack/react-simple-icons';
import { BicepsFlexed, Brain, Cpu, Layers2, Layers3, Lollipop, Rocket, Zap } from 'lucide-react';
import { Link } from 'react-router';

const features = [
    {
        title: 'Enjoyable',
        icon: Lollipop,
        description: 'No monorepo overhead. No complex scripts. Just one unified codebase with a single config file.',
    },
    {
        title: 'Customizable',
        icon: BicepsFlexed,
        description: 'Fully configurable with Vite. Extend the configuration how you want. Include the bloat you actually need.',
    },
    {
        title: 'Fast',
        icon: Zap,
        description: 'Fast development, fast hot refresh, fast builds with Vite and Rolldown. Faster than your NextJS.',
    },
    {
        title: 'Type-safe',
        icon: Brain,
        description: 'End-to-end type safety between server and client with Hono\'s typed routes, tRPC and standard schema validators.',
    },
    {
        title: 'Modern',
        icon: Cpu,
        description: 'Uses modern up-to-date technologies, latest standards and optimized builds.',
    },
    {
        title: 'Deploy anywhere',
        icon: Rocket,
        description: 'Target any runtime - Node, Bun, Cloudflare Workers etc.',
    },
];

export function meta() {
    return [
        { title: 'vth stack' },
        { name: 'description', content: 'A full-stack template powered by Vite, Typescript, Hono and React Server Components, with a shared, strongly typed codebase for both client and server.' },
    ];
}

export default function Home() {
    return (
        <main className="size-full bg-background text-foreground">
            <Navbar />

            <section className="relative min-h-screen w-screen h-screen motion-blur-in motion-duration-[1s]/blur">
                <div
                    className="relative flex size-full items-center justify-center overflow-x-hidden"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, hsl(var(--secondary) / 0.4) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--secondary) / 0.4) 1px, transparent 1px)',
                        backgroundSize: '300px 300px',
                        maskImage: 'linear-gradient(black 0%, transparent 75%)',
                        WebkitMaskImage: 'linear-gradient(black 0%, transparent 75%)',
                        maskClip: 'no-clip',
                        WebkitMaskClip: 'no-clip',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                    }}
                >
                    <div className="absolute size-full top-0 inset-0 flex flex-col justify-center opacity-15 motion-opacity-in-0 motion-duration-2000">
                        <Shaders />
                    </div>

                    <SiVite className="rotate-12 absolute top-8 -right-50 size-[600px] dark:opacity-5 dark:text-foreground text-[#646CFF]" />
                    <SiHono className="rotate-12 absolute top-8 -left-50 size-[600px] dark:opacity-5 dark:text-foreground text-[#E36002]" />

                    <div
                        className="absolute bottom-0 size-full top-0"
                        style={{
                            background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.1) 10%, transparent 50%)',
                        }}
                    />
                </div>

                <div className="absolute inset-0 z-20 flex items-center justify-center overflow-x-hidden">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-5xl font-extrabold relative dark:bg-gradient-to-b dark:from-foreground dark:to-foreground/50 dark:text-transparent dark:bg-clip-text">
                            <span className="text-[180px] uppercase [&_*]:bg-gradient-to-t [&_*]:from-slate-700 [&_*]:text-transparent [&_*]:bg-clip-text">
                                <span className="to-[#646CFF]/50 mr-2">v</span>
                                <span className="to-[#3178C6]/50">t</span>
                                <span className="to-[#E36002]/50">h</span>
                            </span>
                            <br />
                            The ultimate full-stack starter
                        </h1>

                        <MockupCode className="mt-8 w-4/5">
                            <MockupCodeLine prefix="$">pnpm create <span className="text-primary font-bold">vth</span></MockupCodeLine>
                        </MockupCode>

                        <p className="text-2xl mt-10 max-w-[600px] text-pretty leading-relaxed opacity-80">
                            A full-stack template powered by Vite, Typescript, Hono and React Server Components, with a shared, strongly typed codebase for both client and server.
                        </p>

                        <div className="mt-10 flex items-center gap-4 hover:[&>button]:-translate-y-1 [&>button]:transition-all [&>button]:duration-200 [&>button]:delay-100">
                            <Link to={{ pathname: 'docs' }}>
                                <Button className="py-6 text-xl min-w-[200px] !bg-gradient-to-br text-shadow-sm from-purple-300 to-blue-400 bg-transparent border-t border-t-white text-white">
                                    Get started
                                </Button>
                            </Link>
                            <Link to={GITHUB}>
                                <Button variant="outline" className="py-6 text-xl min-w-[200px]">
                                    <SiGithub />
                                    Github
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-5xl space-y-16 px-4 py-8">
                <div className="text-center gap-y-4 flex flex-col items-center">
                    <h2 className="text-5xl font-bold bg-gradient-to-r bg-clip-text from-foreground to-primary text-transparent">Build the framework you want</h2>

                    <p className="text-xl max-w-3xl font-light leading-relaxed">
                        Shape your stack your way using Vite and Rollup’s rich ecosystem.
                        <br />
                        Use frameworks of your choice.
                    </p>
                </div>

                <div
                    className="animate-in fade-in zoom-in shadow-2xl shadow-border grid grid-cols-1 divide-x divide-y divide-dashed divide-border border border-dashed border-border sm:grid-cols-2 md:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <div className="max-w-xl mt-8">
                            <div className="space-y-2">
                                <h1 className="text-6xl font-bold">Using <span className="text-primary">modern</span> tools</h1>
                                <p className="text-xl text-balance">Built on modern standards to make your development as good as possible.</p>
                            </div>

                            <Tabs className="my-6" defaultValue="full">
                                <TabsList className="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
                                    <TabsTrigger
                                        value="full"
                                        className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
                                    >
                                        <Layers3
                                            className="-ms-0.5 me-1.5 opacity-60"
                                            size={16}
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                        Full-stack
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="lite"
                                        className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
                                    >
                                        <Layers2
                                            className="-ms-0.5 me-1.5 opacity-60"
                                            size={16}
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                        Lite stack
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="lite">
                                    <p className="text-lg">This is a lightweight stack using:</p>

                                    <div className="mt-2 leading-relaxed [&_span]:flex [&_span]:gap-2 [&_span]:items-center">
                                        <span>
                                            <SiVite size={16} color={SiViteHex} />
                                            <b>Vite</b> - a build and development tool for the Web
                                        </span>
                                        <span>
                                            <SiHono size={16} color={SiHonoHex} />
                                            <b>Hono</b> - a framework for the backend
                                        </span>
                                        <span>
                                            <SiReact size={16} color={SiReactHex} />
                                            <b>React</b> - a framework for the frontend
                                        </span>
                                    </div>

                                    <MockupCode className="mt-4 w-4/5">
                                        <MockupCodeLine prefix="$">pnpm create vth --lite</MockupCodeLine>
                                    </MockupCode>

                                    <span className="block mt-4 text-lg">
                                        Learn more about this stack <Link to="/docs/templates/lite" className="hover:underline text-blue-600">here</Link>.
                                    </span>
                                </TabsContent>

                                <TabsContent value="full">
                                    <p className="text-lg">This is a full-stack template using:</p>

                                    <div className="mt-2 leading-relaxed [&_span]:flex [&_span]:gap-2 [&_span]:items-center">
                                        <span>
                                            <SiVite size={16} color={SiViteHex} />
                                            <b>Vite</b> - a build and development tool for the Web
                                        </span>
                                        <span>
                                            <SiHono size={16} color={SiHonoHex} />
                                            <b>Hono</b> - a framework for the backend
                                        </span>
                                        <span>
                                            <SiReact size={16} color={SiReactHex} />
                                            <b>React</b> - a framework for the frontend
                                        </span>
                                        <span>
                                            <SiReact size={16} color={SiReactrouterHex} />
                                            <b>RSC</b> for server-side rendering and filesystem routing
                                        </span>
                                        <span>
                                            <SiTailwindcss size={16} color={SiTailwindcssHex} />
                                            <b>TailwindCSS</b> - styling with classes
                                        </span>
                                        <span>
                                            <SiShadcnui size={16} color="#fff" />
                                            <b>Shadcnui</b> - ui components
                                        </span>
                                        <span>
                                            <SiLucide size={16} color={SiLucideHex} />
                                            <b>Lucide</b> - consistent icons
                                        </span>
                                        <span>
                                            <SiBetterauth size={16} color={SiBetterauthHex} />
                                            <b>BetterAuth</b> - a comprehensive authentication framework
                                        </span>
                                        <span>
                                            <SiSqlite size={16} color={SiSqliteHex} />
                                            <b>SQLite</b> database with <b>Kysely</b> for query building
                                        </span>
                                        <span>
                                            <SiSharp size={16} color={SiSharpHex} />
                                            Image optimization with <b>Sharp</b> and <b>SVGO</b>
                                        </span>
                                        <span>
                                            <img src="./react-scan.svg" className="size-4" />
                                            <b>React Scan</b> for detecting performance issues
                                        </span>
                                        <span>
                                            <SiEslint size={16} color={SiEslintHex} />
                                            <b>ESLint</b> - code linter and formatter
                                        </span>
                                    </div>

                                    <MockupCode className="mt-4 w-4/5">
                                        <MockupCodeLine prefix="$">pnpm create vth</MockupCodeLine>
                                    </MockupCode>

                                    <span className="block mt-4 text-lg">
                                        Learn more about this stack <Link to="/docs/overview" className="hover:underline text-blue-600">here</Link>.
                                    </span>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    <div className="flex justify-center pb-24">
                        <div
                            style={{
                                maskImage: 'radial-gradient(circle at center, black, transparent 90%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 90%)',
                                maskClip: 'no-clip',
                                WebkitMaskClip: 'no-clip',
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                            }}
                        >
                            <IconCloud />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-border py-12 flex justify-center">
                <div className="space-y-4">
                    <Link to={GITHUB} className="cursor-pointer duration-200 opacity-50 hover:opacity-100">
                        <SiGithub size={28} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
