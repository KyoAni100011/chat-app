import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SideBarOperation() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <aside className="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
      <nav className="flex flex-1 flex-col gap-y-4 pt-10">
        <a
          onClick={logOut}
          className="group relative rounded-xl p-2 text-blue-600 hover:bg-gray-100"
        >
          <IconLogOut />
        </a>
      </nav>
      <div className="flex flex-col items-center gap-y-4 py-10">
        <button className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100">
          <IconReport />
        </button>
        <button className="mt-2 h-10 w-10 overflow-hidden rounded-full bg-gray-100">
          <img src={user.avatar} alt="avatar" />
        </button>
      </div>
    </aside>
  );
}

function IconLogOut() {
  return (
    <svg
      className="h-6 w-6 stroke-current"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke="#E74C3C"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 12H16"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#E74C3C"
      />
      <path
        d="M10 8L16 12L10 16"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#E74C3C"
      />
    </svg>
  );
}

function IconReport() {
  return (
    <svg
      width={24}
      height={24}
      className="h-6 w-6 stroke-current"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16H12.01M12 8V12V8Z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
