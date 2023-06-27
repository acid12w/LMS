import { UilAngleRightB } from "@iconscout/react-unicons";
import { UilAngleLeftB } from "@iconscout/react-unicons";

export const NavBtn = () => {
  return (
    <div className="flex">
      <span className="bg-green-300 p-1 ">
        <UilAngleLeftB className="fill-slate-100" />
      </span>{" "}
      <span className="bg-green-400 p-1 ">
        <UilAngleRightB className="fill-slate-100" />
      </span>
    </div>
  );
};
