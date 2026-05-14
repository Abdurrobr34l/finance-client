import { Link, useLocation } from 'react-router';
import Container from '../../components/shared/Container';
import("./animation.css")
{/* 
  404 Animation Credit:
  Original animation by JON KANTNER on CodePen
  Source: https://codepen.io/jkantner
  Modified and converted to React by ABDUR ROB
*/}

const ErrorPage404 = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <section>
      <Container className="flex flex-col items-center justify-center py-10 min-h-screen text-center bg-base-100 md:py-20 md:gap-6 lg:flex-row lg:gap-10 xl:gap-20 2xl:py-0!">
        {/* Animated 404 Face */}
        <svg
          className="face w-[95%]! lg:w-[40%]! 2xl:w-[30%]!"
          viewBox="0 0 320 380"
          width="320px"
          height="380px"
          aria-label="Animated 404 face"
          style={{ color: 'currentcolor' }}
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="25"
          >
            <g className="face__eyes" transform="translate(0, 112.5)">
              <g transform="translate(15, 0)">
                <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
                <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
              </g>
              <g transform="translate(230, 0)">
                <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
                <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
              </g>
            </g>
            <rect className="face__nose" rx="4" ry="4" x="132.5" y="112.5" width="55" height="155" />
            <g strokeDasharray="102 102" transform="translate(65, 334)">
              <path className="face__mouth-left" d="M 0 30 C 0 30 40 0 95 0" strokeDashoffset="-102" />
              <path className="face__mouth-right" d="M 95 0 C 150 0 190 30 190 30" strokeDashoffset="102" />
            </g>
          </g>
        </svg>

        <div className='flex flex-col gap-4 mt-6'>

          {/* Subheading */}
          <h2 className="text-3xl font-semibold text-primary md:text-4xl lg:text-5xl">
            Oops! Page not found.
          </h2>

          {/* Description */}
          <p className="text-base text-center text-secondary max-w-md">
            The page you're looking for might have been removed or is temporarily
            unavailable. Let's guide you back home where everything's cozy.
          </p>

          {/* Navigation Button */}
          <Link
            to={isDashboardRoute ? "/dashboard" : "/"}
            className="btn btn-primary"
          >
            {isDashboardRoute ? "Go to Dashboard" : "Go to Home"}
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ErrorPage404;