import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useFirebase } from "../../context/firebase";

export default function Admin() {
  const { firestore } = useFirebase();
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGuests = async () => {
    try {
      const q = query(collection(firestore, "guests"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGuests(list);
    } catch (error) {
      console.error("Error fetching guests:", error);
      alert("Failed to load guest list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f3] flex flex-col items-center px-4 py-10">
      <h1 className="text-2xl font-bold text-[#2b2b2b] mb-6">Guest List (Admin)</h1>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl border border-[#e3c4a8] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#ECAF83] text-[#2b2b2b]">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Check in Time</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-600">
                  Loading guests...
                </td>
              </tr>
            )}

            {!loading && guests.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-600">
                  No guests found yet.
                </td>
              </tr>
            )}

            {!loading &&
              guests.map((guest) => (
                <tr key={guest.id} className="border-b border-gray-200 hover:bg-[#fff6ed]">
                  <td className="p-3">{guest.name}</td>
                  <td className="p-3">{guest.email}</td>
                  <td className="p-3">{guest.phone}</td>
                  <td className="p-3">
                    {guest.createdAt?.toDate
                      ? guest.createdAt.toDate().toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
