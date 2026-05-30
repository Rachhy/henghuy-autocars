import { useEffect, useState } from "react";
import { api } from "./config/api";
import { INITIAL_CARS } from "./data/cars";
import { G, injectStyles } from "./styles/theme";
import Nav from "./components/Nav";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import DetailPage from "./pages/DetailPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  useEffect(() => {
    injectStyles();
  }, []);

  const [page, setPage_] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [cars, setCars] = useState(INITIAL_CARS);
  const [toast, setToast] = useState(null);
  const [apiOnline, setApiOnline] = useState(false);

  const fetchCars = async () => {
    try {
      const res = await fetch(api("/api/cars"));
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      setCars(data);
      setApiOnline(true);
    } catch (err) {
      console.warn("Cars API unavailable, using local fallback:", err.message);
      setApiOnline(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const apiSaveCar = async (car, id) => {
    const method = id ? "PUT" : "POST";
    const url = id ? api(`/api/cars/${id}`) : api("/api/cars");
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    if (!res.ok) throw new Error(`Save failed (${res.status})`);
    await fetchCars();
  };

  const apiDeleteCar = async (id) => {
    const res = await fetch(api(`/api/cars/${id}`), { method: "DELETE" });
    if (!res.ok) throw new Error(`Delete failed (${res.status})`);
    await fetchCars();
  };

  const fetchBookings = async (currentUser) => {
    if (!currentUser) {
      setBookings([]);
      return;
    }

    try {
      const url = currentUser.isAdmin ? "/api/bookings" : `/api/bookings?userId=${currentUser.id}`;
      const res = await fetch(api(url));
      if (!res.ok) throw new Error(`API ${res.status}`);
      setBookings(await res.json());
    } catch (err) {
      console.warn("Bookings fetch failed:", err.message);
    }
  };

  useEffect(() => {
    fetchBookings(user);
  }, [user]);

  const fetchEnquiries = async (currentUser) => {
    if (!currentUser?.isAdmin) {
      setEnquiries([]);
      return;
    }

    try {
      const res = await fetch(api("/api/enquiries"));
      if (!res.ok) throw new Error(`API ${res.status}`);
      setEnquiries(await res.json());
    } catch (err) {
      console.warn("Enquiries fetch failed:", err.message);
    }
  };

  useEffect(() => {
    fetchEnquiries(user);
  }, [user]);

  const setPage = (nextPage, id) => {
    setPage_(nextPage);
    if (nextPage === "detail" && id) setDetailId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToast = (title, msg) => {
    setToast({ title, msg });
    setTimeout(() => setToast(null), 3200);
  };

  const toggleFav = (id) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      showToast(
        next.includes(id) ? "Saved" : "Removed",
        next.includes(id) ? "Added to your favourites." : "Removed from favourites."
      );
      return next;
    });
  };

  const addBooking = async (booking) => {
    const res = await fetch(api("/api/bookings"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Booking failed (${res.status})`);
    }
    await fetchBookings(user);
  };

  const apiUpdateBookingStatus = async (id, status) => {
    const res = await fetch(api(`/api/bookings/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error(`Status update failed (${res.status})`);
    await fetchBookings(user);
  };

  const apiDeleteBooking = async (id) => {
    const res = await fetch(api(`/api/bookings/${id}`), { method: "DELETE" });
    if (!res.ok) throw new Error(`Delete failed (${res.status})`);
    await fetchBookings(user);
  };

  const apiUpdateEnquiryStatus = async (id, status) => {
    const res = await fetch(api(`/api/enquiries/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error(`Status update failed (${res.status})`);
    await fetchEnquiries(user);
  };

  const apiDeleteEnquiry = async (id) => {
    const res = await fetch(api(`/api/enquiries/${id}`), { method: "DELETE" });
    if (!res.ok) throw new Error(`Delete failed (${res.status})`);
    await fetchEnquiries(user);
  };

  const commonProps = { setPage, user, favorites, toggleFav, showToast, cars };

  return (
    <div style={{ fontFamily: G.sans, background: G.bg, minHeight: "100vh" }}>
      <Nav page={page} setPage={setPage} user={user} favorites={favorites} />
      <div style={{ paddingTop: 64 }}>
        {page === "home" && <HomePage {...commonProps} />}
        {page === "inventory" && <InventoryPage {...commonProps} />}
        {page === "detail" && (
          <DetailPage
            {...commonProps}
            carId={detailId}
            addBooking={addBooking}
            bookings={bookings}
          />
        )}
        {page === "contact" && <ContactPage setPage={setPage} showToast={showToast} />}
        {page === "about" && <AboutPage setPage={setPage} />}
        {page === "auth" && <AuthPage setUser={setUser} setPage={setPage} showToast={showToast} />}
        {page === "profile" && (
          <ProfilePage
            {...commonProps}
            setUser={setUser}
            bookings={bookings}
          />
        )}
        {page === "admin" && (
          <AdminPage
            {...commonProps}
            setCars={setCars}
            bookings={bookings}
            enquiries={enquiries}
            apiSaveCar={apiSaveCar}
            apiDeleteCar={apiDeleteCar}
            apiUpdateBookingStatus={apiUpdateBookingStatus}
            apiDeleteBooking={apiDeleteBooking}
            apiUpdateEnquiryStatus={apiUpdateEnquiryStatus}
            apiDeleteEnquiry={apiDeleteEnquiry}
            apiOnline={apiOnline}
          />
        )}
      </div>
      <Toast toast={toast} />
    </div>
  );
}
