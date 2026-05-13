import React from 'react';
import Link from '../ui/Link';

const Navbar = () => {
  const links = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "pricing", name: "Pricing" },
    { id: 3, path: "transactions", name: "Transaction" },
    { id: 4, path: "dashboard", name: "Dashboard" }
  ]
  return (
    <nav>
      <ul className="flex gap-6 p-4">
        {links.map(({ id, path, name }) => (
          <li key={id}>
            <Link to={path}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;