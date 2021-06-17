import React from 'react'
import { Bar } from 'chart.js';
const BarChart = ({address}) => {
    
    return (
        <div>
            
            <Bar
              data ={{
                  labels: ['AMK','TMK','NTK','NVM'],
                  datasets: [{
                    label: 'Election Result',
                    data: [12, 19, 3, 5],
                    fill : true,
                    categoryPercentage: 1.0,
                    barPercentage: 0.2,
                
                    backgroundColor: [
                        'green',
                        'red',
                        'Black',
                        'Blue',
                    ],
                    borderColor: [
                             'green',
                        'Red',
                        'black',
                        'Blue',
                                        ],
                    borderWidth: 0
        
                },],
              
                }} 
              height={300}
              width={1000}
              //fill : false
              options={
                  {

                  //maintainAspectRatio:false,
                  //maintainAspectRatio:false,npm install chart.js --save

              }
              
            }
            />
            
        </div>
    )
}
//
//function addData(chart, label, data) {
//    chart.data.labels.push(label);
//    chart.data.datasets.forEach((dataset) => {
//        dataset.data.push(data);
//    });
//    chart.update();
//}
//
//function removeData(chart) {
//    chart.data.labels.pop();
//    chart.data.datasets.forEach((dataset) => {
//        dataset.data.pop();
//    });
//    chart.update();
//
//}

export default BarChart;