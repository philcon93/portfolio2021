import Head from 'next/head';
import { SidebarNav } from '../components/sidebar-nav';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="antialiased bg-gray-100 dark-mode:bg-gray-900">
        <SidebarNav />        
      </main>
    </div>
  )
}
