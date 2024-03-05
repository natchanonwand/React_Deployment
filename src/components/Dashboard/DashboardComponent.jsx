import React, { useState , useEffect } from 'react';
import './Dashboard.css';
import { SearchDashboard } from '../SearchBar/SearchDashboard';
import { SearchDashboardList } from '../SearchBar/SearchDashboardList';
import DashboardBox from './DashboardBox';
import Dropdown from '../DropdownBiz/Dropdown';
import Sidebar from '../Sidebar/Sidebar.jsx';

function DashboardComponent() {
  const [results, setResults] = useState([]);
  console.log('result',results)
  const [selectedBusiness, setSelectedBusiness] = useState(""); // State for selected Business_id
  console.log('BizD',selectedBusiness)

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
                <div style={{display:'flex'}}>
                  <h1 className='centered-D'>Dashboard</h1>
                  <Dropdown setSelectedBusiness={setSelectedBusiness}/>
                </div>        
                <div className='Dashsearch'>
                  <div className="Searchbar">
                    <SearchDashboard setResults={setResults} selectedBusiness={selectedBusiness} />
                  </div>
                  {results.length > 0 && ( // Conditionally render SearchDashboardList if there is any result from Searching
                    <div className='ResultDash'>
                      <SearchDashboardList results={results} />
                    </div> 
                  )}
                </div>
                  
              </div>
              {/* End of Top bar */}
              
              {/* Body */}
                {/* Box 1 */}
                <div className='Dashboard-box'>
                  <div className='boxes'>
                    <h2>After ASSY</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={1} Direction="out" />
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
                    <h2>Before BA-RF</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={2} Direction="in" />
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
                    <h2>after BA-RF</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={2} Direction="out" />
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
                    <h2>BS</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={3} Direction="in" />
                      <DashboardBox Machine_ID={3} Direction="out" />
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
                    <h2>MOKU AVI</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={4} Direction="in" />
                      <DashboardBox Machine_ID={4} Direction="out" />
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
                    <h2>BI</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={5} Direction="in" />
                      <DashboardBox Machine_ID={5} Direction="out" />
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
                    <h2>SG cleaning</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={6} Direction="in" />
                      <DashboardBox Machine_ID={6} Direction="out" />
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
                    <h2>c test</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={7} Direction="in" />
                      <DashboardBox Machine_ID={7} Direction="out" />
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
                    <h2>CBUN</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={8} Direction="in" />
                      <DashboardBox Machine_ID={8} Direction="out" />
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
                    <h2>JUNB AVI</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={9} Direction="in" />
                      <DashboardBox Machine_ID={9} Direction="out" />
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
                    <h2>JUNB BAKE</h2>
                    <div className='box-result'>
                      <DashboardBox Machine_ID={10} Direction="in" />
                      <DashboardBox Machine_ID={10} Direction="out" />
                    </div>
                  </div>

                </div>
              {/* End of Body */}
      </div>
      
    </div>
  );
}

export default DashboardComponent;
