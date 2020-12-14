import React from 'react';
class Poll extends React.Component {

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
    let {poll} = this.state;
    return (
        <div className="container">

            {poll &&
                <div className={"card"} key={poll.id}>
                    <div className="card-body">
                        <div className="card-title">{poll.question}</div>
                        <div className="card-description">{poll.description}</div>
                        {

                          [...Array(5)].map((x, i) =>
                          poll["opinion"+(i+1)] &&
                           <div key={i} className="opinion">
                            <div className="opinionContent"><input type="radio" name="option" value={i}/></div>
                            <div className="opinionContent">{poll["opinion"+(i+1)]}</div>
                           </div>
                         )
                       }
                    </div>
                </div>
            }
        </div>
    );
}

state = {
};

loadPoll =(id)=> {
  const url = (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://myvotes.in:8089") +  "/polltopic/"+id;
  fetch(url)
      .then(res => res.json())
      .then((data) => {
          this.setState({ poll: data })
      })
      .catch(console.log);
}
componentDidMount() {
  let id = this.props.match.params.id;
  this.loadPoll(id);
}
};

export default Poll
