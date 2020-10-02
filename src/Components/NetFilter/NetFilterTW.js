import React from 'react';

export default (props) => { const {reltypefilter, degreefilter, namefilter, names } = props;


return (

 <div>

   <p>網絡中心</p>
   <input
   defaultValue="Aleni, Giulio (#161)"
   type="text" list="name"
   onChange={(e) => namefilter(e)} />

     <datalist id="name" >
     {names.map((name, i) => {return (<option value={name} key={i}>{name}</option>);}, this)}
     </datalist>


      <p>連接程度</p>
      <select defaultValue="1" type="select" onChange={(e) => degreefilter(e)}>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
      </select>

      <p>Type of Connections</p>
      <select defaultValue="all" type="select" onChange={(e) => reltypefilter(e)}>
          <option value="all">All</option>
          <option value="RELATED_TO">Person to Person</option>
          <option value="PRESENT_AT">Person to Institution</option>
          <option value="AFFILIATED_WITH">Person to Corporation</option>
          <option value="PARTICIPANT_AT">Person to Event</option>
          <option value="PART_OF">Institution to Corporation</option>

      </select>



</div>
  );
};
