import React, { Component } from 'react';

class About extends Component {
  render() {
    return (

      <div className="textPage">
      <h1>About the Project</h1>
        <p>The historical study of Christianity in China faces a host of challenges that make empirically driven and meta-level forms of analysis seemingly impossible. The disparate nature of resources, technological hurdles, and the “foreign” status of Christianity itself make such forms of analysis daunting. Yet, the China Historical Christian Database (CHCD) is a new project that seeks to overcomes these hurdles. Through the creation of strategic partnerships, innovative online tools, and a cutting-edge geographic and relational database, the CHCD is poised to create a field-changing resource that opens up new levels of analysis while shoring up advances made in the past few decades.</p>

      <div className="divider"></div>

      <h2>Project Goals</h2>

      <h3>Creation of a Geographic and Relational Database</h3>
        <p>This database will be flexible in design and allow student and scholars to track Christian people, institutions, organizations, and events in China between the 16tth - 20th centuries. No historical database can be exhaustive. However, the CHCD aims to capture as wide a swath of data as possible. This wide-swath approach will enable levels of statistical analysis of Christian presence that have heretofore been impossible.</p>
      <h3>Creation of a User-Friendly Online Platform</h3>
        <p>Equally important as the data, this project aims to make the data accessible as possible to students, teachers, and researchers through a user-friendly online platform that includes both textual search and geographic visualization. When complete, this tool will be available in both English and Chinese.</p>
      <h3>Partnership Between Chinese and Western Universities</h3>
        <p>The project aims to bring together multiple teams from Western and Chinese research universities. By working together to collect and analyze data, the project provides a chance to overcome the complexities of the historical sources while creating opportunities for mutual enrichment. Further, the data-driven methodology of the project enables scholars from different disciplines and fields to engage the project.</p>

      <div className="divider"></div>

      <h2>Project Team</h2>

        <div className="float-left">
          <div className="bio-pic-eugenio"></div>
          <h3>Eugenio Menegon</h3>
          <h4>Lead Researcher</h4>
          <p>Eugenio Menegon (B.A. University of Venice Ca’ Foscari, Italy; M.A. & Ph.D. University of California at Berkeley, USA) teaches Chinese history and world history in the Department of History at Boston University, and was Director of the Boston University Center for the Study of Asia in 2012-2015. His interests include Chinese-Western relations in late imperial times, Chinese religions and Christianity in China, Chinese science, the intellectual history of Republican China,  the history of maritime Asia, and Chinese food history.  He has been Research Fellow in Chinese Studies at the Katholieke Universiteit Leuven (Belgium), An Wang Post-Doctoral Fellow at Harvard University’s Fairbank Center for Chinese Studies, Boston University Humanities Center Junior and Senior Fellow, a Member of the School of Historical Studies at the Institute for Advanced Studies in Princeton, and Senior Fellow at the Institute for Advanced Jesuit Studies at Boston College, where he currently is a Collaborative Scholar.</p>
        </div>

        <div className="float-left">
          <div className="bio-pic-daryl"></div>
          <h3>Daryl Ireland</h3>
          <h4>Lead Researcher</h4>
          <p>Dr. Ireland (B.A. Wheaton College; M.Div. & M.A. Nazarene Theological Seminary; Ph.D. Boston University) is the Associate Director of the Center for Global Christianity and Mission, and Research Assistant Professor of Mission. Daryl is an ordained minister in the Church of the Nazarene, and has served in various appointments in Asia, Europe, and the United States. His research interests congregate around Christianity in East Asia, particularly revitalization movements in China and Southeast Asia.</p>
        </div>

        <div className="float-left">
          <div className="bio-pic-alex"></div>
          <h3>Alex Mayfield</h3>
          <h4>Project Manager</h4>
          <p>Alex Mayfield (B.A. Oral Roberts University; M.Div. Boston College) is a Ph.D. candidate at Boston University School of Theology. His research interests include global Pentecostal and Charismatic movements, ecumenism, mission history in Asia, and the development of Chinese Christianity in the modern period. Beyond these interests, Alex has worked on several digital initiatives that aim to bridge the gap between the theological academe and the wider public.</p>
        </div>

        <div className="divider"></div>

        <h2>Research Assistants</h2>

          <div className="float-left">
            <div className="bio-pic-small-aaron"></div>
            <h3>Aaron Liew</h3>
            <p>Aaron Liew is a graduate of the College of the Holy Cross, where he double-majored in Chinese and History. He is currently planning on getting a Masters in Chinese History.</p>
          </div>

          <div className="float-left">
            <div className="bio-pic-small-david"></div>
            <h3>David Li</h3>
            <p>David Li is a senior at Boston University majoring in History. He was born in New Zealand and grew up in Guangdong, China. His interests, asides from his major, are Chinese etymology and dialects (three of which he knows), which induced him to this digital humanities project to make use of his knowledge in Chinese history and language.</p>
          </div>

      </div>


    );
  }
}

export default About;
