function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    let color = 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',';
    const backgroundColor = color + '0.2' + ')';
    const borderColor = color + '1' + ')';
    return { backgroundColor, borderColor };
}

const fetchData = async (type, cate) => {
    let res = null;
    if (type === "order") {
        res = await fetch(`${API_URL}/order/statistics-${cate}`);
    } else if (type === "patient") {
        res = await fetch(`${API_URL}/manager/patient-management/statistics`);
    }
    res = await res.json();
    if (res.status == 'success') {
        let datasets = [];
        const labels = ['01/2022', '02/2022', '03/2022', '04/2022', '05/2022', '06/2022', '07/2022'];

        let data = res.data;
        for (let item in data) {
            let statistic = labels.map((label) => data[item][label]);
            datasets.push({
                label: item,
                data: statistic,
                ...random_rgba(),
                borderWidth: 3,
                fill: false,
                tension: 0.1,
            });
        }
        return { labels, datasets };
    }
    return null;
};

const fetchStatistics = (type, cate) => {
    fetchData(type, cate).then((data) => {
        if (data) {
            let ctx = null;
            if (type === "order") {
                ctx = document.getElementById(`${cate}Statistics`).getContext('2d');
            } else if (type === "patient") {
                ctx = document.getElementById('patientStatistics').getContext('2d');
            }

            const config = {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    layout: {
                        padding: {
                            x: 50,
                        },
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'SỐ LIỆU THỐNG KÊ',
                        },
                    },
                },
            };
            var myChart = new Chart(ctx, config);
        }
    });
}   
