import React from 'react';
import Poll from './Poll';
import App from '../App';
import {
  Link
} from "react-router-dom";
class Dashboard extends React.Component {
   manageCP =(occupied, id)=> {
    const url = (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://myvotes.in:8089") +  "/cpm/management/"  + (occupied ? "unplug/" : "plug/") + id;
    console.log(url);
    fetch(url, {
       method: 'PUT'
    }).then((res) => {
      let {reload} = this.props;
      reload();
      console.log(res);
    }).catch(err => {
     console.error(err)
   });
  }

render() {
    let {polls} = this.state;
    return (
        <div className="container">
            {polls && polls.map((poll) => (

                <div className={"card"} key={poll.id}>
                    <div className="card-body">
                        <div className="card-title">
                          <Link to={"/poll/"+poll.id+"/"+poll.title}>{poll.question}</Link>
                        </div>
                        <div className="card-description">{poll.description}</div>
                    </div>
                </div>

            ))}
        </div>
    );
}

state = {
    polls: []
};

loadPolls =()=> {
  const url = (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://myvotes.in:8089") +  "/polltopic/list";
  fetch(url)
      .then(res => res.json())
      .then((data) => {
          this.setState({ polls: data })
      })
      .catch(console.log);
}

componentDidMount() {
  this.loadPolls();
    // fetch('http://localhost:8080/cpm/dashboard')
    //     .then(res => res.json())
    //     .then((data) => {
    //         this.setState({ cps: data })
    //     })
    //     .catch(console.log)
}
};

export default Dashboard
