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
            Paymentico members:
            <br />
            Billing support: https://help.paymentico.com/
            <br />
            <br />
            Email: help@paymentico.com
            <br />
            <br />
            Epoch members:
            <br />
            Billing support: https://www.epoch.com/billing_support/find_purchase
            <br />
            <br />
            Email: billing@epoch.com
            <br />
            <br />
            SegPay members:
            <br />
            Billing support: http://cs.segpay.com/
            <br />
            <br />
            Email: help@segpay.com
            <br />
            <br />
            CentroBill members:
            <br />
            Customer self service: https://centrohelp.com/
            <br />
            <br />
            Email: support@centrobill.com
            <br />
            <br />
            Webbiling members:
            <br />
            Contact email: usersupport@webbilling.com
            <br />
            <br />
            WTS members: Customer Support website: https://www.wtseticket.com/
            <br />
            <br />
            Email: customerservice@wtseticket.com
            <br />
            <br />
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Billing;
