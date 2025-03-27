import Auth from "../features/auth/Login";
import Navbar from "/src/features/landing/components/navbar";

const Login = () => {
  return (
    <section className="w-screen h-screen">
          <header className="flex items-center justify-center top-0 left-0 w-full h-30 pr-10 bg-white shadow-md">
            <Navbar />
          </header>
          <main className="">
            <Auth />
          </main>
        </section>
  );
};

export default Login;
