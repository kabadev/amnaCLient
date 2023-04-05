//
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Loader } from "../../hooks/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Widiget from "../../components/Widiget/Widiget";
import ApexChart from "../../components/chart/Chart";
import Piechart from "../../components/chart/Piechart";
import Table from "../../components/participant/Table";
const Home = () => {
  return (
    <div className="home">
      {/* {loading ? <Loader /> : ""} */}

      <div className="home__page">
        <Navbar />
        <div className="main">
          <Sidebar />
          <div className="content">
            <div className="content__Card">
              <Widiget />
              <div className="charts">
                <ApexChart />
                <div className="piechart">
                  <Piechart />
                </div>
              </div>
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
