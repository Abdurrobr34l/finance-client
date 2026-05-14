import React from 'react';
import { Link } from "react-router";
import Container from "../shared/Container";
import { FaGlobeAmericas, FaRegEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiOutlineShieldCheck } from "react-icons/hi2";

export default function Footer() {
  const socialLinks = [
    { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
    { href: "https://facebook.com", icon: FaFacebookF, label: "Facebook" },
    { href: "https://linkedin.com", icon: FaLinkedinIn, label: "LinkedIn" },
  ];
  const productLinks = [
    { label: "About Us", path: "/about-us" },
    { label: "Pricing", path: "/pricing" },
    { label: "Transaction", path: "/transactions" },
    { label: "Dashboard", path: "/dashboard" }
  ];

  const companyLinks = [
    { label: "About Us", path: "/about-us" },
    { label: "Careers", path: "/careers" },
    { label: "Security", path: "/security" },
    { label: "Contact", path: "/contact" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Accessibility", path: "/accessibility" }
  ];

  const joinedUsersImages = [
    "https://i.ibb.co.com/MJ2MNQk/mine-1.png",
    "https://i.ibb.co.com/LDZkCZbQ/doc-he-2.jpg",
    "https://i.ibb.co.com/0jtrFGzN/doc-she.jpg"
  ];

  return (
    <footer className="py-8 md:pt-12 md:pb-8 bg-base-100 border-t border-primary/10">
      <Container>
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">

          {/* BRAND */}
          <div className='text-center md:text-start'>
            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-5"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-accent/20 bg-base-200">
                <span className="text-accent font-bold text-lg">◫</span>
              </div>

              <h2 className="text-[28px] leading-none font-bold text-primary">
                WealthWise
              </h2>
            </Link>

            {/* Description */}
            <p className="md:max-w-72.5 text-sm leading-5 text-secondary">
              Secure stewardship for your future. We provide the
              tools you need to manage complex finances with
              absolute confidence.
            </p>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-5 mt-7 md:justify-start">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    target='_blank'
                    aria-label={item.label}
                    className="p-1.5 text-secondary rounded-full hover:text-accent hover:bg-base-300 hover:font-bold transition-colors duration-300 ease-linear"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* PRODUCT & COMPANY */}
          <div className='flex justify-evenly md:justify-between lg:justify-evenly lg:gap-10 xl:-ml-14 2xl:gap-20 2xl:-ml-20'>
            {/* PRODUCT */}
            <div>
              <h3 className="text-primary font-bold text-lg mb-3">
                Product
              </h3>

              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="nav-link pb-1! p-0! text-sm text-secondary hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-primary font-bold text-lg mb-3">
                Company
              </h3>

              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="nav-link pb-1! p-0! text-sm text-secondary hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div className='hidden xl:block'>
              <h3 className="text-primary font-bold text-lg mb-3">
                Legal
              </h3>

              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="nav-link pb-1! p-0! text-sm text-secondary hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECURITY CARD */}
          <div className="flex flex-col items-start md:hidden lg:block lg:items-end">
            <div className="w-full rounded-2xl border border-primary/10 bg-base-200 p-5 shadow-sm lg:px-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-accent">
                  <HiOutlineShieldCheck size={22} />
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-[0.18em] text-primary uppercase">
                    Security
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-secondary">
                    Your personal finances, protected with bank-grade security and
                    <span className="number-font!"> 256</span>-bit AES encryption.
                  </p>
                </div>
              </div>
            </div>

            {/* USERS */}
            <div className="mt-6 flex items-center justify-center w-full gap-3 lg:justify-start">
              <div className="flex -space-x-3">
                {joinedUsersImages.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full border-2 border-base-100 object-cover"
                  />
                ))}

                <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-base-100 bg-accent text-white text-[11px] font-bold number-font">
                  +50k
                </div>
              </div>

              <p className="text-sm text-secondary">
                Join <span className='number-font'>50,000+</span> users
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-primary/10 pt-6">
          <div className="flex flex-col gap-5 md:items-center md:justify-between md:gap-3 lg:flex-row xl:justify-center">

            {/* COPYRIGHT */}
            <p className="text-sm text-secondary text-center md:text-left">
              © 2024 WealthWise Financial. Secure stewardship
              for your future.
            </p>

            {/* BOTTOM LINKS */}
            <div className="flex flex-wrap items-center justify-center gap-6 xl:hidden">
              {legalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link pb-1! p-0! text-sm text-secondary hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}