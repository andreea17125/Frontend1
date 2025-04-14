import React from 'react'


const AdminImport= () => {
  const apiKey = "178cc899368f8c89cfa4034ab13df98a";
  const path = 'https://api.gateway.attomdata.com/areaapi/v2.0.0';
  const api = ' /areaapi/area/boundary/detail'
  const wktPoint = "POINT(-118.2437 34.0522)";
  const geoType = "ZI";
  const handleImport = async () => {
    const response = await fetch(
      `https://api.gateway.attomdata.com/areaapi/v4/hierarchy/lookup?WKTString=${encodeURIComponent(
        wktPoint
      )}&geoType=${geoType}`,
      {
        headers: {
          Accept: "application/json",
          apikey: "178cc899368f8c89cfa4034ab13df98a", 
        },
      }
    );
    console.log(response);

  }
  return (
    <button onClick={handleImport}></button>
    
  )
}

export default AdminImport