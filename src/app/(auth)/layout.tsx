const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-4">
      <div className="w-full max-w-100 rounded-card border border-border bg-background p-6 sm:max-w-130">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
