const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
