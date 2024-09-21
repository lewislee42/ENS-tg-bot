import dynamic from 'next/dynamic'
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const MainContent = dynamic(() => import('./components/MainContent'), { ssr: false })

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="w-full p-4">
        <div className="max-w-7xl mx-auto flex justify-end">
          <DynamicWidget />
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <MainContent />
        </div>
      </div>
    </div>
  )
}