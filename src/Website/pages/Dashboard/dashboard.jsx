import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DashboardService } from '../../../services/dashboard';

export const Dashboard = () => {

  const { getDashboardData } = DashboardService()
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    getDashboardData().then((res) => {
      console.log(res.data.data, 'dashboard');
      setDashboardData(res.data.data)
    }).catch((res) => {
      console.log(res, 'error');
    })
  }, [])


  const barChart = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'Series 1',
        data: [dashboardData?.userCount, dashboardData?.DoctorCount, dashboardData?.recpCount] || [0],
      }
    ],
    colors: ['#32C6C3'],
    xaxis: {
      categories: ['User', 'Doctor', 'Reception',]
    },
    yaxis: {
      labels: {
        show: false
      }
    },
  };

  return (
    <React.Fragment>

      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <p>
                DASHBOARD
              </p>
            </div>

            <div className="card cardForm">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12  ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Total Users</p>
                            <small>Current</small>
                          </div>
                          {
                            (dashboardData?.adminCount || dashboardData?.hospitalCount || dashboardData?.userCount) &&
                            <ReactApexChart options={barChart} series={barChart?.series} type="bar" height={245} />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </React.Fragment>
  )
}
