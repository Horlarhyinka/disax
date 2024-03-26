import Accountcard from "./Accountcard";
import Menu from "./Menu";
import Cookies from "js-cookie";

const Leftsidebar = () => {

  // const user = JSON.parse(Cookies.get("user"));
  const user = {
    "first_name": "Titi Simon",
    "last_name": " ",
    "profile_pic": "../../pic1.png",
    "username": "titisimon21"
    }

  return (
    <div className=" border-r-[1px] border-gray-500 hidden md:block pt-5 ">
      {/* Logo */}
      <div className=" flex gap-3 items-center justify-self-center md:justify-self-start ">
        <div className="w-[70px]">
          <img src="../../Vector.png" />
        </div>
        <div className="flex flex-col  font-semibold text-[24px]">
          <h1>DisaXta</h1>
        </div>
      </div>
      <Menu />
      {/* Name box */}
      <div className="flex flex-row items-center my-6 self-center ">
        {/* Img here */}
        <Accountcard user={user} />
        <div>
        {/* <h3>{user?.first_name}</h3> */}
          {/* <p>@{user?.username}</p> */}
        </div>
      </div>
    </div>
  );
};



export default Leftsidebar;
