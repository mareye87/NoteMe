import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex w-full min-h-screen justify-center pt-24">
      <SyncLoader color="#fde700 " />
      {/* <h1 className="text-3xl text-center text-white">Loading...</h1> */}
    </div>
  );
};

export default Loading;
