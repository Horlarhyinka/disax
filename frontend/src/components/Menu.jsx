import { BsPerson, BsFillHouseFill, BsBookmark, BsRobot, BsPeople } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";


const Menu = () => {
  const user = JSON.parse(Cookies.get("user"));

  return (
    <div className="flex flex-col px-6">
      {/* Menu */}
      <div className="list-none text-base md:text-xl font-semibold flex flex-col gap-0 md:gap-2 pt-10 mb-10 w-min ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
              : "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
          }
        >
          <BsFillHouseFill className="mr-1" color="" />
          Home
        </NavLink>
        <NavLink
          to={"/community"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
              : "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
          }
        >
          <BsPeople className="mr-1" />
          Community
        </NavLink>
        <NavLink
          to={`/${user.id}/disaX`}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
              : "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
          }
        >
          <BsRobot className="mr-1" />
          DisaX
        </NavLink>
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
              : "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
          }
        >
          <BsPerson className="mr-1" />
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
              : "flex items-center rounded-full p-2  hover:bg-gradient-to-r from-fuchsia-500 to-purple-600 "
          }
        >
          <BsBookmark className="mr-1" />
          Bookmark
        </NavLink>
      </div>
      {/* Post btn */}
      <Link
        to={"./createpost"}
        className="text-xl text-center font-semibold bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-purple-700 text-white p-3 rounded-full"
      >
        Post
      </Link>
    </div>
  );
};

export default Menu;
