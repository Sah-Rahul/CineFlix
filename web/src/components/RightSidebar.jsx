import React from "react";
import { FaSearch } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Rahul",
    username: "@rahulmernstack",
    img: "https://imgs.search.brave.com/VAWLpqOIM1TGZM0-JRDBW-vPwRyJu4mctHh5wQj0cq8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFrcmI1STVJNUwu/cG5n",
  },
  {
    id: 2,
    name: "Rahul",
    username: "@rahulmernstack",
    img: "https://imgs.search.brave.com/NlqR-oQf2g6zFg6-OlZp-U9ZoZJC7YO5VmhfzCU305o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci84MTQv/Mjg1L0hELXdhbGxw/YXBlci1iZXN0LWFu/aW1lLWJveS1saXN0/ZW5pbmctbXVzaWMt/YmVzdC1hbmltZS1i/b3ktYW5pbWUtYm95/LWxpc3RlbmluZy1t/dXNpYy1jdXRlLWFu/aW1lLWJveS10aHVt/Ym5haWwuanBn",
  },
  {
    id: 3,
    name: "Rahul",
    username: "@rahulmernstack",
    img: "https://imgs.search.brave.com/_YEI-tHS7EPZ1QUtXd9dXM0tQ-WezZGsrM1xfsMl5Bs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzYWZhcmku/Y29tL2ltYWdlL2xv/dmUtYW5pbWUtYm95/LXdhbGxwYXBlcnMu/anBn",
  },
];

const RightSidebar = () => {
  return (
    <div className="hidden md:block w-full max-w-xs p-4 space-y-4">
      {/* Search Bar */}
      <div className="bg-gray-300 rounded-full px-4 relative py-2 flex items-center space-x-2">
        <FaSearch className="text-gray-500 absolute right-2 text-sm cursor-pointer" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-full text-black placeholder-gray-500"
        />
      </div>

      {/* Who to Follow */}
      <div className="bg-gray-100 rounded-2xl p-4">
        <h2 className="text-lg font-bold text-black  mb-3">Who to follow</h2>

        {/* User List */}
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between hover:bg-gray-200   p-2 rounded-lg cursor-pointer transition"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-black  text-sm">
                    {user.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {user.username}
                  </p>
                </div>
              </div>

              <button className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-1 rounded-full font-semibold text-sm hover:opacity-90 transition">
                Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
