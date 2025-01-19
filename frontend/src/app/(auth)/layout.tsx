export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      <div className="container">
        <div className="auth-layout__content">
          {children}
        </div>
      </div>
    </div>
  );
} 