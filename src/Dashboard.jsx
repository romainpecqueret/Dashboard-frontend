import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [nomResto, setNomResto] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/ventes')
      .then((res) => {
        setData(res.data.donnees);
        setNomResto(res.data.restaurant);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Tableau de bord - {nomResto}</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="chiffre_affaires" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}