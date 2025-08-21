import { isPathEqual, isRelativeUrl } from '@/lib/utils';
import { MDXProvider } from '@mdx-js/react';
import { useQuery } from '@tanstack/react-query';
import path from 'path-browserify-esm';
import urlJoin from 'url-join';
import { Fragment, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import { Link, useLocation } from 'react-router';
import { clsx } from 'clsx';
import { Button } from '../ui/button';
import { Code } from './code';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '../ui/theme-toggle';
import { formatSection, Section } from './section';
import { useActiveSection } from './active';

const modules = import.meta.glob('../../docs/**/*.mdx');

const sidebar = [
    { title: 'Overview', link: '/' },
    { title: 'Getting started', link: '/quickstart' },
    { title: 'Project structure', link: '/project-structure' },
    { title: 'Other Templates' },
    { title: 'Lite', link: '/templates/lite' },
    { title: 'Alternatives' },
    { title: 'NextJS', link: '/alternatives/next' },
];

// @ts-expect-error whatever
const joinDocs = urlJoin.bind(void 0, '/docs') as typeof urlJoin;

export function Docs() {
    const location = useLocation();
    const { data } = useQuery({
        queryKey: ['docs'],
        queryFn() {
            return Promise.all(
                Object.keys(modules).map(async (pagePath) => {
                    const relativePath = path.relative('../../docs', pagePath);
                    const parts = relativePath.split(path.sep);
                    const { default: Component } = await modules[pagePath]() as {
                        default: () => JSX.Element;
                    };

                    return {
                        path: relativePath,
                        parts,
                        component: Component,
                    };
                }),
            );
        },
    });

    const articleRef = useRef<HTMLElement>(null);

    const Component = useMemo(() => {
        if (!data) return () => <></>;

        const pathname = location?.pathname.replace('/docs', '') || '/';
        const page = data.find((doc) => {
            let docPath = doc.path.split('.')[0].trim();

            if (docPath.endsWith('index')) docPath = docPath.replace('index', '/');

            if (isPathEqual(pathname, docPath)) return true;
        });

        return page?.component || (() => <p className="text-center my-12 text-xl font-bold">Not Found...</p>);
    }, [data, location]);

    const [headings, setHeadings] = useState<Element[]>([]);
    const [currentId, setCurrentId] = useActiveSection(articleRef.current, [data, location]);

    useEffect(() => {
        if (!articleRef.current) return;

        const headings = Array.from(articleRef.current.querySelectorAll('h2, h3') || []);
        setHeadings(headings);
    }, [data, location]);

    const links = sidebar.filter(({ link }) => !!link);

    const currentSidebarIndex = useMemo(() => {
        return links.findIndex(({ link }) => {
            const pathname = joinDocs(link!);
            const isActive = isPathEqual(pathname, location.pathname);
            return isActive;
        });
    }, [location.pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (location.hash) {
            document.querySelector(location.hash)?.scrollIntoView();
        }
    }, [data, location]);

    if (!data) return <></>;

    return (
        <div className="flex size-full min-h-screen">
            <div className="flex-1 justify-start size-full">
                <div className="flex justify-end p-8 relative">
                    <div className="w-52 mt-3 fixed">
                        <Link to={{ pathname: '/' }}>
                            <h2 className="font-bold text-3xl select-none">☄️ vth</h2>
                        </Link>

                        <hr className="my-4" />

                        <div className="flex flex-col gap-4">
                            {sidebar.map((element, index) => {
                                if (element.link) {
                                    const pathname = joinDocs(element.link);
                                    const isActive = currentSidebarIndex === index;

                                    return (
                                        <Link key={index} to={{ pathname }} className={clsx(isActive ? 'text-primary' : 'text-foreground/75')}>
                                            {element.title}
                                        </Link>
                                    );
                                }

                                return (
                                    <Fragment key={index}>
                                        <hr className="my-2" />
                                        <p className="font-semibold">{element.title}</p>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center flex-1 gap-y-2">
                <article className="w-[calc(70ch+(3rem*2))] px-8 pb-4 bg-secondary/20" ref={articleRef}>
                    <MDXProvider components={{
                        h1(props) {
                            return (
                                <Section id={props.children} className="py-8">
                                    <h1 className="mb-6 text-4xl font-700" {...props} />
                                    <hr />
                                </Section>
                            );
                        },
                        h2(props) {
                            return (
                                <Section id={props.children}>
                                    <h2 className="my-6 text-3xl font-600" {...props} />
                                </Section>
                            );
                        },
                        h3(props) {
                            return (
                                <Section id={props.children}>
                                    <h3 className="my-4 text-2xl font-600" {...props} />
                                </Section>
                            );
                        },
                        h4(props) {
                            return (
                                <Section id={props.children}>
                                    <h4 className="my-4 text-xl font-600" {...props} />
                                </Section>
                            );
                        },
                        p(props) {
                            return <p className="font-light text-lg leading-loose" {...props} />;
                        },
                        code(props) {
                            return <Code {...props} />;
                        },
                        a(props) {
                            return <a target={isRelativeUrl(props.href) ? '_self' : '_blank'} className="text-primary hover:underline" {...props} />;
                        },
                        em(props) {
                            return <i className="italic" {...props} />;
                        },
                        strong(props) {
                            return <b className="font-semibold" {...props} />;
                        },
                        blockquote(props) {
                            return <blockquote className="my-2 pl-2 border-l-4 border-l-solid border-l-slate-6 rounded-sm bg-secondary" {...props} />;
                        },
                        ul(props) {
                            return <ul className="list-disc-inside ml-2 font-300 text-lg" {...props} />;
                        },
                        li(props) {
                            return <li className="mb-2" {...props} />;
                        },
                    }}
                    >
                        <Component />
                    </MDXProvider>

                    <div className="w-full flex justify-between items-center my-8">
                        <div className="flex-1">
                            {links[currentSidebarIndex - 1] && (

                                <Link to={{ pathname: joinDocs(links[currentSidebarIndex - 1].link!) }}>
                                    <Button size="lg" variant="outline">
                                        <ArrowLeft />
                                        {links[currentSidebarIndex - 1].title}
                                    </Button>
                                </Link>
                            )}
                        </div>
                        {links[currentSidebarIndex + 1] && (
                            <div className="justify-end">
                                <Link to={{ pathname: joinDocs(links[currentSidebarIndex + 1].link!) }}>
                                    <Button size="lg" variant="outline">
                                        {links[currentSidebarIndex + 1].title}
                                        <ArrowRight />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </article>
            </div>

            <div className="flex-1 justify-end bg-secondary/20 pt-8">
                <div className="fixed">
                    <ThemeToggle />

                    <div className="m-4">
                        {headings.map((element, index) => {
                            return (
                                <Link key={index} to={{ hash: formatSection(element.textContent) }} onClick={() => setCurrentId(formatSection(element.textContent)!)}>
                                    <div className={clsx(
                                        'border-l-2 border-l-border border-l-solid py-2',
                                        element.tagName.toLowerCase() === 'h3' ? 'px-8' : 'px-4',
                                        currentId === formatSection(element.textContent) && 'text-primary border-l-primary',
                                    )}
                                    >
                                        {element.textContent}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
