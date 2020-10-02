import React from 'react';

export default (props) => { const {typefilter, namefilter, locatfilter, corpfilter, types, names, locats, corps } = props;


return (

 <div>

    <p>按名称过滤</p>
    <input
    type="text" list="name"
    pattern="{names.map((name, i) => {return ({name} |);}, this)}"
    onChange={(e) => namefilter(e)} />

      <datalist id="name">
      {names.map((name, i) => {return (<option value={name} key={i}>{name}</option>);}, this)}
      </datalist>



      <p>按联盟过滤</p>
      <input
      type="text" list="corp"
      pattern="{corps.map((corp, i) => {return ({corp} |);}, this)}"
      onChange={(e) => corpfilter(e)} />

        <datalist id="corp">
        {corps.map((corp, i) => {return (<option value={corp} key={i}>{corp}</option>);}, this)}
        </datalist>



        <p>按位置过滤</p>
        <input
        type="text" list="locat"
        pattern="{locats.map((locat, i) => {return ({locat} |);}, this)}"
        onChange={(e) => locatfilter(e)} />

          <datalist id="locat">
          {locats.map((locat, i) => {return (<option value={locat} key={i}>{locat}</option>);}, this)}
          </datalist>



      <p>按类型过滤</p>
      <input type="text" list="type"
      pattern="{types.map((type, i) => {return ({type} |);}, this)}"
       onChange={(e) => typefilter(e)} />

        <datalist id="type">
        {types.map((type, i) => {return (<option value={type} key={i}>{type}</option>);}, this)}
        </datalist>





</div>
  );
};
