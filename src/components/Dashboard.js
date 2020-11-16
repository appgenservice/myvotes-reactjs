import React from 'react'
import moment from 'moment'
class Dashboard extends React.Component {
   manageCP =(occupied, id)=> {
    const url = (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://appgenservice.com:9090") +  "/cpm/management/"  + (occupied ? "unplug/" : "plug/") + id;
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
    let {cps} = this.props;

    return (
        <div className="container">

            {cps && cps.map((cp) => (
                <div className={cp.occupied ? "card free":"card occupied"} key={cp.id}>
                    <div className="card-body">
                        <div className="card-title">Charging Point:</div>
                        <div className="card-title">{cp.id}</div>
                        <div className="card-title">Status:</div>
                        <div className="card-title"> {cp.occupied ? "Plugged":"Free"}</div>

                        <div className="card-title">Power Consumed:</div>
                        <div className="card-title"> {cp.occupied ? cp.power : "-"}</div>
                        <div className="card-title">Plugged Time: </div>

                        <div className="card-title"> {cp.occupied ? moment(cp.connectedTime).format('MM.DD.YYYY hh:mm:ss') : "-"}</div>
                        <button className="button-action" onClick={() => this.manageCP(cp.occupied, cp.id)}>{cp.occupied ? "Unplug" : "Plug"}</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
};

export default Dashboard
