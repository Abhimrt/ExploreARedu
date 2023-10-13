import Nav from '@/Components/Nav'
import './globals.css'

export const metadata = {
  title: 'Explore AR Education',
  description: 'Make Education interesting',
  content: "en-us"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body ><Nav />{children}</body>
    </html>
  )
}
