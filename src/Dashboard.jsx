import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [emplacement, setEmplacement] = useState("Tous");
  const [periode, setPeriode] = useState(7);
const chargerDonnees = () => {
  setLoading(true);
  axios.get(`http://localhost:8000/api/dashboard?jours=${periode}`)
    .then((res) => {
      const toutesDonnees = res.data.donnees;
      const filtre = emplacement === "Tous"
        ? toutesDonnees
        : toutesDonnees.filter(d => d.emplacement === emplacement);
      setDonnees(filtre);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Erreur API :", err);
      setLoading(false);
    });
};

useEffect(() => {
  chargerDonnees();
}, [emplacement, periode]);
<div className="flex gap-4 mb-4">
  <select value={emplacement} onChange={(e) => setEmplacement(e.target.value)}>
    <option value="Tous">Tous les emplacements</option>
    <option value="Jules Guesde">Jules Guesde</option>
    <option value="Cartoucherie">Cartoucherie</option>
    <option value="La friche montaudran">La friche montaudran</option>
    <option value="La friche Gramont">La friche Gramont</option>
    <option value="Colomiers">Colomiers</option>
    <option value="Airbus D&S">Airbus D&S</option>
    <option value="Airbus CSE">Airbus CSE</option>
  </select>

  <select value={periode} onChange={(e) => setPeriode(Number(e.target.value))}>
    <option value={7}>7 jours</option>
    <option value={14}>14 jours</option>
    <option value={30}>30 jours</option>
  </select>
</div>

  useEffect(() => {
    axios.get("http://localhost:8000/api/dashboard")
      .then((res) => {
        setDonnees(res.data.donnees);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des données...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard - Données des 7 derniers jours</h1>
      <div className="overflow-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Emplacement</th>
              <th className="border px-2 py-1">Service</th>
              <th className="border px-2 py-1">Météo</th>
              <th className="border px-2 py-1">Événement</th>
              <th className="border px-2 py-1">CA Total (€)</th>
              <th className="border px-2 py-1">CA Caisse (€)</th>
              <th className="border px-2 py-1">CA UberEats (€)</th>
            </tr>
          </thead>
          <tbody>
            {donnees.map((d, i) => (
              <tr key={i} className="border-t">
                <td className="px-2 py-1">{d.date}</td>
                <td className="px-2 py-1">{d.emplacement}</td>
                <td className="px-2 py-1">{d.service}</td>
                <td className="px-2 py-1">{d.meteo}</td>
                <td className="px-2 py-1">{d.evenement}</td>
                <td className="px-2 py-1">{d.ca_total.toFixed(2)}</td>
                <td className="px-2 py-1">{d.ca_caisse.toFixed(2)}</td>
                <td className="px-2 py-1">{d.ca_ubereats.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;