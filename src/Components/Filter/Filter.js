import React from 'react';

export default (props) => { const {genderfilter, nationfilter, namefilter, locatfilter, corpfilter, genders, nations, names, locats, corps } = props;


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



      <p>Filter by Nationality</p>
      <input type="text" list="nation"
       onChange={(e) => nationfilter(e)} />

        <datalist id="nation">
        {nations.map((nation, i) => {return (<option value={nation} key={i}>{nation}</option>);}, this)}
        </datalist>



        <p>Filter by Gender</p>
          <select id="gender" defaultValue="*" type="select" name="filtergender" onChange={(e) => genderfilter(e)}>
              {genders.map((gender, i) => {return (<option value={gender} key={i}>{gender}</option>);}, this)}
          </select>




</div>
  );
};
