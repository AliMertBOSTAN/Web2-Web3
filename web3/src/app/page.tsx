"use client";
import { ethers } from "ethers";
import React, { useState, useEffect } from 'react';
import abi from "../../assets/abi.json";

const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/af3c7cf672f142b1ba579cbae221cd1c'); // Infura gibi bir çok provider'dan bir tanesini kullanabilirsiniz

const contractAddress = '0xcbD7cd71A91F10729599a3d4F4b5c12f0821f9Fc'; // Sözleşmemizin Blockchain adresi

const contract = new ethers.Contract(contractAddress, abi, provider);

export default function Home() {
  // State tanımları
  const [ada, setAda] = useState<string | null>(null);
  const [ekim, setEkim] = useState<string | null>(null);
  const [hektar, setHektar] = useState<string | null>(null);
  const [parsel, setParsel] = useState<string | null>(null);
  const [verim, setVerim] = useState<string | null>(null);
  const [kalan, setKalan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // useEffect ile veri çekme
  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      console.log("Veri çekme başlıyor...");

      try {
        const adaValue = await contract.queryAda();
        console.log("ADA Verisi:", adaValue);
        const ekimValue = await contract.queryEkim();
        console.log("EKIM Verisi:", ekimValue);
        const hektarValue = await contract.queryHektar();
        console.log("HEKTAR Verisi:", hektarValue);
        const parselValue = await contract.queryParsel();
        console.log("PARSEL Verisi:", parselValue);
        const verimValue = await contract.queryVerim();
        console.log("VERIM Verisi:", verimValue);
        const kalanValue = await contract.kalan();
        console.log("KALAN Verisi:", kalanValue);

        setAda(adaValue);
        setEkim(ekimValue);
        setHektar(hektarValue);
        setParsel(parselValue);
        setVerim(verimValue);
        setKalan(kalanValue);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setError("Veri çekme hatası: " + error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Sözleşme Verileri</h1>
      <p><strong>Ada:</strong> {ada }</p>
      <p><strong>Ekim:</strong> {ekim }</p>
      <p><strong>Hektar:</strong> {hektar }</p>
      <p><strong>Parsel:</strong> {parsel }</p>
      <p><strong>Verim:</strong> {verim }</p>
      <p><strong>Kalan:</strong> {kalan }</p>
    </div>
  );
}
