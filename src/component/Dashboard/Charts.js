import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../api/api';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const LineChartComponent = () => {
  const [dsdoanhthu,setDSDoanhThu] = useState([]);
  const [dsthang,setDSthang] = useState([]);
  const [dsngay,setDSNgay] = useState([]);
  const [dsdoanhthungay,setDSDoanhThuNgay] = useState([]);

  useEffect(()=> {
    async function setdsdoanhthu() {
    var response = await fetch(`${apiUrl}/donhangadmin/donduyet-doanhthu`);
    var json = await response.json();
    setDSDoanhThu(json.data);
    setDSthang(json.datamonth);

    }
    setdsdoanhthu();
    async function setdsdoanhthungay() {
      var response = await fetch(`${apiUrl}/donhangadmin/donduyet-doanhthungay`);
      var json = await response.json();
      setDSDoanhThuNgay(json.data);
      setDSNgay(json.dataday);
      
      }
      setdsdoanhthungay();
},[])

  const data = {
    labels: dsngay,
    datasets: [
      {
        label: 'My First Dataset',
        data: dsdoanhthungay.map(value => Math.max(value, 0)),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh thu tháng 7',
      },
    },
  };

  return (
    <div style={{ width:'100%'}}>

      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;