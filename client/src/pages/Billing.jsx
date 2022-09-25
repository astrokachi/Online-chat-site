import React from 'react';
import { Footer } from '../component/Footer';
import { Nav } from '../component/Nav';

const Billing = () => {
  return (
    <div className="transition-all ease-in duration-200">
      <Nav />
      <div className="md:pt-24 pt-44 p-4 text-white">Billing support</div>
      <section className="container pt-2  text-white mx-auto mb-12">
        <div className="md:mt-7 mt-12 p-4 bg-opacity-50 rounded-md  bg-[#222222] text-sm">
          <p>
            Out of policies and operational managerial process of RSSangels, Do know that RSSangels offers a 100%
            refundable policy for payments made to us on the site only if there is a breach in agreement between the
            models and potential clients.
            <br />
            <br />
            If any model on RSSangels takes payment without fulfilling the other end of the deal, rest assured that
            RSSangels with take full responsibility and legal actions would be taken and our client are assured to get a
            full refund. Payment refund takes effect after 48 hours a complaint is made.
            <br />
            <br />
            For more information email us on Incorporateteam@outlook.com.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Billing;
