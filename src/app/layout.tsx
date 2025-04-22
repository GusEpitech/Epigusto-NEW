export const metadata = {
  title: 'Epigusto',
  description: "Epigusto est un jeu de plateforme en 2D développé en seulement 2 jours lors d'un hackathon Epitech",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
