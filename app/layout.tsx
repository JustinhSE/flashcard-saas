import { ReactNode } from 'react';
import { Providers } from '@/providers';
import { Header } from '@/components/Header';

function RootLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <title>Flashcard SaaS</title>
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}

export default RootLayout;
