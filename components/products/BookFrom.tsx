import React, { useState } from "react";
import { Input } from "../ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Building, Calendar1, Mail, Phone, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { Toast } from "radix-ui";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { PreviousMonthButton } from "react-day-picker";

export default function BookFrom({
  price,
  title,
}: {
  price: number;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [count,setCount] = useState(1)

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    city: "",
    people: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    setInfo({...info,people:count.toLocaleString()})
    console.log(info)
    e.preventDefault();
    setLoading(true);
    if (!info.name || !info.email || !info.phone || !info.city || !info.date || !info.people) {
      toast.error("Please fill in all the required feilds");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/booking", {
      method: "POST",
      cache: "no-store",

      body: JSON.stringify({
        booking: {
        email: info.email,
          name: info.name,
          phone: info.phone,
          city: info.city,
          date: info.date,
          people: info.people,
        },
      }),
    });

    if (res.ok) {
      toast.success("Succesfully booked!");
      setLoading(false);
      return;
    }else {
      toast.error("Failed to book.Please try again later");
      setLoading(false);
      return
      
    }


  };
  let qty = 0;

  return (
    <div className="h-full flex-col w-full lg:p-5 lg:rounded-xl flex  justify-center  shadow-md">
      <h1 className="text-2xl font-semibold max-w-sm">Book Now</h1>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex-col flex gap-6 mt-8">
          <div className="flex gap-2 flex-col">
            <label
              htmlFor="name"
              className="text-sm mx-2 font-semibold flex items-center gap-1"
            >
              <User size={13} />
              Name
            </label>
            <Input
              id="name"
              type="name"
              placeholder="Enter your name"
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <label
              htmlFor="email"
              className="text-sm mx-2 font-semibold flex items-center gap-1"
            >
              <Mail size={13} />
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </div>
          <div className="flex-1  flex flex-col gap-2">
            <label
              htmlFor="number"
              className="text-sm mx-2 font-semibold flex items-center gap-2"
            >
              <Phone size={15} />
              Phone
            </label>

            <PhoneInput
              defaultCountry="PK"
              
              className="w-full h-[2.5rem] border border-gray-300 rounded-md px-3 py-2 outline-0 placeholder:text-xs "
              placeholder="3123123123"
              id="number"
              required
              onChange={(value) => setInfo({ ...info, phone: value ?? "" })}
            />

            <label
              htmlFor="date"
              onClick={() => setOpen(true)}
              className="text-sm mx-2 font-semibold flex items-center gap-2"
            >
              <Calendar1 size={15} /> Date
            </label>
            <div
              onClick={() => setOpen(true)}
              className=" cursor-pointer w-full h-[2.5rem] border border-gray-300 rounded-md px-3 py-2 outline-0 placeholder:text-xs "
            >
              {info.date ? ` ${info.date}` : "Select Date"}
            </div>
            {open && (
              <Calendar
                id="date"
                required
                mode="single"
                selected={date}
                onSelect={(e) => {
                  setInfo({ ...info, date: e.toLocaleDateString() });
                  setDate(e);
                  setOpen(false);
                }}
                className="rounded-lg border absolute bottom-0"
                disabled={{ from: new Date(2000, 2, 1), to: new Date() }}
              />
            )}

            <label
              htmlFor="city"
              className="text-sm mx-2 font-semibold flex items-center gap-2"
            >
              <Building size={15} />
              Departure City
            </label>
            <Input
              id="city"
              type="text"
              placeholder="Enter city"
              onChange={(e) => setInfo({ ...info, city: e.target.value })}
            />
<>
              <p
                            className="text-sm mx-2 font-semibold flex items-center gap-2"
              >Number of person</p>
            <div className="flex  items-center justify-between h-[2rem] w-full border border-gray-200 overflow-hidden">
              <Button
              type="button"
              
              variant="ghost"
              size="sm"
              className="rounded-none border-gray-100 text-xl disabled:opacity-50 "
              onClick={() => { setCount(count-1); setInfo({...info,people:count.toLocaleString()})}}
              disabled={count < 2}
              >
                -
              </Button>

              <span className=" w-[1.5rem] text-center text-sm">
              {count}
              </span>

              <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="rounded-none border-gray-100 text-xl"
             onClick={() => { setCount(count+1); setInfo({...info,people:count.toLocaleString()})}}
                   disabled={count > 99 }
                  >
                +
              </Button>
            </div>
            </>

            <Button
            type="submit"
            className="bg-yellow-400 p-3 mt-3 flex items-center gap-2"
            disabled={loading}
            >
              {loading && <Spinner />}
              Book
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
