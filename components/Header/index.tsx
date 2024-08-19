import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../Button';
import { type HeaderProps } from './types';

export const Header = ({ links = [] }: HeaderProps) => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                <Link
                    href="/"
                    className="flex items-center mb-4 font-medium text-gray-900 md:mb-0 title-font"
                >
                    {/* <Image
                        src="/logo.svg"
                        alt="ProductsWay Logo"
                        className="w-12 h-12"
                        width={30}
                        height={40}
                    /> */}
                    <span className="ml-3 text-xl">Flashcard SaaS</span>
                </Link>
                <nav className="flex flex-wrap items-center justify-center text-base md:py-1 md:pl-4 md:mr-auto md:ml-4 md:border-l md:border-gray-400">
                    {links.map((link) => (
                        <Link
                            key={link.url}
                            href={link.url}
                            className="mr-5 hover:text-gray-900"
                        >
                            {link.title}
                        </Link>
                    ))}
                </nav>
                <SignedOut>
                    <SignInButton>
                        <Button type="button" size="m">
                            Sign In
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 ml-1"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <div className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded md:mt-0 hover:bg-gray-200 focus:outline-none">
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </header>
    );
}

export * from './types';