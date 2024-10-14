import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigation-menu";
import { useNavigate } from "react-router-dom";
import Registrations from "@/components/siginUp";
import { CgPokemon } from "react-icons/cg";
const Layout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col h-full">
      <header className="flex justify-center">
        <div className="flex justify-center w-full border-b-2   bg-white  ">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => navigate("/")}
                  className="flex flex-col sm:my-1 md:my-3"
                >
                  <div>
                    <CgPokemon className="w-5 h-5 md:w-10 md:h-10 lg:h-12 lg:w-14" />
                  </div>
                  <div>Pokedex</div>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main className="grow">
        {/* <Outlet /> */}
        {children}
      </main>
      <footer>
        <div className="bg-[#1f1f1f]  pb-10 lg:pb-56 h-full flex flex-col justify-center   items-center md:justify-start md:pl-10">
          <div className="text-white md:w-full">
            <div className="">
              <Registrations />
            </div>
            <div className="xl:flex xl:justify-center">
              <div className="grid grid-cols-6 lg:grid-cols-12 xl:grid-cols-7 xl:w-7/12  w-full lg:gap-8">
                <div className=" col-span-6 lg:col-span-3 xl:col-span-2 ">
                  <div className="md:pl-8">
                    <ul>
                      <li className="md:font-bold md:py-16 lg:py-0 lg:pb-2 lg:font-bold">
                        The Pokemon Company
                      </li>
                      <li>News</li>
                      <li>Parents Guide</li>
                      <li>Customer Service</li>
                      <li>About Our Company</li>
                      <li>Careers</li>
                      <li>Select a Country/Region</li>
                      <li>Press Site</li>
                    </ul>
                  </div>
                </div>
                <div className="col-span-6 xl:col-span-3 pt-4  lg:border-l-4 lg:border-r-4 lg:border-gray-900 ">
                  <div className="flex flex-row items-center md:border-gray-900 md:justify-start md:border-t-4 lg:border-t-0 lg:border-b-0 md:border-b-4 md:ml-8 md:py-6 md:my-4 md:w-9/12 lg:pl-8 gap-4 justify-center lg:justify-center">
                    <img
                      src="../src/assets/Instagram.png"
                      className="h-6  lg:h-12"
                    />
                    <img
                      src="../src/assets/f-logo-hd-png-17.png"
                      className="h-6 lg:h-16"
                    />
                    <img
                      src="../src/assets/twitter-logo-transparent-15.png"
                      className="h-6 lg:h-12"
                    />
                    <img
                      src="../src/assets/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.webp"
                      className="h-7 lg:h-14"
                    />
                  </div>
                </div>
                <div className="hidden md:flex md:col-span-6 xl:col-span-2 lg:col-span-3">
                  <div className="flex justify-center pl-8 items-center flex-col">
                    <ul>
                      <li>Term of Use</li>
                      <li>Privacy Notice</li>
                      <li>Cookie Page</li>
                      <li>Legal Info</li>
                      <li>Security</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
