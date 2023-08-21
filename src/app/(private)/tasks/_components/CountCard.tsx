import Link from "next/link";
import React from "react";

function CountCard({
  title,
  count,
  path,
  queryParams,
}: {
  title: string;
  count: number;
  path: string;
  queryParams: any;
}) {
  const getRandomTextColour: any = () => {
    const colours = [
      "#BB2525",
      "#5C5470",
      "#0C356A",
      "#445069",
      "#79155B",
      "#7EAA92",
      "#c0c0c0",
    ];

    const randomIndex = Math.floor(Math.random() * colours.length);

    return colours[randomIndex];
  };

  return (
    <Link
      href={{
        pathname: path,
        query: queryParams,
      }}
    >
      <div className="flex flex-col gap-5 p-5 border border-gray-300 items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-600">{title}</h1>
        <h1
          className="text-7xl font-semibold"
          style={{ color: getRandomTextColour() }}
        >
          {count}
        </h1>
      </div>
    </Link>
  );
}

export default CountCard;
