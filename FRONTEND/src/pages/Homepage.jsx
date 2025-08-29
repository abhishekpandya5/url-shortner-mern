import FormHeader from "../components/FormHeader";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <HeroSection />
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <FormHeader />
          <UrlForm />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
