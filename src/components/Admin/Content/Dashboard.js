import "./Dashboard.scss";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { getOverview } from "../../../services/apiService";
import { useState, useEffect } from "react";
const DashBoard = (props) => {
     const [dataOverview, setDataOverview] = useState([]);
     const [dataChart, setDataChart] = useState([]);
     useEffect(() => {
          fetchDataOverview();
     }, [])
     const fetchDataOverview = async () => {
          let res = await getOverview();
          if (res && res.EC === 0) {
               setDataOverview(res.DT)
               // process chart data
               let Qz = 0, Qs = 0, As = 0, Us = 0;
               Qz = res?.DT?.others?.countQuiz ?? 0;
               Qs = res?.DT?.others?.countQuestions ?? 0;
               As = res?.DT?.others?.countAnswers ?? 0;
               Us = res?.DT?.users?.total ?? 0;
               const data = [
                    {
                         "name": "Quizzes",
                         "Qz": Qz,
                    },
                    {
                         "name": "Questions",
                         "Qs": Qs,
                    },
                    {
                         "name": "Answers",
                         "As": As,
                    },
                    {
                         "name": "Users",
                         "Us": Us,
                    }
               ]
               setDataChart(data);
          }
     }
     

     return (
          <div className="dashboard-container">
               <div className="title">
                    Analytics DashBoard
               </div>
               <div className="content">
                    <div className="c-left">
                         <div className="child">
                              <span className="text-1">Total Users</span>
                              <span className="text-2">
                                   {
                                        dataOverview && dataOverview.users
                                             && dataOverview.users.total
                                             ? <>{dataOverview.users.total}</>
                                             : <>0</>
                                   }
                              </span>
                         </div>
                         <div className="child">
                              <span className="text-1">Total Quizzes</span>
                              <span className="text-2">
                              {
                                        dataOverview && dataOverview.others 
                                        && dataOverview.others.countQuiz 
                                             ? <>{dataOverview.others.countQuiz}</>
                                             : <>0</>
                                   }
                              </span>
                         </div>
                         <div className="child">
                              <span className="text-1">Total Questions</span>
                              <span className="text-2">
                              {
                                        dataOverview && dataOverview.others 
                                        && dataOverview.others.countQuestions 
                                             ? <>{dataOverview.others.countQuestions}</>
                                             : <>0</>
                                   }
                              </span>
                         </div>
                         <div className="child">
                              <span className="text-1">Total Answers</span>
                              <span className="text-2">
                                   {
                                        dataOverview && dataOverview.others
                                             && dataOverview.others.countAnswers
                                             ? <>{dataOverview.others.countAnswers}</>
                                             : <>0</>
                                   }
                              </span>
                         </div>
                    </div>
                    <div className="c-right">
                         <ResponsiveContainer className="chart" width="95%" height="95%" >
                              <BarChart data={dataChart}>
                                   <CartesianGrid strokeDasharray="3 3" />
                                   <XAxis dataKey="name" />
                                   <YAxis />
                                   <Tooltip />
                                   <Legend />
                                   <Bar dataKey="Qz" fill="#8884d8" />
                                   <Bar dataKey="Qs" fill="#82ca9d" />
                                   <Bar dataKey="As" fill="#fcb12a" />
                                   <Bar dataKey="Us" fill="#0ca2ec" />
                              </BarChart>
                         </ResponsiveContainer>
                    </div>
               </div>
          </div>
     )
}

export default DashBoard;