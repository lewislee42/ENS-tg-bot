import DynamicProviderWrapper from './components/DynamicProviderWrapper'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <DynamicProviderWrapper>
          {children}
        </DynamicProviderWrapper>
      </body>
    </html>
  )
}