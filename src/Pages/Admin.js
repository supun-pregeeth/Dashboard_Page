import "./Admin.css";

export default function Dashboard() {
  const overviewData = [
    { title: "Total Users", value: "0" },
    { title: "Active Users", value: "0" },
    { title: "New Signups", value: "0" },
    { title: "Pending Requests", value: "0" },
  ];

  const usersData = [
    { name: "Supun Lakmal", email: "spl@gmail.com", active: true },
    { name: "Nimal Silva", email: "Nimal45@gmail.com", active: false },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="overview-cards-container">
        {overviewData.map((item, index) => (
          <div key={index} className="overviewDatacard">
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <h2>User Management</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th style={{ paddingLeft: "40px" }}>Name</th>
              <th style={{ paddingLeft: "40px" }}>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      className={`status-indicator ${
                        user.active ? "status-active" : "status-inactive"
                      }`}
                    ></span>
                    {user.name}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span
                    style={{
                      color: user.active ? "#10b981" : "#ef4444",
                      fontWeight: "500",
                    }}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
