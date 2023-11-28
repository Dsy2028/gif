const ctx = document.getElementById('doughnut-math');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Unit 7', 'Unit 8'],
    datasets: [{
      label: 'Topics Completed',
      data: [12, 9, 3, 5,4,4,4,4],
      borderWidth: 1
      
    }]
  },
  options: {
    legend:{
      display: false
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'bottom',
        borderAlign: 'center',
        backgroundColor: '#ccc',
        borderRadius: 3,
        font: {
          size: 18,
        },
        formatter: (val, ctx) =>{
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}: ${data}`;
        },
      },
    },
  },
});

const ctx1 = document.getElementById('pie');
new Chart(ctx1, {
  type: 'pie',
  data: {
    labels: ['Math', 'Language Arts', 'Science', 'Social Studies'],
    datasets: [{
      label: 'Topics Completed',
      data: [12, 9, 3, 5],
      borderWidth: 1
      
    }]
  },
  options: {
    legend:{
      display: false
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'bottom',
        borderAlign: 'center',
        backgroundColor: '#ccc',
        borderRadius: 3,
        font: {
          size: 18,
        },
        formatter: (val, ctx) =>{
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}: ${data}`;
        },
      },
    },
  },
});

const ctx3 = document.getElementById('line');
new Chart(ctx3, {
  type: 'line',
  data: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
,
  options: {
    legend:{
      display: false
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'bottom',
        borderAlign: 'center',
        backgroundColor: '#ccc',
        borderRadius: 3,
        font: {
          size: 18,
        },
        formatter: (val, ctx) =>{
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}: ${data}`;
        },
      },
    },
  },
});

