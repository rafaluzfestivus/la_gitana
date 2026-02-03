import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sanity Studio',
    description: 'Backend management for La Gitana',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="sanity-studio fixed inset-0 z-[9999] bg-white text-black overflow-auto">
            {children}
        </div>
    )
}
