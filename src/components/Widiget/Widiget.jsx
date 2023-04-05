import React, { useEffect, useState } from "react";
import "./widiget.css";

import { MdOutlineHowToVote } from "react-icons/md";
import { SlUser } from "react-icons/sl";
import { IoPeopleOutline } from "react-icons/io5";
import { IoMdGlobe } from "react-icons/io";
import axios from "axios";

const Widiget = () => {
  const [totalPartipant, setTotalPartipant] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);
  const [totalCountry, setTotalCountry] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [totalParent, setTotalParent] = useState(0);

  const getTotal = async () => {
    const res = await axios.get(`participantCount`);
    setTotalPartipant(res.data.participant);
    setTotalActivities(res.data.activities);
    setTotalCountry(res.data.countries);
    setTotalMale(res.data.males);
    setTotalFemale(res.data.females);
    setTotalParent(res.data.parents);
  };
  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div className="widigets">
      <div className="grid_card">
        <div className="widiget">
          <div className="card_icon">
            <MdOutlineHowToVote />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalActivities}</h3>
            <p className="card_title">Total Activities</p>
          </div>
        </div>
        <div className="widiget">
          <div className="card_icon">
            <IoPeopleOutline />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalPartipant}</h3>
            <p className="card_title">Participants</p>
          </div>
        </div>

        <div className="widiget">
          <div className="card_icon">
            <IoMdGlobe />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalCountry}</h3>
            <p className="card_title">Country</p>
          </div>
        </div>
        <div className="widiget">
          <div className="card_icon">
            <SlUser />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalMale}</h3>
            <p className="card_title">Males</p>
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalFemale}</h3>
            <p className="card_title">Females</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widiget;
