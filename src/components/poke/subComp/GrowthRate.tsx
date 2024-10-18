interface GrowthRateProps {
  GrowthRate: string | null;
}
const capitalize = (str: string): string => {
  const updatedstr = str.replace(/-/g, " ");
  return updatedstr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const GrowthRates: React.FC<GrowthRateProps> = ({ growthRate }) => {
  if (!growthRate) {
    return <div> Loading...</div>;
  }
  return (
    <div className="">
      <p className="font-medium text-lg">Growth Rate</p>{" "}
      <p className="border w-40 px-4 py-1 rounded-sm flex justify-center ">
        {capitalize(growthRate)}
      </p>{" "}
    </div>
  );
};

export default GrowthRates;
