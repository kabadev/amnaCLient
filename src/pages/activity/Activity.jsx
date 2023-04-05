import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./activity.css";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { activitiesContext } from "../../context/activities/context";
import { fetchActivity } from "../../context/activities/actions";
import { Loader } from "../../hooks/Loader";
import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { countryList } from "../../data/data";
const Activity = () => {
  const { loading, activity, dispatch } = useContext(activitiesContext);
  const id = useParams().id;
  const theme = useMantineTheme();
  const [uniqueId, setUniqueId] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [parent, setParent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const submitNewHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = !uniqueId
      ? {
          gender: gender,
          age: age,
          role: role,
          nationality: country,
          isParent: parent,
          activityId: id,
        }
      : { uniqueId: uniqueId, activityId: id };

    const res = await axios.post(`participants`, data);
    if (res.status === 200) {
      setOpened(false);
      setIsLoading(false);
      fetchActivity(dispatch, id);
    } else {
      setError(res.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity(dispatch, id);
  }, []);

  return (
    <div className="activities">
      {loading && <Loader />}
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
              <label htmlFor="name">Old Participants?</label>
              <input
                type="checkbox"
                id="name"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>

            {isChecked ? (
              <div className="input">
                <label htmlFor="name">Unique ID</label>
                <input
                  type="number"
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                  required
                />
              </div>
            ) : (
              <>
                <div className="input">
                  <label htmlFor="mobile">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Role</option>
                    <option value="Staff">Staff</option>
                    <option value="Volunteers">Volunteers</option>
                    <option value="Facilitators">Facilitators</option>
                    <option value="Member">Member</option>
                  </select>
                </div>
                <div className="input">
                  <label htmlFor="mobile">Nationality</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Nationality</option>
                    {countryList.map((c, i) => (
                      <option value={c} key={i} required>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input">
                  <label htmlFor="mobile">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="input">
                  <label htmlFor="mobile">Parent?</label>
                  <select
                    value={parent}
                    onChange={(e) => setParent(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="input">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="action__btn__center">
              <button className="btn btn__primary">
                {isLoading ? "Saving" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <div className="add__event">
        <Navbar />
        <div className="main">
          <Sidebar />

          <div className="content">
            <div className="content__Card">
              <div className="page__header">
                <h3>{activity?.activity?.activityName}</h3>
                <button
                  className="btn btn__primary"
                  onClick={() => setOpened(true)}
                >
                  Add New
                </button>
              </div>

              <div className="item__card__list activity">
                <div className="activity__info">
                  <div className="activiy__cards">
                    <div className="activity__card">
                      <p>Total</p>
                      <h1>58</h1>
                    </div>
                    <div className="activity__card">
                      <p>Female</p>
                      <h1>58</h1>
                    </div>
                    <div className="activity__card">
                      <p>Male</p>
                      <h1>58</h1>
                    </div>
                    <div className="activity__card">
                      <p>Member</p>
                      <h1>58</h1>
                    </div>
                    <div className="activity__card">
                      <p>Staffs</p>
                      <h1>58</h1>
                    </div>
                  </div>
                  <br />
                  <div className="desc">
                    <h3>Activity description</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quasi atque recusandae id mollitia? Quibusdam, fuga odit
                      inventore ea voluptatem, aperiam tempore hic cumque,
                      accusantium officiis doloribus minus molestiae voluptates
                      temporibus.
                    </p>
                  </div>
                </div>
                <div className="participant__list">
                  <h3>Participants</h3>
                  <div className="member__header">
                    <span className="code">Unique</span>
                    <span className="role">role</span>
                    <span className="national">Nationality</span>
                    <span className="age">Age</span>
                    <span className="gender">Gender</span>
                    <span className="parent">isParent</span>
                  </div>
                  <div className="partici__list">
                    {activity?.paticipants?.map((paticipant, i) => (
                      <div className="member" key={i}>
                        <span className="code">{paticipant.uniqueId}</span>
                        <span className="role">{paticipant.role}</span>
                        <span className="national">
                          {paticipant.nationality}
                        </span>
                        <span className="age">{paticipant.age}</span>
                        <span className="gender">{paticipant.gender}</span>
                        <span className="parent">
                          {paticipant.isParent ? "Yes" : "No"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <br />
              <div className="activity__comment">
                <h3>Comment</h3>
                <div className="comments">
                  <div className="comment">
                    <div className="user">
                      <div className="userimage">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqN9X2wiHXLpeHcXo8x3-qtGhEBh6vX2a8vA&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="userinfo">
                        <h4>Lans Kabba</h4>
                      </div>
                    </div>
                    <div className="message">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Et corrupti perspiciatis nihil doloremque minus beatae
                      possimus, dolores quaerat velit quis culpa eveniet, a
                      ullam. Ex nulla neque excepturi repellendus alias.
                    </div>
                  </div>
                  <div className="comment">
                    <div className="user">
                      <div className="userimage">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqN9X2wiHXLpeHcXo8x3-qtGhEBh6vX2a8vA&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="userinfo">
                        <h4>Lans Kabba</h4>
                      </div>
                    </div>
                    <div className="message">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Et corrupti perspiciatis nihil doloremque minus beatae
                      possimus, dolores quaerat velit quis culpa eveniet, a
                      ullam. Ex nulla neque excepturi repellendus alias.
                    </div>
                  </div>
                  <div className="comment">
                    <div className="user">
                      <div className="userimage">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqN9X2wiHXLpeHcXo8x3-qtGhEBh6vX2a8vA&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="userinfo">
                        <h4>Lans Kabba</h4>
                      </div>
                    </div>
                    <div className="message">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Et corrupti perspiciatis nihil doloremque minus beatae
                      possimus, dolores quaerat velit quis culpa eveniet, a
                      ullam. Ex nulla neque excepturi repellendus alias.
                    </div>
                  </div>
                  <div className="comment">
                    <div className="user">
                      <div className="userimage">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqN9X2wiHXLpeHcXo8x3-qtGhEBh6vX2a8vA&usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="userinfo">
                        <h4>Lans Kabba</h4>
                      </div>
                    </div>
                    <div className="message">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Et corrupti perspiciatis nihil doloremque minus beatae
                      possimus, dolores quaerat velit quis culpa eveniet, a
                      ullam. Ex nulla neque excepturi repellendus alias.
                    </div>
                  </div>

                  <div className="input addcomment">
                    <input type="text" placeholder="Add Comment" />
                    <button className="btn btn__primary">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
