"use client";

import { BiSolidCar } from "react-icons/bi";
import { MdOutlineAssignment } from "react-icons/md";
import { MdAssignmentLate } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { RiMessage2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <div className="w-[300px] h-screen flex flex-col justify-between pt-4 text-[#515050] border-r-[1.8px] bg-[#90aee4] border-[#a8c2f3] pl-5">
      <div className="flex flex-col gap-1">
        <section className="text-2xl mb-5">
          <Image src={"/next.svg"} width={100} height={100} alt="LOGO" />
        </section>
        <section className="flex flex-col justify-center gap-4 w-[95%] h-[230px] pl-4 bg-[#a8c2f3] rounded-xl">
          <span
            className="flex items-center gap-1 text-md font-bold cursor-pointer"
            onClick={() => handleNavigation("/manager/createDriver")}
          >
            <ImProfile className="text-2xl" />
            Create Driver
          </span>
          <span
            className="flex items-center gap-1 text-md font-bold cursor-pointer"
            onClick={() => handleNavigation("/manager/AssignDriver")}
          >
            <MdOutlineAssignment className="text-2xl" />
            Assign Driver
          </span>
          <span
            className="flex items-center gap-1 text-md font-bold cursor-pointer"
            onClick={() => handleNavigation("/manager/unAssignDriver")}
          >
            <MdAssignmentLate className="text-2xl" />
            Un Assign Driver
          </span>
          <span
            className="flex items-center gap-1 text-md font-bold cursor-pointer"
            onClick={() => handleNavigation("/manager/VehicleInfo")}
          >
            <BiSolidCar className="text-2xl" />
            Vehicle Info
          </span>
          {/* <span className="flex items-center gap-1 text-md font-bold cursor-pointer">
            <RiMessage2Line className="text-2xl" />
            Profile
          </span> */}
        </section>
      </div>
      <section className="h-[70px] w-[95%] bg-[#a8c2f3] mb-2 rounded-2xl flex justify-start items-center p-4 gap-2">
        <span className="w-12 h-12 bg-[#7da1e9] rounded-full flex justify-center items-center">
          P
        </span>
        <span className="font-semibold">User ID</span>
      </section>
    </div>
  );
}
