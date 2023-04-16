import axios from 'axios'
import { useEffect, useState } from 'react'

import Selector from './components/Selector'

const App = () => {

  const [sidoData, setSidoData] = useState([]);
  const [sigunguData, setSigunguData] = useState([]);
  const [eupmyundongData, setEupmyundongData] = useState();

  const [sido, setSido] = useState(sidoData[0]);
  const [sigungu, setSigungu] = useState();
  const [eupmyundong, setEupmyundong] = useState();

  // 시/도 데이터 조회
  useEffect(() => {
    axios
      .get("/api/regions/list?cortarNo=0000000000")
      .then((response) => {
        setSidoData(response.data.regionList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setSido(sidoData[0]);
  },[sidoData]);

  // 시/군/구 데이터 조회
  useEffect(() => {
    axios
      .get("/api/regions/list", {
        params: {
          cortarNo: sido?.cortarNo
        }
      })
      .then((response) => {
        setSigunguData(response.data.regionList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sido?.cortarNo]);

  useEffect(() => {
    sigunguData && setSigungu(sigunguData[0]);
  },[sigunguData]);

  // 읍/면/동 데이터 조회
  useEffect(() => {
    axios
      .get("/api/regions/list", {
        params: {
          cortarNo: sigungu?.cortarNo
        }
      })
      .then((response) => {
        setEupmyundongData(response.data.regionList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sigungu?.cortarNo]);

  useEffect(() => {
    eupmyundongData && setEupmyundong(eupmyundongData[0]);
  },[eupmyundongData]);  


  return (
    <section className="min-h-screen px-3 grid place-items-center pb-20 selection:text-white bg-gradient-to-r from-violet-300 to-violet-400">
      <div>
        <h2 className="text-2xl font-bold text-teal-900">
          시/도, 시/군/구, 읍/면/동
        </h2>
        <br />
        <div className="flex flex-wrap gap-3 bg-violet-300 rounded-lg p-8">
          <div>
            <p className="text-teal-800 font-semibold">시/도 :</p>
            <Selector
              data={sidoData}
              selected={sido}
              setSelected={setSido}
            />
          </div>          
          {sigungu && (
            <div>
              <p className="text-teal-800 font-semibold">시/군/구 :</p>
              <Selector
                data={sigunguData}
                selected={sigungu}
                setSelected={setSigungu}
              />
            </div>
          )}
          {eupmyundong && (
            <div>
              <p className="text-teal-800 font-semibold">읍/면/동 :</p>
              <Selector
                data={eupmyundongData}
                selected={eupmyundong}
                setSelected={setEupmyundong}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default App;
