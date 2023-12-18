import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DashboardService } from '../../../services/dashboard';

export const Dashboard = () => {

  const { getDashboardData } = DashboardService()
  const [dashboardData, setDashboardData] = useState([]);

  console.log(dashboardData, 'dashboard');
  useEffect(() => {
    getDashboardData().then((res) => {
      setDashboardData(res.data.data)
    }).catch((res) => {
      console.log(res, 'error');
    })
  }, [])

  const Line1 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20
      }
    },
    colors: ['#32C6C3'],
    tooltip: {
      x: {
        show: false
      },
    }
  }

  const barChart = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 45, 21, 53, 52],
      }
    ],
    colors: ['#32C6C3'],
    xaxis: {
      categories: ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6',]
    },
    yaxis: {
      labels: {
        show: false
      }
    },
  };
  const LineChart = {
    chart: {
      type: 'line',
      // dropShadow: {
      //   enabled: true,
      //   top: 1,
      //   left: 1,
      //   blur: 0,
      //   opacity: 10,
      // },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
        },
      },
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    colors: ['#32C6C3'],
    series: [
      {
        name: 'Insurance A',
        data: [30, 100, 45, 50, 100, 60, 60, 91, 200, 150, 200, 190]
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
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
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Total Users</p>
                            <small>Current</small>
                          </div>
                          <div className="box box1">
                            <div className="details">
                              <p className='category'>{dashboardData.adminCount}</p>
                              <p>Users</p>
                            </div>
                            <ReactApexChart options={Line1} series={Line1.series} type="line" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Total Hospitals</p>
                            <small>Current</small>
                          </div>
                          <div className="box box1">
                            <div className="details">
                              <p className='category'>{dashboardData.hospitalCount}</p>
                              <p>Hospitals</p>
                            </div>
                            <ReactApexChart options={Line1} series={Line1.series} type="line" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Total Admin</p>
                            <small>Current</small>
                          </div>
                          <div className="box box1">
                            <div className="details">
                              <p className='category'>{dashboardData.adminCount}</p>
                              <p>Admins</p>
                            </div>
                            <ReactApexChart options={Line1} series={Line1.series} type="line" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-12 col-sm-12 col-md-6 col-lg-12 col-xl-12 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Total Topics Activity</p>
                            <small>Current</small>
                          </div>
                          <ReactApexChart options={barChart} series={barChart.series} type="bar" height={245} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 col-lg-12 col-xl-12 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Website Traffic</p>
                            <small>Yearly</small>
                          </div>
                        </div>
                      </div>
                      <ReactApexChart options={LineChart} series={LineChart.series} type="line" height={350} />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </React.Fragment>
  )
}
