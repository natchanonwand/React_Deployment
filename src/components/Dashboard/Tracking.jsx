import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { SearchDashboard } from '../SearchBar/SearchDashboard';
import { SearchDashboardList } from '../SearchBar/SearchDashboardList';
import { useParams } from 'react-router-dom';
import TrackingBox from './TrackingBox';
import './Tracking.css'
import Sidebar from '../Sidebar/Sidebar.jsx';

function Tracking() {
  const { lot_Data } = useParams();
  const [results, setResults] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(""); // State for selected Business_id
  console.log('result',results)
  console.log('Data',lot_Data)

  useEffect(() => {
    const storedSelectedBusiness = localStorage.getItem("selectedBusiness");
    if (storedSelectedBusiness) {
      setSelectedBusiness(storedSelectedBusiness);
    }
  }, []);

  return (
    <div className='Dashboard'>
      <Sidebar/>
      <div className='wrapDash'>
          {/* Top bar */}
                <div className="DashBar">
                  <h1 className='centered-Dash'>
                      Tracking 
                      <div className="blink"></div>        
                      {lot_Data}
                  </h1>
                  <div className='Dashsearch'>
                    <div className="Searchbar">
                      <SearchDashboard setResults={setResults} selectedBusiness={selectedBusiness} />
                    </div>
                    {results.length > 0 && ( // Conditionally render SearchDashboardList if there is any result from Searching
                      <div className='ResultDash'>
                        <SearchDashboardList results={results}/>
                      </div> 
                    )}
                  </div>
                    
                </div>
                {/* End of Top bar */}
                
                {/* Body */}
                  {/* Box 1 */}
                  <div className='Dashboard-box'>
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>After ASSY</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={1} Direction="out" lot_Data={lot_Data}/>
                      </div>
                    </div>
                      <div id="arrowAnim">
                        <div class="arrowSliding">
                          <div class="arrow"></div>
                        </div>
                        <div class="arrowSliding delay1">
                          <div class="arrow"></div>
                        </div>
                        <div class="arrowSliding delay2">
                          <div class="arrow"></div>
                        </div>
                        <div class="arrowSliding delay3">
                          <div class="arrow"></div>
                        </div>
                      </div>

                    {/* Box 2 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>Before BA-RF</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={2} Direction="in" lot_Data={lot_Data}/>
                      </div>
                    </div>
                      <div id="arrowAnim">
                          <div class="arrowSliding">
                            <div class="arrow"></div>
                          </div>
                          <div class="arrowSliding delay1">
                            <div class="arrow"></div>
                          </div>
                          <div class="arrowSliding delay2">
                            <div class="arrow"></div>
                          </div>
                          <div class="arrowSliding delay3">
                            <div class="arrow"></div>
                          </div>
                        </div>  
                    
                    {/* Box 3 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>after BA-RF</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={2} Direction="out" lot_Data={lot_Data}/>
                      </div>
                    </div>
                        <div id="arrowAnim">
                            <div class="arrowSliding">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                              <div class="arrow"></div>
                            </div>
                        </div>
                    
                    {/* Box 4 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>BS</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={3} Direction="in" lot_Data={lot_Data}/>
                        <TrackingBox Machine_ID={3} Direction="out" lot_Data={lot_Data}/>
                      </div>
                    </div>
                        {/* <div id="arrowAnim">
                            <div class="arrowSliding">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                              <div class="arrow"></div>
                            </div>
                          </div> */}

                    {/* Box 5 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>MOKU AVI</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={4} Direction="in" lot_Data={lot_Data}/>
                        <TrackingBox Machine_ID={4} Direction="out" lot_Data={lot_Data}/>
                      </div>
                    </div>
                        <div id="arrowAnim">
                            <div class="arrowSliding">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                              <div class="arrow"></div>
                            </div>
                          </div>

                    {/* Box 6 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>BI</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={5} Direction="in" lot_Data={lot_Data}/>
                        <TrackingBox Machine_ID={5} Direction="out" lot_Data={lot_Data}/>
                      </div>
                    </div>
                        <div id="arrowAnim">
                            <div class="arrowSliding">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                              <div class="arrow"></div>
                            </div>
                          </div>

                    {/* Box 7 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>SG cleaning</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={6} Direction="in" lot_Data={lot_Data}/>
                        <TrackingBox Machine_ID={6} Direction="out" lot_Data={lot_Data}/>
                      </div>
                    </div>
                        <div id="arrowAnim">
                            <div class="arrowSliding">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                              <div class="arrow"></div>
                            </div>
                          </div>

                    {/* Box 8 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>c test</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={7} Direction="in" lot_Data={lot_Data}/>
                        <TrackingBox Machine_ID={7} Direction="out" lot_Data={lot_Data}/>
                      </div>
                    </div>
                        {/* <div id="arrowAnim">
                            <div class="arrowSliding">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                              <div class="arrow"></div>
                            </div>
                          </div> */}

                    {/* Box 9 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>CBUN</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={8} Direction="in" lot_Data={lot_Data}/>
                        <TrackingBox Machine_ID={8} Direction="out" lot_Data={lot_Data}/>
                      </div>
                      
                    </div>
                        <div id="arrowAnim">
                            <div class="arrowSliding">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                              <div class="arrow"></div>
                            </div>
                          </div>

                    {/* Box 10 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>JUNB AVI</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={9} Direction="in" lot_Data={lot_Data}/>
                        <TrackingBox Machine_ID={9} Direction="out" lot_Data={lot_Data}/>
                      </div>
                    </div>
                        <div id="arrowAnim">
                            <div class="arrowSliding">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                              <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                              <div class="arrow"></div>
                            </div>
                          </div>

                    {/* Box 11 */}
                    <div className='boxes'>
                      <h2 style={{color:'blue'}}>JUNB BAKE</h2>
                      <div className='box-result'>
                        <TrackingBox Machine_ID={10} Direction="in" lot_Data={lot_Data}/>
                        <TrackingBox Machine_ID={10} Direction="out" lot_Data={lot_Data}/>
                      </div>
                    </div>

                  </div>
                {/* End of Body */}
      </div>
      
    </div>
  );
}

export default Tracking;
