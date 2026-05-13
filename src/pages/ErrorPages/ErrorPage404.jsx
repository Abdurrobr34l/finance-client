import { Link, useLocation } from 'react-router';

const ErrorPage = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>

      <section className="flex flex-col items-center justify-center min-h-screen gap-6 py-10 text-center bg-base-100">
        {/* 404 Image - Using public folder root path */}
        <img
          src="/404-error.png"
          alt="Page Not Found"
          className="w-80 md:w-125 lg:w-175 object-contain"
        />

        {/* 404 Heading */}
        <h1 className="text-6xl font-bold text-primary">404</h1>

        {/* Subheading */}
        <h2 className="text-2xl font-semibold text-secondary">
          Oops! Page not found.
        </h2>

        {/* Description */}
        <p className="text-base text-center text-gray-500 max-w-md">
          The page you’re looking for might have been removed or is temporarily
          unavailable. Let’s guide you back home where everything’s cozy.
        </p>

        {/* Dynamic Navigation Button */}
        <Link
          to={isDashboardRoute ? "/dashboard" : "/"}
          className="btn btn-primary"
        >
          {isDashboardRoute ? "Go to Dashboard" : "Go to Home"}
        </Link>
      </section>
    </>
  );
};

export default ErrorPage;