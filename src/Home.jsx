import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-center">
      <div
        className=" w-screen max-w-96 rounded-3xl p-10 flex flex-col items-center py-20 gap-7 h-[700px] overflow-y-auto"
        style={{
          background:
            "linear-gradient(0deg, rgba(255,255,63,1) 0%, rgba(50,217,81,1) 62%, rgba(52,168,83,1) 100%)",
        }}
      >
        <h1 className="font-logo text-white text-6xl">Cappibara</h1>
        <img
          src="cappibara.gif"
          alt="Cappibara"
          className="object-contain w-60"
        />
        <div className="border-gradient-2">
          <Link to="/cliente/login">
            <button className="relative font-sans text-2xl w-60 mx-auto font-extralight">
              Empieza ahora
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
