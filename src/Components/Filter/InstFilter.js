import React from 'react';

export default (props) => { const {typefilter, namefilter, locatfilter, corpfilter, types, names, locats, corps } = props;


return (

 <div>

    <p>Filter by Name</p>
    <input
    type="text" list="name"
    onChange={(e) => namefilter(e)} />
      <datalist id="name">
      {names.map((name, i) => {return (<option value={name} key={i}>{name}</option>);}, this)}
      </datalist>

      <p>Filter by Affiliation</p>
      <input
      type="text" list="corp"
      onChange={(e) => corpfilter(e)} />
        <datalist id="corp">
        {corps.map((corp, i) => {return (<option value={corp} key={i}>{corp}</option>);}, this)}
        </datalist>

        <p>Filter by Location</p>
        <input
        type="text" list="locat"
        onChange={(e) => locatfilter(e)} />
          <datalist id="locat">
          {locats.map((locat, i) => {return (<option value={locat} key={i}>{locat}</option>);}, this)}
          </datalist>

      <p>Filter by Type</p>
      <input type="text" list="type"
       onChange={(e) => typefilter(e)} />
        <datalist id="type">
        {types.map((type, i) => {return (<option value={type} key={i}>{type}</option>);}, this)}
        </datalist>


</div>
  );
};
