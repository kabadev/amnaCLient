//
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "./Table";
import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { countryList } from "../../data/data";
const Partner = () => {
  const theme = useMantineTheme();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState(false);

  const [partners, setPartners] = useState([]);
  const getPaticipant = async () => {
    const res = await axios.get(`users`);
    setPartners(res.data.data);
  };
  useEffect(() => {
    getPaticipant();
  }, []);
  const submitNewHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      fullName: fullname,
      email: email,
      mobile: mobile,
      role: role,
      joinDate: joinDate,
      country: country,
      password: password,
    };

    const res = await axios.post(`users`, data);
    if (res.status === 200) {
      getPaticipant();
      setFullname("");
      setEmail("");
      setMobile("");
      setPassword("");
      setOpened(false);
      setIsLoading(false);
    } else {
      setError(res.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        size="30%"
        onClose={() => setOpened(false)}
        title="Add New User"
      >
        <form className="input_form" onSubmit={submitNewHandler}>
          <p className="error">{error}</p>
          <div className="inputs">
            <div className="input">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="number"
                id="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label htmlFor="mobile">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value=""></option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Partner">Partner</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="mobile">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value=""></option>
                {countryList.map((c, i) => (
                  <option value={c} key={i} required>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="input">
              <label htmlFor="mobile">Join Date</label>
              <input
                type="date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="action__btn__center">
              <button className="btn btn__primary">
                {isLoading ? "Saving" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <div className="home__page">
        <Navbar />
        <div className="main">
          <Sidebar />
          <div className="content">
            <div className="page__header">
              <h3>Partner/Users</h3>
              <button
                className="btn btn__primary"
                onClick={() => setOpened(true)}
              >
                +Add New
              </button>
            </div>
            <div className="content__Card">
              <Table partners={partners} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
