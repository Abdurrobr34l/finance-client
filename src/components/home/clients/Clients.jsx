import {
  SiPaypal,
  SiStripe,
  SiVisa,
  SiMastercard,
  SiWise,
  SiRevolut,
  SiSquare,
} from "react-icons/si";
import "./clientsAnimation.css";
import Container from "../../shared/Container";
import SectionTitles from "../../ui/SectionTitles";
import SectionSubTitle from "../../ui/SectionSubTitle";

const logos = [
  { id: 1, name: "PayPal",     Icon: SiPaypal,     color: "#009cde" },
  { id: 2, name: "Stripe",     Icon: SiStripe,     color: "#635bff" },
  { id: 3, name: "Visa",       Icon: SiVisa,       color: "#1a1f71" },
  { id: 4, name: "Mastercard", Icon: SiMastercard, color: "#eb001b" },
  { id: 5, name: "Wise",       Icon: SiWise,       color: "#00b9ff" },
  { id: 6, name: "Revolut",    Icon: SiRevolut,    color: "#0f64ff" },
  { id: 7, name: "Square",     Icon: SiSquare,     color: "#3e4348" },
];

const Clients = () => {
  const repeatedLogos = [...logos, ...logos];

  return (
    <section className="sectionPadding relative overflow-hidden bg-base-100">
      {/* GLOW BACKGROUND */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <Container>
        {/* TITLE */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-accent">
            Trusted By
          </p>
          <SectionTitles>
            Trusted by teams who care about money clarity
          </SectionTitles>
          <SectionSubTitle customCss="mx-auto max-w-2xl">
            A clean logo strip designed to match modern fintech platforms.
          </SectionSubTitle>
        </div>

        {/* MARQUEE WRAPPER */}
        <div className="relative z-10 mt-12 overflow-hidden rounded-3xl py-8">

          {/* FADES */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-linear-to-r from-base-100 to-transparent md:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-linear-to-l from-base-100 to-transparent md:w-32" />

          {/* TRACK */}
          <div className="flex w-max logo-marquee-track">
            {repeatedLogos.map(({ id, name, Icon, color }, index) => (
              <div
                key={`${id}-${index}`}
                className="tooltip tooltip-top"
                data-tip={name}
              >
                <div className="mx-3 min-w-30">
                  <Icon
                    className="size-14 transition-transform duration-300 hover:scale-110"
                    style={{ color }}
                    aria-label={name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Clients;