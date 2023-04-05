import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UploadModal from "../../components/modal/UploadModal";

import { IoCloseCircle } from "react-icons/io5";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { activitiesContext } from "../../context/activities/context";
import { addActivity } from "../../context/activities/actions";
import { toastSuccess, toastError } from "../../helper/Toast";
import { countryList } from "../../data/data";
const AddActivity = () => {
  const { loading, dispatch } = useContext(activitiesContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      partner: user._id,
      activityName: title,
      date: date,
      description: text,
      country: country,
      activityType: category,
    };

    await addActivity(dispatch, formData);
    setTitle("");
    setDate("");
    setText("");
    setCountry("");
    toastSuccess("Activity Added Successfully");
  };

  return (
    <div className="add__event">
      {loading && <UploadModal />}

      <ToastContainer />
      <Navbar />
      <div className="main">
        <Sidebar />

        <div className="content">
          <div className="page__header">
            <h3>Add New Activity</h3>
          </div>

          <div className="content__Card">
            <form className="form__card" onSubmit={handleSubmit}>
              <div className="form__header">
                <p className="form__title">New Activity Form</p>
              </div>
              <div className="inputs__container">
                <div className="inputs">
                  <div className="input">
                    <label htmlFor="">Activity Name:</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Activity Name"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="">Activity Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="inputs">
                  <div className="input">
                    <label htmlFor="">Activity Type:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Category</option>
                      <option value="Training">Training</option>
                      <option value="Feeding">Feeding</option>
                      <option value="Visit">Visit</option>
                    </select>
                  </div>
                  <div className="input">
                    <label htmlFor="">Select Country</label>
                    <select name="" id="">
                      <option
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        Country
                      </option>
                      {countryList.map((c, i) => (
                        <option value={c} key={i}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="ckeditor__container">
                <p>Activity Description</p>
                <CKEditor
                  className="editor"
                  editor={ClassicEditor}
                  data={text}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setText(data);
                  }}
                />
              </div>
              <div className="action__btn__center">
                {loading ? "Loading..." : ""}
                <button className="btn btn__primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;
