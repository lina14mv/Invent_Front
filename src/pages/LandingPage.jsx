import Navbar from "/src/features/landing/components/navbar";

const LandingPage = ({ Content }) => {
  return (
    <section className="w-screen h-screen overflow-x-hidden lg:overflow-y-hidden overflow-y-scroll">
      <header className="flex items-center justify-center top-0 left-0 w-full h-18 pr-10 bg-white drop-shadow-md z-10">
        <Navbar />
      </header>
      <main className="flex-1 bg-green-100 h-full">
        <Content />
      </main>
    </section>
  );
};

export default LandingPage;
