import Navbar from "/src/features/landing/components/navbar";

const LandingPage = ({ Content }) => {
  return (
    <section className="w-screen h-screen overflow-x-hidden xl:overflow-y-hidden overflow-y-scroll">
      <header className="flex items-center justify-center top-0 left-0 w-full h-20 lg:h-30 pr-10 bg-white shadow-md z-10">
        <Navbar />
      </header>
      <main className="flex-1 bg-green-100 xl:h-lvh h-auto">
        <Content />
      </main>
    </section>
  );
};

export default LandingPage;
