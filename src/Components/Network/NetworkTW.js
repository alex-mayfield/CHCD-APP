import React, { Component } from 'react';
import { render } from "react-dom";
import Graph from "react-graph-vis";
import Nodes from '../../Assets/json/nodes.json';
import Edges from '../../Assets/json/edges.json';
import Filter from '../NetFilter/NetFilterTW';
import InputRange from 'react-input-range';
import Individual from '../Individual/Individual';

//STYLES

const options = {
layout: {
    hierarchical: false,
  },
interactions: {
    tooltipDelay: 100
  },
edges: {
    color: "#0000",
    smooth: { "forceDirection": "none", "roundness": 1}
  },
nodes: {
    color: '#333333',
    fixed: false,
    font: { color: '#000', size: 12, face: 'arial',},
    shape: 'dot',
    scaling: { label: { enabled: true, min: 10, max: 12, drawThreshold: 1} },
  }
};

//EVENTS
const events = {
  doubleClick: function(event) {
    var { nodes } = event;
    var nodeid = nodes[0];
    console.log(selectedNode);
  }
};


// CONSTRUCTOR
class Network extends Component {

  constructor(props) {
    super(props);
    this.state = {
      relTypeFilter: 'all',
      degreeFilter: "1",
      nameFilter: 'Aleni, Giulio (#161)',
      popupFilter: '',
      value: { min: 1500, max: 1950 }
    };
    this.relTypeFilterUpdate = this.relTypeFilterUpdate.bind(this);
    this.degreeFilterUpdate = this.degreeFilterUpdate.bind(this);
    this.nameFilterUpdate = this.nameFilterUpdate.bind(this);
    this.resetFilterUpdate = this.resetFilterUpdate.bind(this);
    this.setPopup = this.setPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      let pass = popupPass;
      this.setState({popupFilter: pass});
      }, 500);
        this.getData();
    if (!this.state.map) this.init(this._mapNode);}

  relTypeFilterUpdate(e) {
    let type = e.target.value;
    if (type === "all") {this.setState({ relTypeFilter: 'all'});}
    else {this.setState({ relTypeFilter: type});}
  }

  degreeFilterUpdate(e) {
    let degree = e.target.value;
    this.setState({degreeFilter: degree});
  }

  nameFilterUpdate(e) {
    let name = e.target.value; if (name === "") {name = "*";}
    this.setState({nameFilter: name});
  }

  resetFilterUpdate() {
    window.location.reload();
  }

  setPopup() {
    let pass = popupPass;
    this.setState({popupFilter: pass });
  }
  closePopup() {
    var element = document.getElementById("hiddendata")
    element.classList.toggle("dataPopup");
    this.setState({popupFilter: '' });
 }

  render() {

  let nameList = Nodes.map(i => i.label);

//FIRST DEGREE FILTER
  // Selects center node or all nodes
  const centernode = Nodes.filter(i => { if (this.state.nameFilter !== "*" && i.label === this.state.nameFilter){return true} else if (this.state.nameFilter === "*" && i.label !== this.state.nameFilter) {return true} else {return false}});
  //Maps center node ids into array
  const nameid = centernode.map(i => i.id);
  //filters edges to include only those connected to center node
  const firstdegree = Edges.filter(i => { if (nameid.indexOf(i.from) !== -1 || nameid.indexOf(i.to) !== -1) {return true} else {return false}});

//SECOND DEGREE FILTER
  // Maps ids all first degree connections to array
  const secto = firstdegree.map(i => i.to); const secfrom = firstdegree.map(i => i.from); const second = secto.concat(secfrom);
  //filters edges to include second degree
  const seconddegree = Edges.filter(i => {if (second.indexOf(i.from) !== -1 || second.indexOf(i.to) !== -1) {return true} else {return false}});

//THIRD DEGREE FILTER
  // Maps ids all second degree connections to array
  const thirto = seconddegree.map(i => i.to); const thirfrom = seconddegree.map(i => i.from); const third = thirto.concat(thirfrom);
  //filters edges to include third degree
  const thirddegree = Edges.filter(i => {if (third.indexOf(i.from) !== -1 || third.indexOf(i.to) !== -1) {return true} else {return false}});

//FOURTH DEGREE FILTER
  // Maps ids all third degree connections to array
  const fourto = thirddegree.map(i => i.to); const fourfrom = thirddegree.map(i => i.from); const fourth = fourto.concat(fourfrom);
  //filters edges to include fourth degree
  const fourthddegree = Edges.filter(i => { if (fourth.indexOf(i.from) !== -1 || fourth.indexOf(i.to) !== -1) {return true} else {return false}});
        // Maps ids all fourth degree connections to array

//FIFTH DEGREE Filter
  const fivrto = fourthddegree.map(i => i.to); const fivfrom = fourthddegree.map(i => i.from); const fifth = fivrto.concat(fivfrom);
  //filters edges to include fifth degree
  const fifthdegree = Edges.filter(i => { if (fifth.indexOf(i.from) !== -1 || fifth.indexOf(i.to) !== -1) {return true} else {return false}});

// APPLY FIILTERS ON DEGREE-BASED EDGE COLLECTIONS
  const onedegree = firstdegree.filter(i => {if (this.state.relTypeFilter === 'all' && i.date >= this.state.value.min && i.date <= this.state.value.max || this.state.relTypeFilter === 'all' && i.date === "0000") {return true; } else if (i.type === this.state.relTypeFilter && i.date >= this.state.value.min && i.date <= this.state.value.max) {return true; } else {return false; }})
  const twodegree = seconddegree.filter(i => {if (this.state.relTypeFilter === 'all' && i.date >= this.state.value.min && i.date <= this.state.value.max || this.state.relTypeFilter === 'all' && i.date === "0000") {return true; } else if (i.type === this.state.relTypeFilter && i.date >= this.state.value.min && i.date <= this.state.value.max) {return true; } else {return false; }})
  const threedegree = thirddegree.filter(i => {if (this.state.relTypeFilter === 'all' && i.date >= this.state.value.min && i.date <= this.state.value.max || this.state.relTypeFilter === 'all' && i.date === "0000") {return true; } else if (i.type === this.state.relTypeFilter && i.date >= this.state.value.min && i.date <= this.state.value.max) {return true; } else {return false; }})
  const fourdegree = fourthddegree.filter(i => {if (this.state.relTypeFilter === 'all' && i.date >= this.state.value.min && i.date <= this.state.value.max || this.state.relTypeFilter === 'all' && i.date === "0000") {return true; } else if (i.type === this.state.relTypeFilter && i.date >= this.state.value.min && i.date <= this.state.value.max) {return true; } else {return false; }})
  const fivedegree = fifthdegree.filter(i => {if (this.state.relTypeFilter === 'all' && i.date >= this.state.value.min && i.date <= this.state.value.max || this.state.relTypeFilter === 'all' && i.date === "0000") {return true; } else if (i.type === this.state.relTypeFilter && i.date >= this.state.value.min && i.date <= this.state.value.max) {return true; } else {return false; }})

// CONSTRUCT EDGES BASED ON ALL FILTERS
  var fedges = {};
  if (this.state.degreeFilter === "1") {var fedges = onedegree;} else if (this.state.degreeFilter === "2") {var fedges = twodegree;} else if (this.state.degreeFilter === "3") {var fedges = threedegree;} else if (this.state.degreeFilter === "4") {var fedges = fourdegree;} else if (this.state.degreeFilter === "5") {var fedges = fivedegree;}

// CONSTRUCT NODES BASED ON CONSTRUCTED EDGES
  const to = fedges.map(i => i.to); const from = fedges.map(i => i.from); const idCheck = to.concat(from);
  const fnodes = Nodes.filter(i => { if (idCheck.indexOf(i.id) !== -1 && this.state.nameFilter === "*") {return true} else if (idCheck.indexOf(i.id) !== -1 && this.state.nameFilter !== "*") {return true} else {return false}})

//CONSTRUCT FILTERED JSON
  const graph = {nodes: fnodes, edges: fedges};



//EVENTS
  const events = {
    doubleClick: function(event) {
      var { nodes } = event;
      var nodeid = nodes[0];
      let selected = fnodes.filter(i => {if (i.id === nodeid) {return true} else {return false}});
      showPopup(selected[0].label);
    }
  };




    return (

    <div className="fullPage">

        <div key="POPUP" id="hiddendata">
          {<Individual
            set={this.setPopup}
            close={this.closePopup}
            init={this.state.popupFilter}
            />}
        </div>

        <div className="network">
            <Graph graph={graph} options={options} events={events} />
        </div>

        <div className="filterColumn">

            <h6>網絡參數</h6>

            <div className="slider">
                {<InputRange
                maxValue={1950}
                minValue={1500}
                value={this.state.value}
                onChange={value => this.setState({ value: value })}/>}
            </div>

            <div className="entry">
                {<Filter
                names={nameList}
                reltypefilter={this.relTypeFilterUpdate}
                degreefilter={this.degreeFilterUpdate}
                namefilter={this.nameFilterUpdate}/>}
                <button type="button" onClick={ this.resetFilterUpdate.bind(this) }>重啟</button>
            </div>

        </div>

    </div>


    );
  }
}

export default Network;
