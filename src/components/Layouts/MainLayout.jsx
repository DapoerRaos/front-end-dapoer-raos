import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children, token }) => {
  return (
    <div>
      <Navbar token={token} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
