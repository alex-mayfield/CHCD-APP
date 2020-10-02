import React, { Component } from 'react';

class DataZH extends Component {
  render() {
    return (

      <div className="textPage">

        <h1>数据中心</ h1>
          <p>此在线平台只是对中国历史基督教数据库（CHCD）中收集的数据可以做的一种表达。 为了使用其他数字工具或进行更复杂的统计分析，需要下载数据。 该页面包含链接和文档，可帮助您了解数据库的结构，名称和构建数据库的技术。</ p>

        <h2>下载CHCD </h2>
          <p>中国历史数据库致力于数据可访问性和开放式奖学金。 但是，收集，清理和组织历史数据的过程必然需要不断完善。 这样，该项目将发布其数据的定期更新。 每次更新都会记录自上次更新以来收集了哪些数据以及进行了哪些更改。 使用下面的链接下载最新的数据集。</p>
        <form action="https://www.google.com" method="get" target="_blank">
         <button type="submit" className="download">下载最新版本的CHCD</button>
      </form>
      <h2>文档</ h2>
        <p>这些文档提供了数据库或数据库各个方面的技术概述。</p>
        <ul>
           <li> <a href=""> CHCD白皮书</a> </ li>
           <li> <a href=""> CHCD来源索引</a> </ li>
         </ul>

        <h2> Neo4j图形数据库平台</h2>
          <p> CHCD使用开源图形数据库平台Neo4j来运行其数据库。 尽管可以将数据移植到其他数据库格式中，但熟悉Neo4j可能会有所帮助。 <a href="https://neo4j.com/">单击此处以了解有关Neo4j的更多信息。</a> </ p>
      </div>

    );
  }
}

export default DataZH;
