import React from 'react';
import { Footer } from '../component/Footer';
import { Nav } from '../component/Nav';

const Policy = () => {
  return (
    <div className="transition-all ease-in duration-200">
      <Nav />
      <section className="container pt-2  text-white mx-auto mb-12">
        <div className="md:mt-24 mt-44 p-4 bg-opacity-50 rounded-md  bg-[#222222] text-sm">
          <header className="text-3xl font-bold ">
            18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
          </header>
          <br />
          <p>
            Although we are not subject to United States law, we voluntarily comply with the provisions of 18 U.S.C. §
            2257 and its regulations.
          </p>
          <br />
          <p>
            All models, actors, actresses and other persons that appear in any visual portrayal of actual or simulated
            sexually explicit conduct appearing on, or otherwise contained in, this Website were required to be over the
            age of eighteen (18) years at the time the visual image was produced. Records required for all depictions of
            actual sexually explicit conduct by Title 18 U.S.C. 2257 and its related regulations are on file with the
            custodian of records set forth below and will be made available to authorized inspectors.
          </p>
          <br />
          <p>
            All other visual depictions displayed on this Website are exempt from the provision of 18 U.S.C. §§ 2257,
            2257A and/or 28 C.F.R. § 75, because 1) they do not portray conduct as specifically listed in 18 U.S.C §
            2256 (2)(A) (i) through (iv), 2) they do not portray conduct as specifically listed in 18 U.S.C. § 2257A, 3)
            they do not portray conduct listed in 18 U.S.C. § 2256(2)(A)(v) produced after July 27, 2006, or 4) are
            otherwise exempt because the visual depictions were created prior to July 3, 1995.
          </p>
          <br />
          <p>
            The records required to be kept pursuant to the above referenced laws are kept by the following custodian of
            records:
          </p>
          <br />
          <p>Database Administrator - Incorporateteam@outlook.com</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Policy;


