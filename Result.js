var http = require("http");
var url = require("url");

const data = [
  {
    rollno: 100,
    name: "Junaid Khan",
    subjects: {
      Math: 80,
      English: 75,
      Physics: 85,
      Chemistry: 70,
      Biology: 65,
    },
  },
  {
    rollno: 101,
    name: "Shaibaz Khan",
    subjects: {
      Math: 90,
      English: 88,
      Physics: 92,
      Physics: 89,
      Chemistry: 91,
      Biology: 84,
    },
  },
  {
    rollno: 102,
    name: "Durgesh Bhau",
    subjects: {
      Math: 100,
      English: 99,
      Physics: 98,
      Physics: 95,
      Chemistry: 93,
      Biology: 97,
    },
  },
  {
    rollno: 103,
    name: "Ashish Aanna",
    subjects: {
      Math: 30,
      English: 35,
      Physics: 25,
      Physics: 55,
      Chemistry: 40,
      Biology: 45,
    },
  },
  {
    rollno: 104,
    name: "Atul Farar",
    subjects: {
      Math: 20,
      English: 15,
      Physics: 25,
      Physics: 35,
      Chemistry: 40,
      Biology: 65,
    },
  },
  {
    rollno: 105,
    name: "Mariya Khan",
    subjects: {
      Math: 100,
      English: 95,
      Physics: 100,
      Physics: 85,
      Chemistry: 87,
      Biology: 94,
    },
  },
  {
    rollno: 106,
    name: "Arshiya Khan",
    subjects: {
      Math: 90,
      English: 85,
      Physics: 90,
      Physics: 95,
      Chemistry: 70,
      Biology: 65,
    },
  },
];

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    var q = url.parse(req.url, true).query;

    student = data.filter((std, index) => {
      return std.rollno == q.rollno;
    });

    if (student.length > 0) {
      const s = student[0];
      const subjects = s.subjects;

      let totalMarks = 0;
      for (let subject in subjects) {
        totalMarks = totalMarks + subjects[subject];
      }

      const maxMarks = 500;

      const percentage = (totalMarks / maxMarks) * 100;

      const result = percentage >= 50 ? "Pass" : "Fail";

      let subjectRows = "";
      for (let subject in subjects) {
        subjectRows = subjectRows + 
       ` <tr>
		      <td>${subject}</td>
          <td>${subjects[subject]}</td>
        </tr>`;
      }

      res.write(`<html>
		<head>
		<style>
	body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
        text-align: center;
      }
      .table {
        max-width: 600px;
        margin: auto;
		    margin-top:50px;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 2px 4px 10px rgba(15, 14, 14, 0.1);
      }
		.name{
		display:flex;
		justify-content:space-between;
		}
      h2 {
        color: green;
        font-size: 24px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color:rgb(223, 233, 232);
      }
      tr:nth-child(even) {
        background-color:rgb(162, 193, 232);
      }
	tr:nth-child(odd) {
        background-color:rgb(210, 216, 216);
      }
      .pass {
        color: green;
        font-weight: bold;
      }
      .fail {
        color: red;
        font-weight: bold;
      }
      p {
        font-size: 16px;
		font-weight:bold;
      }
   
	</style>
		</head>
		<body>
		
		<div class="table">
		<h1><u>Result 2025 </u> </h1>
		<div class="name">
          <h2>Name : ${s.name}</h2>
          <h2>RollNo : ${s.rollno}</h2>
		  </div>
          <table>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
            ${subjectRows}
			 <td> <p>Total Marks:</p></td>
		  <td> <p> ${totalMarks}</p></td>
          </table>
          <table>
		  <tr>
		  <td>  <p>Percentage: ${percentage}%</p></td>
		  <td> <p>Result: <span class="${result}">${result}</span></p></td>
		  </tr>
		  </table>
         
          
        </div>
		</body>
		</html>`);
    } else {
      res.write(`<h1 style='color:red'>Student Not found</h1>
        <h3>Enter Valid Roll Number</h3>`
                  
      );
    }

    res.end();
  })
  .listen(8080);
