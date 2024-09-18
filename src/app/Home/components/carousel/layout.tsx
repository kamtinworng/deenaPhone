import { Container } from "@mantine/core";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <Container size={"xl"}>{children}</Container>
        </div>
      </body>
    </html>
  );
}
