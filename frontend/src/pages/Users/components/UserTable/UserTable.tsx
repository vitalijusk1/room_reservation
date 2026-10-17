import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { endpoints } from "../../../../api/endpoints";
import type { User } from "./types";
import { Loader } from "../../../../components/Loader/Loader";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

const UserTable = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
      const response = await axiosInstance.get(endpoints.users());
      const data = response.data;
      setUsers(data);
      setError(null);
      setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : null);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-xs text-slate-500">
          <tr>
            <th className="px-6 py-3 font-semibold">User</th>
            <th className="px-6 py-3 font-semibold">User ID</th>
            <th className="px-6 py-3 font-semibold">Active reservations</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4">
                <p className="text-sm font-semibold">{user.firstName} {user.lastName}</p>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">{user.id}</td>
              <td className="px-6 py-4">
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                  {user.activeReservationsCount}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
