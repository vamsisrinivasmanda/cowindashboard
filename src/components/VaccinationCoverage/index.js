import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
  } from 'recharts'
  
  import './index.css'
  
  const VaccinationCoverage = props => {
    const {vaccineData} = props
    console.log(vaccineData)
    const DataFormatter = number => {
      if (number > 1000) {
        return ` ${(number / 1000).toString()}k`
      }
      return number.toString()
    }
    return (
      <div className="vaccine-graph">
        <h1 className="vaccination-heading">Vaccination Coverage</h1>
        
          <BarChart data={vaccineData} margin={{top: 5}} width={1000} height={300}>
            <XAxis
              dataKey="vaccine_date"
              tick={{
                stroke: 'gray',
                strokeWidth: 1,
              }}
            />
  
            <YAxis
              tickFormatter={DataFormatter}
              tick={{
                stroke: 'gray',
                strokeWidth: 0,
              }}
            />
            <Legend wrapperStyle={{padding: 30}} />
            <Bar dataKey="dose_1" name="Dose 1" fill="#5a8dee" barSize="20%" />
            <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize="20%" />
          </BarChart>
        
      </div>
    )
  }
  
  export default VaccinationCoverage
  