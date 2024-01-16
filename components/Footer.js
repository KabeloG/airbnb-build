import React from "react";

function Footer() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 px-20 py-14 bg-gray-100 text-gray-600">
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">ABOUT</h5>
        <p>How Airbnb works</p>
        <p>Homes</p>
        <p>Airbnb Founders</p>
        <p>Airbnb Plus</p>
        <p>Airbnb Luxe</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">COMMUNITY</h5>
        <p>US Homes</p>
        <p>LATAM Airbnb</p>
        <p>Around the world</p>
        <p>API</p>
        <p>Developers</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">HOST</h5>
        <p>How Airbnb works</p>
        <p>Cities</p>
        <p>Towns</p>
        <p>Countries</p>
        <p>Join Now</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">SUPPORT</h5>
        <p>Help Centre</p>
        <p>Trust & Safety</p>
        <p>Become a Host</p>
        <p>Queries</p>
        <p>Referrals</p>
      </div>
    </div>
  );
}

export default Footer;
