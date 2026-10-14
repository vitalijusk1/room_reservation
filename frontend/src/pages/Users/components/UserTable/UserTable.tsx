import { users } from "./data";

const UserTable = () => {
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
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                    {user.initials}
                  </span>
                  <p className="text-sm font-semibold">{user.firstName} {user.lastName}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">{user.id}</td>
              <td className="px-6 py-4">
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                  {user.reservations}
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
