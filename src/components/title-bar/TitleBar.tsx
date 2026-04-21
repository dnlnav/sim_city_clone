import { Coins, Users } from "lucide-react";

const TitleBar = () => {
  return (
    <div
      id="titlebar-container"
      className="absolute top-0 left-20 right-0 z-10 flex h-16 items-center justify-between border-b-4 border-slate-900 bg-slate-800 px-6 shadow-inner"
    >
      <div className="flex items-center gap-2">
        <Coins className="h-6 w-6 text-emerald-300" strokeWidth={2.5} />
        <span className="text-lg font-bold tracking-wider text-emerald-100">
          $10,000
        </span>
      </div>

      <h1 className="text-xl font-bold tracking-widest text-white">My City</h1>

      <div className="flex items-center gap-2">
        <Users className="h-6 w-6 text-sky-300" strokeWidth={2.5} />
        <span className="text-lg font-bold tracking-wider text-sky-100">
          1,000
        </span>
      </div>
    </div>
  );
};

export default TitleBar;
