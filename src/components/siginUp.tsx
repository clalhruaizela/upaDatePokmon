import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";

enum genders {
  male = "male",
  female = "female",
  other = "other",
}

interface InputForm {
  firstName: string;
  gender: genders;
  day: string;
  month: string;
  year: string;
}

const Registrations = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>();
  const onSubmits: SubmitHandler<InputForm> = (data) => {
    const dob = `${data.day}/${data.month}/${data.year}`;
    console.log({ ...data, dob });
  };

  return (
    <div className="text-white flex justify-center my-10 flex-col  lg:items-center md:pl-10 md:pt-14 md:justify-start">
      <form onSubmit={handleSubmit(onSubmits)}>
        <div className="py-3 font-bold text-xl">
          Sign Up for Pokemon emails!
        </div>
        <div className="grid grid-cols-6 gap-6 pb-10 ">
          <div className="col-span-6 lg:col-span-3 ">
            <input
              className="text-black rounded-sm px-2 "
              placeholder="First Name"
              {...(register("firstName"), { required: true })}
            />
            {errors.firstName && (
              <p className="text-red-500">First name is required</p>
            )}
          </div>
          {/* <div className="col-span-3">
            <input
              type="text"
              className="text-black text-center rounded-l-sm w-16"
              maxLength={2}
              placeholder="DD"
              {...register("day", {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Day must be a number",
                },
                validate: (value) =>
                  (parseInt(value) >= 1 && parseInt(value) <= 31) ||
                  "invalid day",
              })}
            />
            <input
              type="text"
              className="text-black w-16 text-center"
              maxLength={2}
              placeholder="MM"
              {...register("month", {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Month must be a number",
                },
                validate: (value) =>
                  (parseInt(value) >= 1 && parseInt(value) <= 12) ||
                  "invalid Month",
              })}
            />
            <input
              type="text"
              className="text-black w-16 text-center rounded-r-sm"
              maxLength={4}
              placeholder="YYYY"
              {...register("year", {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Year must be a number",
                },
                validate: (value) =>
                  (parseInt(value) >= 1900 &&
                    parseInt(value) <= new Date().getFullYear()) ||
                  "Invalid Year",
              })}
            />

            {errors.day && <p className="text-red-500">{errors.day.message}</p>}
            {errors.month && (
              <p className="text-red-500">{errors.month.message}</p>
            )}
            {errors.year && (
              <p className="text-red-500">{errors.year.message}</p>
            )}
          </div> */}
          <div className="col-span-6 lg:col-span-3">
            <label className="pr-4 text-gray-300">Gender Selection</label>
            <select
              className="text-black px-4 py-1 rounded-sm "
              {...register("gender", { required: true })}
            >
              <option value="other">other</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="col-span-6">
            <Button type="submit" variant={"destructive"}>
              SIGN UP
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Registrations;
