import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage your tasks and stay productive.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-white border rounded-xl px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-2 w-32"
          />
        </div>

        <button className="relative p-2 bg-white rounded-xl border">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            S
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold text-sm">Student</p>
            <p className="text-xs text-gray-400">My Profile</p>
          </div>
        </div>
      </div>
    </header>
  );
}