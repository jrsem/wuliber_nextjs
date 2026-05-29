type Params = {
    email: string;
    fullName: string;
    pickupLocation: string;
    date: string;
    time: string;
    details: string;
};
function EmailTemplate({ fullName, pickupLocation, date, time, details }: Params) {
  return (
    <div>
      <h1>Hi, {fullName} 👋🏻</h1>

      <pre className="text-md font-semibold">
        Welcome to Wuliber Transportation Service. 
      </pre>
      <p>We are delighted to have you on board and look forward to providing you with exceptional transportation services.</p>
      <h2 className="text-sm font-bold">Your Pickup Details:</h2>
      <p>
        you have a booking for pickup at {pickupLocation} on {" "}
        {date} at {time}
      </p>
      <pre>{details}</pre>
    </div>
  );
}

export default EmailTemplate;