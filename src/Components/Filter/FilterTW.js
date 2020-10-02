import React from 'react';

export default (props) => { const {genderfilter, nationfilter, namefilter, locatfilter, corpfilter, genders, nations, names, locats, corps } = props;


return (

 <div>

    <p>按名稱過濾</p>
    <input
    type="text" list="name"
    pattern="{NameFilter.map((name, i) => {return ({name} |);}, this)}"
    onChange={(e) => namefilter(e)} />

      <datalist id="name">
      {names.map((name, i) => {return (<option value={name} key={i}>{name}</option>);}, this)}
      </datalist>



      <p>按聯盟過濾</p>
      <input
      type="text" list="corp"
      pattern="{corps.map((corp, i) => {return ({corp} |);}, this)}"
      onChange={(e) => corpfilter(e)} />

        <datalist id="corp">
        {corps.map((corp, i) => {return (<option value={corp} key={i}>{corp}</option>);}, this)}
        </datalist>



        <p>按位置過濾</p>
        <input
        type="text" list="locat"
        pattern="{locats.map((locat, i) => {return ({locat} |);}, this)}"
        onChange={(e) => locatfilter(e)} />

          <datalist id="locat">
          {locats.map((locat, i) => {return (<option value={locat} key={i}>{locat}</option>);}, this)}
          </datalist>



      <p>按國籍過濾</p>
      <input type="text" list="nation"
      pattern="{nations.map((nation, i) => {return ({nation} |);}, this)}"
       onChange={(e) => nationfilter(e)} />

        <datalist id="nation">
        {nations.map((nation, i) => {return (<option value={nation} key={i}>{nation}</option>);}, this)}
        </datalist>



        <p>按性別過濾</p>
          <select id="gender" defaultValue="*" type="select" name="filtergender" onChange={(e) => genderfilter(e)}>
              {genders.map((gender, i) => {return (<option value={gender} key={i}>{gender}</option>);}, this)}
          </select>




</div>
  );
};
