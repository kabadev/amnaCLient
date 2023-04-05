import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { activitiesContext } from "../../context/activities/context";
import {
  fetchActivities,
  activitySearch,
} from "../../context/activities/actions";
import { Loader } from "../../hooks/Loader";
const Activities = () => {
  const { loading, activities, activity, dispatch } =
    useContext(activitiesContext);
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchActivities(dispatch);
  }, []);

  const dateFormat = (activitydate) => {
    const date = new Date(activitydate);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  const onCategoryChange = (e) => {
    const category = e.target.value;
    setCategory(category);
    if (category) {
      const query = `activityType=${category}`;
      fetchActivities(dispatch, query);
    }
  };
  const onSearch = (e) => {
    setTerm(e.target.value);
    activitySearch(dispatch, term);
  };
  return (
    <div className="activities">
      {loading && <Loader />}

      <div className="add__event">
        <Navbar />
        <div className="main">
          <Sidebar />

          <div className="content">
            <div className="page__header">
              <h3>Activities</h3>

              <Link to="/activities/addActivity" className="btn btn__primary">
                +Add New
              </Link>
            </div>

            <div className="content__Card">
              <div className="content__card__header">
                <div className="filter">
                  <div className="categorys">
                    <select value={category} onChange={onCategoryChange}>
                      <option value="">Category</option>
                      <option value="Training">Training</option>
                      <option value="Feeding">Feeding</option>
                      <option value="Visit">Visit</option>
                    </select>
                  </div>
                </div>
                <div className="date__ranges">
                  <div>
                    <span>From</span>
                    <input type="date" name="" id="" />
                  </div>
                  <div>
                    <span>To</span>
                    <input type="date" name="" id="" />
                  </div>
                </div>
                <div className="input">
                  <input
                    type="search"
                    placeholder="Search Activities"
                    value={term}
                    onChange={onSearch}
                  />
                </div>
              </div>
              <div className="item__card__list">
                {activities.map((activity, i) => (
                  <Link
                    to={"/activities/" + activity._id}
                    className="item__card"
                    key={i}
                  >
                    <div className="item__card__image">
                      <img
                        src="https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29saWQlMjBjb2xvdXJ8ZW58MHx8MHx8&w=1000&q=80"
                        alt=""
                      />
                    </div>
                    <div className="item__card__content">
                      <span className="date">{dateFormat(activity?.date)}</span>
                      <span className="date">{activity?.activityType}</span>
                      <h4>{activity?.activityName}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
