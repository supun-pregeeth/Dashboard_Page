import "./Admin.css";

export default function Dashboard() {
  const overviewData =[
    {title: "Total Users", value: "78"},
    {title: "Active Users", value: "45"},
    {title: "New Signups", value: "5"},
    {title: "Pending Requests", value: "1"},
  ];

  const usersData =[
    { name: "Supun lakmal", email: "spl@gmail.com"},
    { name: "Nimal silva", email: "Nimal45@gmail.com"},
  
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      {/* Overview boxes */}
      
<div className="all">
      {overviewData.map((item, index) => (
     <div key={index} className="overviewDatacard">
    <h3>{item.title}</h3>
    <p>{item.value}</p>
  </div>
))}

{/* Users table */}
  <div className="users-table-container">
    <table className="users-table">
      <div className="table-header">
      <thead className="table-row">
        <tr >
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      </div>
      <tbody>
        {usersData.map(
          (user,index)=>(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
      </tbody>
      
    </table>
    
  </div>
</div>
</div>
  )
}
