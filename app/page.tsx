// app/page.tsx
import dynamic from 'next/dynamic'
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const MainContent = dynamic(() => import('./components/MainContent'), { ssr: false })

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="w-full p-4 bg-gray-100">
        <div className="container mx-auto flex justify-end">
          <div className="w-48 h-12 bg-white rounded shadow flex items-center justify-center">
            <DynamicWidget />
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto">
          <MainContent />
        </div>
      </main>
    </div>
  )
}