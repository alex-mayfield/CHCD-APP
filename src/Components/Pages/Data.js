import React, { Component } from 'react';

class Data extends Component {
  render() {
    return (

      <div className="textPage">
      <h1>Data Center</h1>
        <p>This online platform is just one expression of what can be done with the data collected in the China Historical Christian Database (CHCD). In order to use other digital tools or do more complex statistical analyis, the data will need to be downloaded. This page contains links and documents that will help you understand the structure of the database, its nominclature, and the technology used to build it.</p>

      <h2> Download the CHCD </h2>
        <p>The China Historical Database is committed to data accessibility and open-acess scholarship. The process of collecting, cleaning, and organizing historical data, however, necessarily entails refinement over time. As such the project will release periodic updates of its data. Each update will note what data has been collected and what changes have been made since the last update. Use the links below to download the latest dataset.</p>
        <form action="https://www.google.com" method="get" target="_blank">
          <button type="submit" className="download">Download the Latest Version of the CHCD</button>
         </form>
      <h2>Documentation</h2>
        <p> These documents provide technical overviews of the database or various aspects of it.</p>
        <ul>
          <li><a href="">CHCD White Paper</a></li>
          <li><a href="">CHCD Source Index</a></li>
        </ul>

      <h2>Neo4j Graph Database Platform</h2>
        <p>The CHCD utilizes the open-source graph database platform Neo4j in order to run its database. While data can be ported into other database formats, some familiarity with Neo4j can be helpful. <a href="https://neo4j.com/">Click here to learn more about Neo4j.</a></p>
      </div>

    );
  }
}

export default Data;
