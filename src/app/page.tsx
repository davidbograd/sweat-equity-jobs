"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CompaniesStats from "../components/CompaniesStats";
import CompaniesGrid from "../components/CompaniesGrid";
import StickyLocationNav from "../components/StickyLocationNav";
import FAQ from "../components/FAQ";
import CTAButton from "../components/CTAButton";
import LogoMarquee from "../components/LogoMarquee";
import {
  generateWebsiteSchema,
  generateItemListSchema,
} from "../lib/structuredData";
import { Company } from "../lib/types";
import { sortCompaniesByName } from "../lib/utils";
import companies from "../data/companies.json";

// Generate structured data for the front page
function generateStructuredData(companies: Company[]) {
  const websiteSchema = generateWebsiteSchema();
  const itemListSchema = generateItemListSchema(
    companies,
    "Australian Companies Offering Equity",
    "Complete list of Australian startups offering equity compensation"
  );

  return [websiteSchema, itemListSchema];
}

function calculateStats(companies: Company[]) {
  const allCities = new Set<string>();
  const allWorkTypes = new Set<string>();

  companies.forEach((company) => {
    // Add all locations for this company
    company.allLocations.forEach((location: string) => {
      if (location && location.trim()) {
        allCities.add(location);
      }
    });

    // Add all work types for this company
    company.allWorkTypes.forEach((workType: string) => {
      if (workType && workType.trim()) {
        allWorkTypes.add(workType);
      }
    });
  });

  return {
    citiesCount: allCities.size,
    workArrangementsCount: allWorkTypes.size,
  };
}

function HomeClient() {
  const [stickyHeaderState, setStickyHeaderState] = useState<
    "hidden" | "entering" | "visible" | "exiting"
  >("hidden");

  // Sort companies alphabetically
  const sortedCompanies = sortCompaniesByName(companies);

  const structuredData = generateStructuredData(sortedCompanies);
  const { citiesCount, workArrangementsCount } =
    calculateStats(sortedCompanies);

  useEffect(() => {
    const handleScroll = () => {
      const companiesSection = document.getElementById("companies");
      if (companiesSection) {
        const companiesSectionTop = companiesSection.offsetTop;
        const scrollPosition = window.scrollY + 300; // Increased offset for better UX

        if (scrollPosition >= companiesSectionTop) {
          // Should show header
          if (stickyHeaderState === "hidden") {
            setStickyHeaderState("entering");
            // After animation completes, set to visible
            setTimeout(() => setStickyHeaderState("visible"), 500);
          }
        } else {
          // Should hide header
          if (
            stickyHeaderState === "visible" ||
            stickyHeaderState === "entering"
          ) {
            setStickyHeaderState("exiting");
            // After animation completes, set to hidden
            setTimeout(() => setStickyHeaderState("hidden"), 300);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stickyHeaderState]);

  const shouldShowStickyHeader = stickyHeaderState !== "hidden";
  const isExiting = stickyHeaderState === "exiting";

  return (
    <>
      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen">
        {/* Sticky Navigation - with animations on homepage */}
        {shouldShowStickyHeader && (
          <StickyLocationNav shouldAnimate={true} isExiting={isExiting} />
        )}

        {/* Hero Section */}
        <div className="relative w-full pb-8">
          {/* Background gradients */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left gradient */}
            <div
              className="absolute bottom-0 left-0 w-full xl:w-1/2 h-full"
              style={{
                backgroundImage: "url(/images/gradient-left.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom",
                backgroundSize: "cover",
              }}
            />
            {/* Right gradient (flipped) - hidden until xl breakpoint */}
            <div
              className="absolute bottom-0 right-0 w-1/2 h-full hidden xl:block"
              style={{
                backgroundImage: "url(/images/gradient-left.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
                backgroundSize: "cover",
                transform: "scaleX(-1)",
              }}
            />
            {/* Linear gradient overlay */}
            <div
              className="absolute bottom-0 left-0 w-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, #F8F8F8 100%)",
                height: "128px",
              }}
            />
          </div>

          <main className="max-w-[1600px] mx-auto px-6 text-center relative z-10 pt-8">
            {/* Logo */}
            <div className="flex justify-center pb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="318"
                height="38"
                viewBox="0 0 318 38"
                fill="none"
                className="h-5 w-auto transition-all duration-300 ease-in-out"
              >
                <path
                  d="M307.99 16.814L312.816 18.866C315.818 20.12 317.376 22.172 317.376 24.794C317.376 28.252 314.602 30.608 310.574 30.608C308.75 30.608 306.432 30.038 305.102 29.316L305.14 29.772C305.178 30.228 304.836 30.608 304.38 30.608C304.076 30.608 303.772 30.38 303.696 30.076L301.34 23.35C301.226 22.97 301.454 22.552 301.872 22.476C302.176 22.438 302.442 22.59 302.594 22.856C304.532 26.58 307.534 29.126 310.65 29.126C312.968 29.126 314.146 27.872 314.146 26.2C314.146 24.794 313.31 23.616 311.106 22.628L306.052 20.386C302.974 19.056 301.682 17.08 301.682 14.8C301.682 11.456 304.38 9.252 308.066 9.252C310.688 9.252 312.36 10.126 313.728 10.924C313.728 10.886 313.614 10.468 313.538 10.126C313.424 9.67 313.766 9.252 314.222 9.252C314.526 9.252 314.792 9.48 314.906 9.784L316.882 15.712C316.996 16.016 316.844 16.32 316.578 16.434C316.312 16.586 315.97 16.434 315.78 16.168C313.994 13.052 310.84 10.696 308.066 10.696C305.824 10.696 304.836 11.95 304.836 13.546C304.836 14.876 305.634 15.788 307.99 16.814Z"
                  fill="black"
                />
                <path
                  d="M283.415 14.458V23.502C283.415 26.656 285.543 28.898 288.697 28.898C293.105 28.898 294.625 24.452 294.625 20.044C294.625 14.876 292.459 11.38 288.735 11.38C286.607 11.38 284.821 12.368 283.415 14.458ZM277.335 3.55199H276.651C276.157 3.55199 275.739 3.17199 275.739 2.67799C275.739 2.222 276.081 1.88 276.499 1.80399C277.905 1.57599 280.945 1.08199 282.617 0.777993C282.921 0.739994 283.187 0.815995 283.377 1.00599C283.605 1.19599 283.681 1.49999 283.643 1.80399C283.491 2.48799 283.415 3.66599 283.415 5.10999V11.874C285.011 10.202 287.101 9.28999 289.457 9.28999C294.853 9.28999 298.919 13.85 298.919 19.778C298.919 26.048 294.549 30.608 288.621 30.608C285.961 30.608 283.491 29.658 281.667 27.948C281.249 28.366 280.793 29.088 280.337 30.304C280.261 30.494 280.109 30.608 279.919 30.608H279.577C279.387 30.608 279.197 30.532 279.083 30.418C278.931 30.228 278.855 30 278.931 29.81C279.159 28.898 279.349 27.454 279.349 26.428V5.10999C279.349 4.23599 279.235 3.55199 277.335 3.55199Z"
                  fill="black"
                />
                <path
                  d="M265.611 28.936C269.525 28.936 271.691 25.478 271.691 19.968C271.691 15.56 270.285 11.038 265.611 11.038C260.975 11.038 259.531 15.408 259.531 19.968C259.531 25.516 261.659 28.936 265.611 28.936ZM265.611 9.29C271.501 9.29 275.947 13.888 275.947 19.968C275.947 26.048 271.501 30.646 265.611 30.646C259.683 30.646 255.237 26.048 255.237 19.968C255.237 13.888 259.683 9.29 265.611 9.29Z"
                  fill="black"
                />
                <path
                  d="M249.173 2.032C250.579 2.032 251.757 3.21 251.757 4.654C251.757 6.098 250.579 7.238 249.173 7.238C247.729 7.238 246.551 6.098 246.551 4.654C246.551 3.21 247.729 2.032 249.173 2.032ZM243.853 37.866C242.523 37.866 240.281 37.486 240.281 35.852C240.281 35.016 240.851 34.37 241.763 34.37C243.397 34.37 243.929 36.308 244.841 36.308C246.551 36.308 247.349 34.028 247.349 30.19V13.546C247.349 12.672 247.235 11.988 245.335 11.988H245.107C244.613 11.988 244.233 11.57 244.233 11.114C244.233 10.658 244.537 10.278 244.993 10.24C246.361 10.012 248.869 9.518 250.579 9.214C250.845 9.138 251.111 9.252 251.339 9.442C251.529 9.632 251.605 9.936 251.567 10.202C251.415 10.924 251.377 12.102 251.377 13.546L251.339 29.316C251.339 34.712 248.299 37.866 243.853 37.866Z"
                  fill="black"
                />
                <path
                  d="M228.981 10.012C229.513 10.012 231.109 9.936 232.325 9.936C232.743 9.936 233.085 10.316 233.085 10.734C233.085 11.152 232.781 11.532 232.363 11.57C230.919 11.684 230.159 12.178 229.361 13.926L221.875 30.456C219.405 36.004 216.935 37.904 213.173 37.904C210.665 37.904 209.905 36.878 209.905 36.004C209.905 35.206 210.399 34.598 211.273 34.598C212.983 34.598 213.515 36.042 214.807 36.042C216.555 36.042 218.189 34.104 219.975 30.494L220.203 29.962L213.477 13.356C212.983 12.254 212.527 11.798 210.665 11.608C210.209 11.532 209.905 11.152 209.905 10.734C209.943 10.278 210.323 9.89799 210.779 9.89799C212.185 9.936 214.617 10.012 215.225 10.012C215.947 10.012 218.151 9.936 219.557 9.89799C220.013 9.89799 220.355 10.278 220.355 10.734C220.355 11.152 220.051 11.456 219.633 11.532C217.581 11.76 217.619 12.9 217.885 13.584L222.483 25.174L227.119 14.572C227.613 13.508 227.765 11.912 225.409 11.57C224.991 11.494 224.687 11.152 224.687 10.734C224.687 10.316 224.991 9.936 225.447 9.936C226.701 9.936 228.373 10.012 228.981 10.012Z"
                  fill="black"
                />
                <path
                  d="M201.852 5.224C202.346 5.262 202.65 5.604 202.65 6.022V10.012H206.906C207.4 10.012 207.78 10.43 207.78 10.924C207.742 11.418 207.324 11.76 206.868 11.76H202.65V26.694C202.65 27.264 202.802 28.328 203.942 28.328C205.044 28.328 206.754 27.302 208.54 25.554C208.806 25.25 209.262 25.25 209.528 25.516C209.832 25.782 209.87 26.276 209.566 26.542C207.02 29.278 204.588 30.608 202.536 30.608C200.104 30.608 198.698 29.088 198.698 26.542V13.964C198.698 12.216 198.318 11.76 196.76 11.76C196.19 11.76 195.81 11.304 195.886 10.772C195.962 10.316 196.342 10.012 196.798 10.012H198.09C199.99 9.974 201.092 8.644 201.092 6.25V5.984C201.092 5.566 201.434 5.224 201.852 5.224Z"
                  fill="black"
                />
                <path
                  d="M191.462 5.03399C191.462 6.43999 190.322 7.57999 188.916 7.57999C187.548 7.57999 186.408 6.43999 186.408 5.03399C186.408 3.62799 187.548 2.48799 188.916 2.48799C190.322 2.48799 191.462 3.62799 191.462 5.03399ZM187.472 26.618V13.546C187.472 12.672 187.358 11.988 185.458 11.988H185.23C184.736 11.988 184.356 11.57 184.356 11.114C184.356 10.658 184.66 10.316 185.116 10.24C186.484 10.012 189.068 9.51799 190.74 9.21399C191.006 9.13799 191.31 9.25199 191.5 9.44199C191.728 9.63199 191.804 9.93599 191.766 10.24C191.614 10.924 191.538 12.102 191.538 13.546V26.618C191.538 27.758 192.108 28.252 194.312 28.404C194.73 28.442 195.072 28.784 195.072 29.24C195.072 29.772 194.616 30.076 194.236 30.076C192.678 30.076 190.93 30 189.524 30C188.08 30 186.332 30.076 184.812 30.076C184.394 30.076 183.938 29.772 183.938 29.24C183.938 28.784 184.28 28.442 184.698 28.404C186.902 28.252 187.472 27.758 187.472 26.618Z"
                  fill="black"
                />
                <path
                  d="M183.232 28.822C183.232 29.24 182.928 29.62 182.472 29.696C181.104 29.886 178.064 30.38 176.354 30.722C176.088 30.76 175.784 30.684 175.594 30.456C175.404 30.266 175.29 29.962 175.366 29.696C175.48 29.164 175.518 28.252 175.556 27.15C173.01 29.506 170.654 30.608 168.108 30.608C164.384 30.608 162.294 28.214 162.294 23.958V13.622C162.294 12.748 162.18 12.026 160.28 12.026H159.862C159.368 12.026 158.988 11.646 158.988 11.152C158.988 10.734 159.292 10.354 159.748 10.278C161.154 10.088 163.852 9.594 165.524 9.252C165.828 9.214 166.094 9.29 166.322 9.518C166.512 9.708 166.588 10.012 166.55 10.278C166.398 11 166.322 12.178 166.322 13.584V24.3C166.322 27.112 167.348 28.404 169.286 28.404C171.224 28.404 173.39 27.15 175.556 24.794V13.622C175.556 12.748 175.442 12.026 173.542 12.026H173.124C172.668 12.026 172.25 11.646 172.25 11.152C172.25 10.734 172.592 10.354 173.01 10.278C174.416 10.088 177.114 9.594 178.824 9.252C179.09 9.214 179.356 9.29 179.584 9.518C179.774 9.708 179.888 10.012 179.812 10.278C179.698 11 179.622 12.178 179.622 13.584V26.352C179.622 27.226 179.736 27.948 181.674 27.948H182.358C182.852 27.948 183.232 28.328 183.232 28.822Z"
                  fill="black"
                />
                <path
                  d="M146.623 28.556C148.789 28.556 150.613 27.492 151.981 25.402V16.282C151.981 13.128 149.815 11 146.699 11C142.975 11 140.733 14.306 140.733 19.816C140.733 25.516 143.089 28.556 146.623 28.556ZM158.099 35.168H158.783C159.277 35.168 159.695 35.586 159.657 36.118C159.619 36.536 159.277 36.84 158.897 36.916C157.453 37.144 154.451 37.6 152.779 37.942C152.133 38.056 151.677 37.524 151.791 36.916C151.905 36.194 151.981 32.85 151.981 31.406V28.024C150.385 29.696 148.295 30.608 145.901 30.608C140.543 30.608 136.477 26.086 136.477 20.12C136.477 13.888 140.809 9.29 146.737 9.29C149.359 9.29 151.867 10.24 153.691 11.95C154.185 11.418 154.641 10.62 155.021 9.746C155.097 9.442 155.401 9.29 155.667 9.29C156.161 9.29 156.541 9.708 156.427 10.202C156.237 11.228 156.047 12.634 156.047 13.394V33.572C156.047 34.446 156.161 35.168 158.099 35.168Z"
                  fill="black"
                />
                <path
                  d="M125.656 10.772C122.578 10.772 120.754 13.052 120.032 16.358H129.95C130.33 16.358 130.482 16.358 130.482 15.446C130.482 12.9 128.506 10.772 125.656 10.772ZM125.922 30.608C119.804 30.608 115.472 25.82 115.472 19.816C115.472 13.736 119.766 9.328 125.694 9.29C130.368 9.29 134.776 12.33 134.738 17.346C134.738 17.764 134.396 18.106 133.978 18.106H119.804C119.766 18.448 119.728 18.828 119.728 19.246C119.728 24.262 122.35 27.796 126.986 27.796C129.76 27.796 132.192 26.2 133.522 23.844C133.674 23.616 133.902 23.464 134.168 23.464C134.282 23.464 134.396 23.502 134.51 23.54C134.852 23.73 135.004 24.11 134.852 24.49C133.408 28.214 130.026 30.608 125.922 30.608Z"
                  fill="black"
                />
                <path
                  d="M98.0479 5.224C98.5419 5.262 98.8459 5.604 98.8459 6.022V10.012H103.102C103.596 10.012 103.976 10.43 103.976 10.924C103.938 11.418 103.52 11.76 103.064 11.76H98.8459V26.694C98.8459 27.264 98.9979 28.328 100.138 28.328C101.24 28.328 102.95 27.302 104.736 25.554C105.002 25.25 105.458 25.25 105.724 25.516C106.028 25.782 106.066 26.276 105.762 26.542C103.216 29.278 100.784 30.608 98.7319 30.608C96.2999 30.608 94.8939 29.088 94.8939 26.542V13.964C94.8939 12.216 94.5139 11.76 92.9559 11.76C92.3859 11.76 92.0059 11.304 92.0819 10.772C92.1579 10.316 92.5379 10.012 92.9939 10.012H94.2859C96.1859 9.974 97.2879 8.644 97.2879 6.25V5.984C97.2879 5.566 97.6299 5.224 98.0479 5.224Z"
                  fill="black"
                />
                <path
                  d="M84.7238 24.3V17.004L79.8218 18.904C76.8198 20.044 75.3758 21.792 75.3758 24.338C75.3758 26.618 76.5918 28.1 78.5298 28.1C80.3538 28.1 82.6338 26.77 84.7238 24.3ZM87.7258 30.608C85.7878 30.608 84.7998 29.392 84.7998 27.758L84.8378 26.504C82.2538 29.43 79.6318 30.608 76.9718 30.608C73.5138 30.608 71.1958 28.366 71.1958 25.06C71.1958 21.602 73.8938 19.208 78.5678 17.46L84.7238 15.218V14.648C84.7238 11.646 82.6718 10.772 80.9238 10.772C78.6438 10.772 77.4278 12.102 76.4018 13.052C75.6418 13.774 74.7298 14.344 73.7418 14.344C72.9058 14.344 72.2598 13.698 72.2598 12.824C72.2598 10.62 77.1618 9.29 80.6578 9.29C85.9778 9.29 88.7898 11.912 88.7898 16.814V26.884C88.7898 27.53 88.7138 28.594 89.3978 28.594C89.8158 28.594 90.1958 28.366 90.5378 28.024C90.7278 27.796 91.0698 27.758 91.3358 27.948C91.6018 28.138 91.6398 28.556 91.4118 28.822C90.6138 29.81 89.4738 30.608 87.7258 30.608Z"
                  fill="black"
                />
                <path
                  d="M59.6693 10.772C56.5913 10.772 54.7673 13.052 54.0453 16.358H63.9633C64.3433 16.358 64.4954 16.358 64.4954 15.446C64.4954 12.9 62.5194 10.772 59.6693 10.772ZM59.9354 30.608C53.8174 30.608 49.4854 25.82 49.4854 19.816C49.4854 13.736 53.7794 9.328 59.7074 9.29C64.3814 9.29 68.7893 12.33 68.7514 17.346C68.7514 17.764 68.4094 18.106 67.9914 18.106H53.8174C53.7794 18.448 53.7414 18.828 53.7414 19.246C53.7414 24.262 56.3634 27.796 60.9994 27.796C63.7734 27.796 66.2054 26.2 67.5354 23.844C67.6874 23.616 67.9153 23.464 68.1814 23.464C68.2953 23.464 68.4094 23.502 68.5234 23.54C68.8654 23.73 69.0173 24.11 68.8653 24.49C67.4213 28.214 64.0394 30.608 59.9354 30.608Z"
                  fill="black"
                />
                <path
                  d="M49.6061 9.936C49.9481 9.936 50.2901 10.164 50.4041 10.544C50.5941 11 50.2521 11.494 49.7961 11.57C48.6561 11.76 48.0101 12.444 46.7941 15.522L41.3221 30.152C41.2081 30.418 40.9421 30.608 40.6381 30.608H40.0301C39.7261 30.608 39.4601 30.418 39.3461 30.152L34.0641 15.712L28.5921 30.152C28.5161 30.418 28.2121 30.608 27.9461 30.608H27.3001C26.9961 30.608 26.7301 30.418 26.6161 30.114L20.5361 13.28C20.1181 12.064 19.6621 11.684 18.4841 11.532C18.0661 11.494 17.7621 11.076 17.8001 10.62C17.8761 10.24 18.2561 9.936 18.6741 9.936C19.9281 9.974 21.8661 10.012 22.5121 10.012C23.1961 10.012 25.2101 9.974 26.5781 9.936C27.0341 9.936 27.3761 10.316 27.3761 10.772C27.3381 11.19 26.9961 11.494 26.6161 11.532C24.8301 11.608 24.4121 12.026 25.0581 13.85L28.8961 24.756L33.1141 13.242C32.7341 12.14 32.2401 11.722 31.0621 11.532C30.6441 11.456 30.3401 11.038 30.4161 10.582C30.4921 10.202 30.8721 9.936 31.2521 9.936C32.6201 9.974 34.5961 10.012 35.1281 10.012C35.6221 10.012 37.7121 9.974 39.1181 9.936C39.6121 9.936 40.0301 10.43 39.8781 10.962C39.8021 11.266 39.4981 11.494 39.1941 11.532C37.4081 11.608 37.0281 12.064 37.6741 13.85L41.5881 24.718C42.7281 21.374 44.1341 17.498 44.9701 13.698C45.1601 12.71 45.0081 11.722 43.4501 11.57C43.0321 11.494 42.6901 11.152 42.7281 10.734C42.7281 10.278 43.1081 9.936 43.5641 9.936C44.7041 9.974 46.3381 10.012 46.8321 10.012C47.3641 10.012 48.5421 9.974 49.6061 9.936Z"
                  fill="black"
                />
                <path
                  d="M7.3062 16.814L12.1322 18.866C15.1342 20.12 16.6922 22.172 16.6922 24.794C16.6922 28.252 13.9182 30.608 9.8902 30.608C8.0662 30.608 5.7482 30.038 4.4182 29.316L4.4562 29.772C4.4942 30.228 4.1522 30.608 3.6962 30.608C3.3922 30.608 3.0882 30.38 3.0122 30.076L0.656199 23.35C0.542199 22.97 0.770199 22.552 1.1882 22.476C1.4922 22.438 1.7582 22.59 1.9102 22.856C3.8482 26.58 6.8502 29.126 9.9662 29.126C12.2842 29.126 13.4622 27.872 13.4622 26.2C13.4622 24.794 12.6262 23.616 10.4222 22.628L5.3682 20.386C2.2902 19.056 0.998199 17.08 0.998199 14.8C0.998199 11.456 3.6962 9.252 7.3822 9.252C10.0042 9.252 11.6762 10.126 13.0442 10.924C13.0442 10.886 12.9302 10.468 12.8542 10.126C12.7402 9.67 13.0822 9.252 13.5382 9.252C13.8422 9.252 14.1082 9.48 14.2222 9.784L16.1982 15.712C16.3122 16.016 16.1602 16.32 15.8942 16.434C15.6282 16.586 15.2862 16.434 15.0962 16.168C13.3102 13.052 10.1562 10.696 7.3822 10.696C5.1402 10.696 4.1522 11.95 4.1522 13.546C4.1522 14.876 4.9502 15.788 7.3062 16.814Z"
                  fill="black"
                />
              </svg>
            </div>

            <h1 className="text-3xl md:text-7xl mb-4 leading-tight">
              Find Australian startups offering equity
            </h1>

            <p className="text-xl text-black mb-8 mx-auto opacity-65">
              A curated list of Aussie companies where equity is part of your
              compensation.
            </p>

            {/* CTA Button */}
            <div className="mb-8">
              <CTAButton className="hover:underline hover:underline-offset-8 inline-block text-xl bg-transparent border-none cursor-pointer text-black">
                See the full list →
              </CTAButton>
            </div>

            {/* Location Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mb-8 md:mb-16 justify-center justify-items-start mx-auto w-fit">
              <Link
                href="/sydney"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Sydney →
              </Link>
              <Link
                href="/melbourne"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Melbourne →
              </Link>
              <Link
                href="/brisbane"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Brisbane →
              </Link>
              <Link
                href="/perth"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Perth →
              </Link>
              <Link
                href="/adelaide"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Adelaide →
              </Link>
              <Link
                href="/canberra"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Canberra →
              </Link>
              <Link
                href="/other"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Other cities →
              </Link>
              <Link
                href="/remote"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Remote →
              </Link>
            </div>

            {/* Video Section */}
            <div className="flex justify-center mb-6 md:mb-12">
              <a
                href="https://www.youtube.com/watch?v=JirNXu48Xf0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-black bg-white rounded-2xl transition-colors"
              >
                <div className="p-2">
                  <Image
                    src="/images/video-thumbnail@2x.png"
                    alt="Video thumbnail showing why you should get a job with equity"
                    width={64}
                    height={40}
                    className="w-16 h-10 rounded-lg"
                    priority={false}
                  />
                </div>
                <span className="pr-6">
                  <span className="md:hidden">Why get a job with equity</span>
                  <span className="hidden md:inline">
                    Why you should get a job with equity
                  </span>
                </span>
              </a>
            </div>
          </main>
        </div>

        {/* Logo Marquee - Full Width */}
        <div className="w-full mb-12 md:mb-20">
          <LogoMarquee companies={sortedCompanies} />
        </div>
        {/* Companies Section */}
        <section
          id="companies"
          className="text-left max-w-[1600px] mx-auto mt-12 lg:mt-20 px-5"
        >
          <div className="pl-4 md:pl-6">
            <h2 className="text-4xl md:text-5xl text-black mb-4 md:mb-6">
              All companies offering equity
            </h2>

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between md:gap-4 mb-6">
              <CompaniesStats
                companiesCount={sortedCompanies.length}
                citiesCount={citiesCount}
                workArrangementsCount={workArrangementsCount}
              />

              <Link
                href="https://tally.so/r/wzBdPa"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center text-lg text-black opacity-65 hover:opacity-100 hover:underline hover:underline-offset-4 transition-opacity whitespace-nowrap"
              >
                Submit another company
              </Link>
            </div>

            {/* Mobile link - shows below CompaniesStats */}
            <Link
              href="https://tally.so/r/wzBdPa"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden inline-flex items-center text-lg text-black opacity-65 hover:opacity-100 hover:underline hover:underline-offset-4 transition-opacity mb-6"
            >
              Submit another company
            </Link>
          </div>

          <CompaniesGrid companies={sortedCompanies} />
        </section>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </>
  );
}

// Default export as server component
export default function Home() {
  return <HomeClient />;
}
