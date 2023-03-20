import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {ageData} = props
  console.log(ageData)
  return (
    <div className="vaccineage-contianer">
      <h1 className="age-heading">Vaccination by Age</h1>
      
        <PieChart width={730} height={250}>
          <Pie
            cx="50%"
            cy="50%"
            data={ageData}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill=" #2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      
    </div>
  )
}

export default VaccinationByAge
