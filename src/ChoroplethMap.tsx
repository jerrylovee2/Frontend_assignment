// import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
// import axios from 'axios';
// import indiaDistricts from './india_districts.geojson';

// const ChoroplethMap = () => {
//   const [districtData, setDistrictData] = useState<any[]>([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://ckan.indiadataportal.com/api/3/action/datastore_search?limit=10000&resource_id=011d2088-3ed5-488f-9863-42c2ba2fa3ea');
//       const data = response.data.result.records;
//       setDistrictData(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   if (districtData.length === 0) {
//     return <div>Loading...</div>;
//   }

//   const districtNames = districtData.map((district: any) => district.dt_name);
//   const holdingAreas = districtData.map((district: any) => district.hol_ar);

//   const data: Plotly.Data[] = [
//     {
//       type: 'choropleth',
//       locationmode: 'geojson-id',
//       // geojson: indiaDistricts,  This line is giving me an error  while calling the geojson data object 
//       locations: districtNames,
//       z: holdingAreas,
//       zmin: Math.min(...holdingAreas),
//       zmax: Math.max(...holdingAreas),
//       colorscale: 'Viridis',
//       colorbar: {
//         title: 'Total Holding Area',
//         thickness: 20,
//       },
//     },
//   ];

//   return (
//     <Plot
//       data={data}
//       layout={{
//         title: 'India Districts Choropleth Map',
//         geo: {
//           scope: 'asia',
//         },
//       }}
//       style={{ width: '100%', height: '500px' }}
//       config={{
//         displayModeBar: false,
//       }}
//     />
//   );
// };

// export default ChoroplethMap;


import React from "react";


const ChoroplethMap=()=>{
  return(
    <h1>Test</h1>
  )
}