import React from 'react';
class Poll extends React.Component {

   vote =()=> {
    let {email, optionSelected} = this.state;
    if(!this.validateEmail(email)) {
      this.setState({emailError: "Please enter valid email address"});
      return;
    }
    this.setState({emailError: ""});
    let id = this.props.match.params.id;
    const url = (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://myvotes.in:8089") +  "/vote";
    console.log(url);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"email": email, "opinion": optionSelected, "pollId": id})
  };
    fetch(url, requestOptions).then((res) => {
      console.log(res);
      this.setState({voted: true});
    }).catch(err => {
     console.error(err)
   });
  }

  optionSelected =(event)=> {
    this.setState({optionSelected: event.target.value});
  }

  emailChange =(event)=> {
    this.setState({email: event.target.value});
    if(!this.validateEmail(event.target.value)) {
      this.setState({emailError: "Please enter valid email address"});
    }else {
      this.setState({emailError: ""});
    }
  }

  validateEmail =(email)=> {
    if(email) {
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (pattern.test(email)) {
          return true;
        }
        }
      return false;
  }

render() {
    let {poll, optionSelected, voted} = this.state;
    return (
        <div className="container">
            {
              voted &&
              <div className={"card"}>
                <div className="alert alert-success" role="alert">
                  Thanks for letting others know your opinion!
                </div>
              </div>
            }
            { poll && !voted &&
                <div className={"card"}>
                    <div className="card-body">
                        <div className="card-title">{poll.question}</div>
                        <div className="card-description">{poll.description}</div>
                        {

                          [...Array(5)].map((x, i) =>
                          poll["opinion"+(i+1)] &&
                           <div key={i} className="opinion">
                            <div className="opinionContent"><input type="radio" name="option" value={i} onClick={this.optionSelected}/></div>
                            <div className="opinionContent">{poll["opinion"+(i+1)]}</div>
                           </div>
                         )
                       }

                       {optionSelected &&
                         <div className="row">
                         <div className="col-md-6 mb-3">
                             <label className="email">Your Email Address</label>
                             <input type="text" className="form-control" onChange={this.emailChange}/>
                             <div className="text-danger extra-space">{this.state.emailError}</div>
                             <div className="invalid-feedback">
                               Valid last name is required.
                             </div>
                             <button className="btn btn-outline-info btn-sl btn-block" type="submit" onClick={this.vote}>VOTE</button>
                          </div>

                         </div>
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
