import * as React from 'react';

interface IDashboardProps {
}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className='p-8 bg-[#FAFAFA] w-fit h-full'>
      <h1>Dashboard</h1>
    </div>
  )
};

export default Dashboard;
