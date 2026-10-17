import { Link } from "react-router-dom";
import { paths } from "../../router/paths";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900">404</h1>
        <p className="mt-4 text-xl text-slate-600">Page not found</p>
        <p className="mt-2 text-slate-500">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to={paths.rooms()}
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Go to Rooms
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
