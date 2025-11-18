import Slider from "../components/Slider.jsx";
import Tabs from "../components/tabs.jsx";
import Freshmealplans from "../components/Freshmealplans.jsx";
import Location from "../components/Location.jsx";
import Herosection from "../components/Herosection.jsx";
import { PopularMenu } from "../components/PopularMenu.jsx";
import FoodMenu from "../components/FoodMenu.jsx"; // Import the new component
import { OurHistory } from "../components/OurHistory.jsx";
import BiggestBrands from "../components/Bigestbarand.jsx";
import Testimonials from "../components/Testimonials.jsx";

const Home = () => {
  return (
    <>
      <Herosection />
      {/* <PopularMenu /> */}
      <FoodMenu /> {/* Add the FoodMenu component */}
      {/* <Slider /> */}
      {/* <Tabs /> */}
      <Freshmealplans />
      <OurHistory />
      <Location />
      <BiggestBrands />
      <Testimonials />
    </>
  );
};

export default Home;
