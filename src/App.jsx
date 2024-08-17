import Navbar from "./components/Navbar";
import RemoveBG from "./components/RemoveBG";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="h-screen">
        <RemoveBG />
      </div>
      <Footer />
    </div>
  );
}
