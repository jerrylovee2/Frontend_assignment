import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
// import ChoroplethMap from './ChoroplethMap';
// import  indiaDistricts from  './india_districts.geojson';

const App: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const link =
        'https://ckan.indiadataportal.com/api/3/action/datastore_search?limit=100000&resource_id=011d2088-3ed5-488f-9863-42c2ba2fa3ea';
      const response = await axios.get(link);
      const jsondata = response.data;
      const records = jsondata.result.records;

      const selectedStates = ['Uttar Pradesh', 'Madhya Pradesh', 'Punjab', 'Andhra Pradesh', 'Telangana'];

      const filteredRecords = records.filter((record: any) =>
        selectedStates.includes(record.state_name)
      );  
      console.log('Fetched Data:', filteredRecords);

      const grouped = filteredRecords.reduce((acc: any, record: any) => {
        const { state_name, social_group, hol_no } = record;
        const key = `${state_name}-${social_group}`;
        if (!acc[key]) acc[key] = { state_name, social_group, hol_no: 0 };
        acc[key].hol_no += hol_no;
        return acc;
      }, {});

      const pivoted: { [key: string]: { [key: string]: number } } = Object.values(grouped).reduce(
        (acc: any, record: any) => {
          const { state_name, social_group, hol_no } = record;
          if (!acc[state_name]) acc[state_name] = { All: 0 };
          acc[state_name][social_group] = hol_no;
          return acc;
        },
        {}
      ) as { [key: string]: { [key: string]: number } };

      const chartLabels = Object.keys(pivoted);
      const socialGroups = Object.keys(pivoted[chartLabels[0]]);

      const chartData = socialGroups.map((group: string) => ({
        x: chartLabels,
        y: chartLabels.map((label: string) => pivoted[label][group]),
        name: group,
        type: 'bar',
      }));

      const chartLayout = {
        barmode: 'stack',
        xaxis: { title: 'State' },
        yaxis: { title: 'Hol_no' },
        title: 'Hol_no by State and Social Group',
        legend: { title: 'Social Group' },
      };

      setChartData({ data: chartData, layout: chartLayout });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {chartData ? (
        <Plot
          data={chartData.data}
          layout={chartData.layout}
          style={{ width: '100%', height: '500px' }}
        />
      ) : (
        <div>Loading chart...</div>
      )}


      <div>
        Another Component
        <br />
        {/* <ChoroplethMap
        //still working on it 
      
        /> */}

      </div>
    </div>
  );
};

export default App;
