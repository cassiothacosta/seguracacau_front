import { useState, useEffect } from 'react'
import Router from 'next/router'
import { PieChart, Pie, Cell, Tooltip } from 'recharts';


const apiLink = process.env.BACKEND_API

export default function RegistersByCategory({username, changed, setChanged, registersDate}: any) {

  const [data, setRegistros] = useState([])
  const emptyData = [{ name: 'Empty', value: 1 }, { name: 'Empty', value: 2 }, { name: 'Empty', value: 3 }]

  useEffect(() => {
    setTimeout(() => {
    async function carregaRegistros() {
      const res = await fetch(apiLink + '/api/getRegistersGroupByCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, registersDate: registersDate }),
        credentials: 'include'
      })

      const registros = await res.json()
      setRegistros(registros.data)
    }

    carregaRegistros()
    setTimeout(() => {
      setChanged(false)
    }, 50)
  }, 100)
  }, [registersDate, setChanged, username])
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#e11d48', '#2dd4bf', '#facc15', '#ccfbf1'];

  async function carregaRegistros() {
    const res = await fetch(apiLink + '/api/getRegistersGroupByCategory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, registersDate: registersDate }),
      credentials: 'include'
    })

    const registros = await res.json()
    setRegistros(registros.data)
    setTimeout(() => {
      setChanged(false)
    }, 50)
  }

  if(changed){
    carregaRegistros()
   }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <>
      {data && data[0] ? (
        <div className='flex grid place-content-center'>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data && data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      ) : (
        <div >
          <PieChart width={400} height={400}>
            <Pie
              data={emptyData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {emptyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

      )
      }
    </>
  )
}
