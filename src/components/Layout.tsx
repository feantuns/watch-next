export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-xl w-full p-6 mb-48">{children}</div>
    </main>
  );
}
