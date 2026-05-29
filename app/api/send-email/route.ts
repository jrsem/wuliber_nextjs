import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from "@/app/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const { 
    email,
    fullName,
    pickupLocation,
    date,
    time,
    details,
    } = body;

    
    if (!email || !fullName || !pickupLocation || !date || !time || !details) {
      return NextResponse.json(
        { message: "One or more required fields are missing" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Wuliber <contact@wuliber.com>",
      to: [email],
      subject: `hello ${fullName} - Your pickup request has been received!`,
      react: EmailTemplate({ email, fullName, pickupLocation, date, time, details }),
    });

    return NextResponse.json({
      message: "Email sent successfully",
      id: data.data?.id,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Email not sent", error: err },
      { status: 500 }
    );
  }
}