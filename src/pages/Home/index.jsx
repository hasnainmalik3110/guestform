import { useState } from "react";
import bg from "../../assets/bg.jpeg";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useFirebase } from "../../context/firebase";


export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { firestore } = useFirebase();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(firestore, "guests"), {
      name: form.name,
      email: form.email,
      phone: form.phone,
      createdAt: Timestamp.now(),
    });

    alert(`Thanks, ${form.name || "guest"}! Your check in data is saved.`);
    setForm({ name: "", email: "", phone: "" });
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
<div
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url(${bg})` }}
>

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <section className="relative z-10 w-full max-w-lg bg-linear-to-b from-[#ECAF83] via-[#FBDBBB] to-[#F7A35A] border-2 border-[#bb4600] rounded-3xl shadow-[0_30px_60px_rgba(20,10,10,0.45)] p-8 md:p-10">
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-2xl font-semibold text-[#2b2b2b]">Guest Check in</h1>
          <p className="text-sm text-[#5a4b3a]">Welcome, please fill your details</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="text-sm text-[#4b3f36] block mb-1">Guest name</label>
            <input
              type="text"
              className="w-full rounded-full border border-[#D08C60] bg-transparent px-4 py-2 text-sm focus:ring-2 focus:ring-[#B95A21] outline-none"
              placeholder="e.g. Sarah Connor"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-[#4b3f36] block mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-full border border-[#D08C60] bg-transparent px-4 py-2 text-sm focus:ring-2 focus:ring-[#B95A21] outline-none"
              placeholder="Enter Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-[#4b3f36] block mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full rounded-full border border-[#D08C60] bg-transparent px-4 py-2 text-sm focus:ring-2 focus:ring-[#B95A21] outline-none"
              placeholder="+92 333 555 5555"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <p className="text-center text-xs text-gray-600 mt-1">
            By submitting you agree to standard policies.
          </p>

          <div className="flex justify-center">
            <button
              type="submit"
              className="min-w-[140px] rounded-full bg-linear-to-b from-[#B95A21] to-[#ac4c12] text-[#FBDBBB] py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
