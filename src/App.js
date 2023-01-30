import axios from "axios";
import {useState} from "react";

function App() {

  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const [query3, setQuery3] = useState("");
  const [query4, setQuery4] = useState("");
  const [query5, setQuery5] = useState("");
  const [s_code, setS_code] = useState("");
  const [s_name, setS_name] = useState("");
  const [s_people_in, setS_people_in] = useState("");
  const [s_people_out, setS_people_out] = useState("");
  const [ES_time, setES_time] = useState("");
  const [mysql_time, setMysql_time] = useState("");

  const onChange = (event) => {
    setQuery(event.target.value);
  }

  const onChange2 = (event) => {
    setQuery2(event.target.value);
  }

  const onChange3 = (event) => {
    setQuery3(event.target.value);
  }

  const onChange4 = (event) => {
    setQuery4(event.target.value);
  }

  const onChange5 = (event) => {
    setQuery5(event.target.value);
  }

  const sendRequest = async() => {
    const result = await axios.get('/api/f',
      { params: {query : query} }
    );
    setS_name(result.data[0]._source.station.name);
  };

  const sendRequest2 = async() => {
    const result = await axios.get('/api/s',
      { params: {query : query2} }
    );
    setS_people_in(result.data.ENT_people_in.value);
    setS_people_out(result.data.ENT_people_out.value);
    var d1 = document.getElementById("d1");
    d1.style.display = "block";
  };

  const sendRequest3 = async() => {
    const result = await axios.get('/api/t',
      { params: {query : query3} }
    );
    setS_code(result.data[0]._source.station.code);
  };

  const sendRequest4 = async() => {
    const t0 = performance.now();
    const result = await axios.get('/api/es',
      { params: {pin : query4, pout : query5} }
    );
    const t1 = performance.now();
    console.log(`ES 소요 시간 : ${((t1 - t0)/1000).toFixed(3)} seconds.`);
    setES_time(((t1 - t0)/1000).toFixed(3));
    console.log(result.data.hits.hits);
  };

  const sendRequest5 = async() => {
    const t0 = performance.now();
    const result = await axios.get('/api/mysql',
      { params: {pin : query4, pout : query5} }
    );
    const t1 = performance.now();
    console.log(`MySQL 소요 시간 : ${((t1 - t0)/1000).toFixed(3)} seconds.`);
    setMysql_time(((t1 - t0)/1000).toFixed(3));
    console.log(result.data.list);
  };

  return (
    <div className="App">
      <header className="App-header">
        <strong>ES Seoul Metro Info</strong>
        <br/><br/>
        <div>역명 &gt; 역코드 변환</div>
        <input name="input3" type="text" value={query3} onChange={onChange3}></input>
        <button type="button" onClick={sendRequest3}>전송</button>
        <span name="s_code"> {s_code}</span>
        <hr></hr>
        <div>역 코드 &gt; 역명 변환</div>
        <input name="input" type="text" value={query} onChange={onChange}></input>
        <button type="button" onClick={sendRequest}>전송</button>
        <span name="s_name"> {s_name}</span>
        <hr></hr>
        <div>역명 &gt; 승하차 인원 변환</div>
        <input name="input2" type="text" value={query2} onChange={onChange2}></input>
        <button type="button" onClick={sendRequest2}>전송</button>
        <div id="d1" name="d1" style={{display:"none"}}>
        <span name="s_people_in"> 승차 : {s_people_in}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span name="s_people_out"> 하차 : {s_people_out}</span>
        </div>
        <hr></hr>
        <div>승하차 인원 &gt; 해당 날짜, 역명 조회</div>
        <br/>
        <div>
          <div><span>승차</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>하차</span></div>
        <input name="input4" type="text" value={query4} onChange={onChange4}></input>
        <input name="input5" type="text" value={query5} onChange={onChange5}></input>
        </div>
        <div>
          <button type="button" onClick={sendRequest4}>ES</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={sendRequest5}>MySQL</button>
        </div>
        <div>ES 소요 시간 : {ES_time}</div>
        <div>MySQL 소요 시간 : {mysql_time}</div>
      </header>
    </div>
  );
}

export default App;